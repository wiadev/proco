# Proco Technical Plan Documantation

Proco is a hyper-location based meeting application. Users only see people who are *currently* in a place they are also in and match their criteria.

**An important note about this documantation**

This is written from the backend perspective and doesn't make assumptions on how the client should handle the data flow but includes recommendation in some parts. Also, this plan was aimed to be future proof with possible future features in mind.

## How it works, an overview

Our aim was to built Proco serverless so we don't encounter a scalability problem. We are leveraging the Firebase & Google Cloud to go (or rather, be) serverless. Altough we use other services too, most of the system relies on their database. It's called Firebase Realtime Database and it's real-time, fast, cheap and, since it's cloud based, scaleable. Basically, they store and serve your database as a giant JSON file. This apporach has its advantages but comes with major drawbacks. There are only order queries, no other queries even for simple ones like WHERE. Also, more advanced ones like JOIN's and geo queries are out of the question.

Their suggestion is to denormalize the data. This seems like a negative feature but it forces you to think and plan for how the data is going to be queried so once you understand how it works, it becomes very easy to work with. 

For most apps, including Proco, going %100 serverless is nearly impossible since you are going to have (read: need) some business logic and integration with 3rd party services (for even things as basic as e-mail services). A way to solve this, Firebase Cloud Functions is planned by the Firebase team is currently in the private beta. We are in the beta but the it's not stable enough to use in a production system. We've tried to plan the "server" of Proco for a easy migration to FCF once it's stable enough. FCF works by reacting to changes in the database and running basic JavaScript functions in the Google Cloud. So we've designed this temporary system to work in a similiar fashion.

Before reading further, it's recommended to read the [Database Docs in Firebase](https://firebase.google.com/docs/database/). 

### Enter: Firebase Queue

Altough Firebase Cloud Functions is not stable yet, [Firebase Queue](https://github.com/firebase/firebase-queue) is. It's a fault-tolerant, multi-worker, multi-stage job pipeline built on the Firebase Realtime Database. 

#### How it works

It works by listening to tasks inside a reference in the database. It takes a task, mark it as processing, runs a simple functions and marks it as failed or deletes the task when sucessfull.

#### How we use it

We have multiple queues called action queues. If you are familiar with Redux, the idea is very similiar. We start by pushing a task (an action and a payload) to the queue of that action. Tasks can be pushed by the client or inside other tasks. The action queue recieves the task, runs the worker of the action. When resolved, a task is deleted from the database.

In this structure, the client never writes to the database and instead it sends actions. This also makes managing Firebase Database Rules easier.

##### Actions
Actions are simple strings with a matching worker function. If your actions are only called from inside other functions, prepend the name with an underscore. It's good convention to also prepend their names with the module they are associated with.

###### Types
There are two types of actions.

- First one is fire & forget. Task is pushed and the pusher doesn't expect anything in return or handles listening for expected changes by its own.

- Second one is actions with promises. With these actions, action payload includes a `resolveTo` parameter where resolveTo is a key of a database reference. The pusher listens to changes on that reference. You can use the `resolveToClient` helper function, optionally pass it a payload, to resolve both the task and the promise created in the client. Client also recieves the payload, if provided. This type of actions are only recommended for the client. Action workers should never use any actions with promises, instead they should just push new actions with the `resolveTo` parameter if needed. 

##### Workers

Workers are simple functions that receives and runs a task. They are structured in a similiar fashion to Promise's. They recieve resolve, reject and progress functions alongside the payload. 

Workers shouldn't do the actual data processing but rather only manage the data flow. They should handle all the database retrievals and writes and use helpers to create or manipulate data. If a reference can be manipulated from multiple places, they should have their own actions.

##### Helpers

Helpers are pure functions, meaning that they don't rely on the state of the code. They don't create side effects that alter variables outside of themselves. There is one and only one result a helper function returns for any given set of arguments. (This is paraphrased from  [an article on SitePoint](https://www.sitepoint.com/introduction-functional-javascript/))


#### Scaling

Because of how Firebase Queue works, scaling this queue system is actually very easy to achieve. Things running slow? Just increase the number of queue applications running. No configuration, no master/slave discovery. It only needs dependencies inside the `package.json` file and an outgoing Internet connection.

Some actions like actions with promises are more important than the actions like garbage collectors. We can prioritize certain actions by running more queues for that action. The queue application should accept an environment variables called `ACTIONS` with a regular expression. When provided, it'll only run the tasks for matching actions. 

Also please note that queues can be run anywhere so never make assumptions about the servers they'll run on. Or even if they are going to be able finish without interruptions. Normally with Firebase Queue, recommended approach is to leverage progress and states but they shouldn't be used with Proco Workers because they make functions incompatible for Cloud Functions migration. Also make them harder to test. For example, they may not have a writeable filesystem so don't write any files, even if they are temporary. This is also important because the possible switch the Firebase Cloud Functions. Try to use minimal amount of depedencies, even if they are local files.

#### Testing

Testing this strecture is pretty easy. Queues and tasks can easily be generated in a seperate, clean database. And since the helpers, which is where the actual data processing happens, are pure functions, they are very testable.

## Modules

Like most applications, Proco has several different parts working together. Because the scope of the application is rather small, they aren't micro-services with fancy event-based architectures. They are instead fancy action-based architectures, as explained above. But we've tried to minimalize the overlap between different modules so updating one part doesn't bring hell to everything else. Again, as you'll read multiple times more throughout this document, don't make assumptions.


### Users

#### Anatomy of a user

You'll find examples of user data's below. If a field doesn't have an explanation, it is probably explained in a later section.

```js
/users/batuhan.json
{
	"name": "F. Batuhan İçöz",
	"first_name": "Batuhan",
	"last_name": "Icoz",
	"gender": "male", // accepts male or female
	"birthdate": "1995-06-21", // following format: YYYY-MM-DD
	"network": "stu.bahcesehir.edu.tr",
	"network_email": "firatbatuhan.icoz@stu.bahcesehir.edu.tr",
	"joined_at": 12312312312, // timestamp
	"_indexes": {
		"basic_info": {
			"network": "Bahçeşehir Üniversitesi",
			"age_range": "1",
			"age": "21"
		},
		"after_login": {
			"first_name": "Batuhan",
			"gender": "male",
			"birthdate": "1995-06-21",
			"onboarding_statuses": {
				"gender": true,
				"birthdate": true,
				"network_email": true,
				"network_verification": true,
				"has_drop": false,
				"notification_permissions": false
			}
		},
	}
}
```  


##### User Age Ranges

This is a convenience feature, created for the Ocean module. 

*It's recommended to read the Ocean section before you continue this section.*

Making the age a criteria creates too many pools and could potentially overwhelm the system. Instead, we have age ranges with the assumption most people search for people around their generation. Specific ages are enforced via filters.


| ID  | Age Range  |
| --- |:----------:|
| 0   | 0-17*      |
| 1   | 18-22      |
| 2   | 23-27      |
| 3   | 28-32      |
| 4   | 33-37      |
| 5   | 38-42      |
| 6   | 43-47      |


Currently, we only support people above 18 and under 30 but we may change that in the future.


#### Authentication
Altough the authentication is handled on the client with a combination of the Facebook SDK and Firebase Authentication, the client pushes an action called `AFTER_LOGIN` with the Facebook token and the application version in the payload. 

Right before pushing the action, the client should check for the after login index reference at `/users/${user_id}/_indexes/after_login`. If it's null, it means this is the first time user is logging in and the `AFTER_LOGIN` action didn't finished yet. The client should listen for changes at that reference until information is pushed. This index includes user-specific configuration like A/B testing parameters and non-chanable user information (like name, gender and birthday) along with the onboarding statuses. Also includes user access.

*Please note that retrieving the index before the action is complete has a small drawback. We won't be able to access most current data. But since for first-timers we'll wait for the action pushing data and information inside the index (name, gender and birthday) is rarely changed, this wouldn't cause a major problem. Users will be able to see their updated information on their next login.*

##### Example indexes

Below are example indexes. Explanation for values are given in their respective sections. ID's are normally integers but they are presented as strings here to make referencing the examples easier.


```js
// /users/mahmut/_indexes/after_login
// A user with denied access, finished onboarding
{
	"first_name": "Mahmut",
	"gender": "male",
	"birthdate": "1993-01-21",
	"deny_access": "webview|https://hello.barbar.xyz/errors/blocked.html?has=query"
	"onboarding_statuses": {
		"gender": true,
		"birthdate": true,
		"network_email": true,
		"network_verification": true,
		"has_drop": false,
		"notification_permissions": true
	}	
}
```


```js
// /users/serdar/_indexes/after_login
// A user who didn't verified their network e-mail yet
{
	"first_name": "Serdar",
	"gender": "male",
	"birthdate": "1994-03-19",
	"network_email": 
	"onboarding_statuses": {
		"gender": true,
		"birthdate": true,
		"network_email": true,
		"network_verification": false,
		"has_drop": false,
		"notification_permissions": false
	}	
}
```


```js
// /users/batuhan/_indexes/after_login
// This user is awesome, they've completed everything and have a drop
{
	"first_name": "Batuhan",
	"gender": "male",
	"birthdate": "1995-06-21",
	"onboarding_statuses": {
		"gender": true,
		"birthdate": true,
		"network_email": true,
		"network_verification": true,
		"has_drop": false,
		"notification_permissions": false
	}	
}
```


```js
// /users/cigdem/_indexes/after_login
// This user is awesome, they've completed everything but don't have a drop yet
{
	"first_name": "Çiğdem",
	"gender": "female",
	"birthdate": "1994-06-21",
	"onboarding_statuses": {
		"gender": true,
		"birthdate": true,
		"network_email": true,
		"network_verification": true,
		"has_drop": true,
		"notification_permissions": true
	}	
}
```

##### User access

Sometimes users may not be allowed to access the application for various reasons, including but not limited to:

- They may be banned
- There may be problem with the application
- Their version may not be supported anymore
- If their network doesn't support Proco yet

You may have noticed the `deny_access` field inside Mahmut's (`/users/mahmut/_indexes/after_login`) index. It doesn't exists for allowed users and will not be present. If it is present, it's a string with the following structure: `${opener}|${target}`. For now, the only opener supported is `webview` with a valid URL as its target. 

The client should stop all operations if a user has been denied access.

###### Openers
- **webview** It opens the target inside a webview in the application. The target should always be valid full URL with a valid SSL certificate. Also, the client should always append the current JWT token as a query parameter before opening the target URL.

	Let's review our example:
	
	```js
	// /users/mahmut/_indexes/after_login
	// A user with denied access, finished onboarding
	{
		...
		"deny_access": "webview|https://hello.barbar.xyz/errors/blocked.html?has=query",
		"onboarding_fields": {
			...
			"has_drop": false, // Their drop is deleted, so they may be banned. Or not.
			...
		}	
	}
	```
	
	URL becomes `https://hello.barbar.xyz/errors/blocked.html?has=query&token=TOKEN`



##### Onboarding

When users join via Facebook, we have their basic information but we need more things like network e-mail verification or notification permissons.

There are 4 steps in this process, first 2 happen right after the first login. Other 2 happen later, when the user interacts with 4 drops.

It's important to remember, a user can stop right after login and uninstall the app only to reinstall it. So never make assumptions about user behaviour and always check for steps from the index. For example for user Serdar, we should start at step #2. 

###### Steps, in order

- **Completing missing information** 

	We require name, gender, birthdate and network e-mail. Name always comes from Facebook but other fields may not. Network e-mail is always asked.
	In this step, the client should do basic validation and post the action `USER_ONBOARDING_COMPLETE_INFORMATION` with a promise the information for further actions like network e-mail checking and sending the validation e-mail, if needed. Only post new information and don't post information already existing inside the index.
	
	```js
	{
		"action": "USER_ONBOARDING_COMPLETE_INFORMATION",
		"payload": {
			"gender": "female", // accepts only "male" or "female"
			"birthdate": "1996-09-13", // in the format: YYYY-MM-DD
			"network_email": "cigdem.cabuker@boun.edu.tr"
		},
		"resolveTo": "/users/cigdem/_indexes/after_login"
	}
	```
	
	You may notice we resolve to the after login index. This means we can re-use code from before. If all fields from this step is complete, we can go to the next step.
	
- **Network verification** 

	We require people to verify their networks, which, in the first versions, are their universities. We do it by sending a 4-digit code to their e-mail. 
	
	The client should trigger the e-mail by posting the action with a promise called `USER_ONBOARDING_TRIGGER_VERIFICATION`. Everytime that action is triggered, a new e-mail with a new code is sent and invalidates the previous one. E-mail will also include a link to a web page where the verification can happen.
	
	```js
	{
		"action": "USER_ONBOARDING_TRIGGER_VERIFICATION",
		"resolveTo": "/users/cigdem/_indexes/after_login"
	}
	```
	
	As you can see, we again resolve to after login index, which updates when the user is verified.
	
	If a user enters the code inside the application, we trigger the `USER_ONBOARDING_VERIFY_CODE` action. This action doesn't have a promise since we already listen to changes in the previous one.
	
	```js
	{
		"action": "USER_ONBOARDING_VERIFY_CODE",
		"payload": {
			"code": "4269" // accepts a *string* with the 4-digit code.
		}
	}
	```
	
	This page should also have a countdown from 3 minutes and a re-sent button after the countdown ends. User should also be able to change their e-mail in this step. When they change the e-mail, we again trigger `USER_ONBOARDING_COMPLETE_INFORMATION` but with only the `network_email`.
	
	After this step is completed, user can now use the application. In the client terms, they can now be redirected to the main screen.
	
	
- **Adding a loop & question**
	
- **Notification permissions**

 	We need permissions to send users notifications for things like new matches and messages.

	On iOS, we need permissions to do that. In both platforms, even if have the permissons, we'll need tokens.
	


#### Settings
#### Activity Log


### Interactions
### Locations
### Maintance & Other
INDEX_REFRESH_ONBOARDING
#### 
### Discovery
### Notifications
### Users

# Application Flow (The Client)

![Login flow](https://files.icoz.co/uploads/auth-flow-proco.png)

# Location

Since our application is a location-based one, location is one of the most important modules. Despite that, it's a relatively simple one.

In the context of this documentation, when we refer to a `location` it most likely means a physical location of a place with boundaries. 

Let's examine what location looks like first. 

```js
{
  "display_name" : "Boğaziçi Üniversitesi Güney Kampüs, Sehitlikdergahı Sokağı, Beşiktaş, İstanbul, Marmara Bölgesi, 34337, Türkiye",
  "groups": {
  	"school-boun": true
  },
  "lat" : "41.08327335",
  "lon" : "29.0503931951846",
  "boundary-type": "polygon",
  "polygonpoints" : [ [ "29.0468001", "41.0846401" ], [ "29.0468215", "41.0849191" ], [ "29.0471327", "41.0853031" ], [ "29.0474543", "41.0854492" ], [ "29.0475592", "41.0854969" ], [ "29.0478621", "41.0856346" ], [ "29.0481625", "41.0857641" ], [ "29.0486453", "41.0859823" ], [ "29.0494394", "41.0863544" ], [ "29.0497827", "41.0865647" ], [ "29.0513706", "41.0867426" ], [ "29.0518104", "41.0865727" ], [ "29.0524113", "41.0866292" ], [ "29.0525828", "41.0862251" ], [ "29.0529905", "41.0862493" ], [ "29.0530347", "41.0860869" ], [ "29.0530764", "41.085934" ], [ "29.0532481", "41.0859258" ], [ "29.0532587", "41.0856994" ], [ "29.0533286", "41.0855902" ], [ "29.0536504", "41.0854042" ], [ "29.0534734", "41.0851859" ], [ "29.0543724", "41.0847039" ], [ "29.0552759", "41.0842195" ], [ "29.0549969", "41.0838557" ], [ "29.0549754", "41.0835645" ], [ "29.0548038", "41.0836292" ], [ "29.0545999", "41.0834352" ], [ "29.0537887", "41.0835391" ], [ "29.0537144", "41.0834805" ], [ "29.0530972", "41.0829342" ], [ "29.0529558", "41.0830211" ], [ "29.0526902", "41.0821168" ], [ "29.0518886", "41.0819957" ], [ "29.051907", "41.0818014" ], [ "29.0518747", "41.0820764" ], [ "29.051156", "41.0821898" ], [ "29.0510165", "41.0821573" ], [ "29.0509842", "41.0819066" ], [ "29.0507589", "41.0810899" ], [ "29.0507697", "41.0807664" ], [ "29.0506087", "41.0807098" ], [ "29.0506625", "41.0801033" ], [ "29.0500616", "41.0799577" ], [ "29.0500402", "41.0802245" ], [ "29.0502226", "41.0802893" ], [ "29.050201", "41.0807098" ], [ "29.0496539", "41.0807098" ], [ "29.0496218", "41.081381" ], [ "29.0494823", "41.0817206" ], [ "29.0495145", "41.0819795" ], [ "29.049772", "41.0824243" ], [ "29.0496969", "41.0827558" ], [ "29.0493327", "41.0827837" ], [ "29.0485381", "41.0828447" ], [ "29.048506", "41.0829498" ], [ "29.0483128", "41.082958" ], [ "29.0482914", "41.0828447" ], [ "29.0473472", "41.0831115" ], [ "29.047197", "41.0837019" ], [ "29.0470254", "41.0841063" ], [ "29.0468001", "41.0846401" ] ]
}

```

```js
{
  "display_name" : "Boğaziçi Üniversitesi Güney Kampüs, Sehitlikdergahı Sokağı, Beşiktaş, İstanbul, Marmara Bölgesi, 34337, Türkiye",
  "groups": {
  	"school-boun": true
  },
  "lat" : "41.08327335",
  "lon" : "29.0503931951846",
  "boundary-type": "circle",
  "radius": "100" // in meters
}

```

Above examples belong to the same location but have a different `boundry-type`. Normally, only one entry per location is accepted. There are two types of boundries **polygon**  and **circle**. The default is circle with 25 meters radius.

After a location is added (`ADMIN_LOCATION_ADD`) or edited (`ADMIN_LOCATION_EDIT`), we index their groups.


```json
{
	"locations": 
		"locations": { ... },
		...
		"_indexes": {
			...
			"groups": {
				"school-boun": {
				 	"locations": {
				 		"location1": true // Key of the example location
				 	},
				 	"users": {
				 		"batuhan": true
				 	}
				 }
			}
			...
		}
		...
}
```
			
When a user moves (`USER_UPDATE_LOCATION`), the worker will calculate all the places they are in, find the the groups those places belong to. After that, the list of location groups are dispatched via `USER_UPDATE_LOCATIONGROUPS`.

```json
{
	"action": "USER_UPDATE_LOCATION",
	"payload": {
		"latitude": 41.123213,
		"longitude": 29.12312
	}
}
```


```json
{
	"action": "USER_UPDATE_LOCATIONGROUPS",
	"payload": {
		"groups": {
			"school-boun": "true"
		}
	}
}
```



For example, our users are Batuhan İçöz, a 21-year-old male Bahçeşehir student and Çiğdem Çabuker, a 20-year-old female Boğaziçi Student. Batuhan is in Boğaziçi South Campus whereas Çiğdem is currently in the Boğaziçi North Campus. Both campuses have "school-boun" location tag since they belong to the same school (boun). We add that location tag to our 2 users. For the purposes of this example let's say we want people also to see other people in all Starbucks's and Batuhan is also inside a Starbucks. We also push "special-brand-starbucks" location tag to him.


# Ocean

Ocean module basically has one important task, which is to **group users matching a condition into a user group** to do everything from A/B testing configurations, advertisement targeting to user discovery. These user groups are called **pools**.

*This module is created to be efficent as possible with the limitations of the Firebase Realtime Database. It's the most advanced module of Proco so to understand how everything bundles together, you'll need a good understanding of the Proco architecture.*

To add users to a pool, first you need a Pool Query by dispatching `OCEAN_POOLQUERY_ADD` These have a condition parameter which is pure JavaScript expression with several user variables and helpers exposed. Same variables can also be used inside the `pool` and `add` parameters, which are template literals. There is also a `where` parameter to limit the query to a set of users. 

Important: Use `where` wherever :) you can for performance reasons. The `where` conditions are require all of the conditions to be met at the same time. If you need an `OR` query, omit the parameter in in the `where` condition and instead filter inside the `condition` expression.

Values inside the `add` are expressions like the `condition`. All exposed variables and where conditions are reserved. If you want to be able to run geo-queries inside the pool with GeoFire, set `location` to true in the `add` parameter.

Exposed variables: (user_basic)

- age (int) - Age
- gender - Gender
- device - Device code (iPhone6sPlus, SamsungGalaxyNote3)
- app_version - Application version
- cellular_network - Cellular network
- user_labels (array) - User labels*
- network - Network
- last_activty - Last activity timestamp
- location (array) - Location
- location_groups (array) - Location Group*
- age_range (int) - Age range
- user_id
- latest_question
- latest_location

Where conditions:

- age_range - Age range
- gender - Gender
- location_group - Location Group
- in the future: location with radius

Helper functions:

- user.isExcluded()

Whenever a parameter listed above changes, `OCEAN_USER_REFRESH_POOLS` action gets dispatched. This action loads pool conditions from the universal pool list and where condition combinations for the user. Best way to explain this, like most other things, is by example.

First, we'll need a few pools.

```json
{
	"action": "OCEAN_POOLS_ADD_QUERY",
	"payload": {
		"title": "Female Boğaziçi University studens in age range 1",
		"where": {
			"age_range": "1",
			"gender": "female",
		},
		"condition": "network === 'boun.edu.tr'",
		"pool": "female-boun"
	}
}
/* 
	This will generate a record in /pool-queries/${hash('age_range=1|gender=female')}
*/
```

```json
{
	"action": "OCEAN_POOLS_ADD_QUERY",
	"payload": {
		"title": "Male 21-year-old Bahçeşehir students currently in Boğaziçi University",
		"where": {
			"age_range": "1",
			"gender": "male",
			"location_group": "school-boun"
		},
		"condition": "network === 'stu.bahcesehir.edu.tr' && age === 21",
		"pool": "male-bau-in-boun",
		"add": {
			"location": true
		}
	}
}
/* 
	This will generate a record in /pool-queries/${hash('age_range=1|gender=male|location_group=school-boun')}
*/
```

```json
{
	"action": "OCEAN_POOLS_ADD_QUERY",
	"payload": {
		"title": "Male Bahçeşehir students over 22",
		"where": {
			"gender": "male"
		},
		"condition": "network === 'stu.bahcesehir.edu.tr' && age > 22",
		"pool": "male-bau-22"
	}
}
/* 
	This will generate a record in /pool-queries/${hash('gender=male')}
*/
```


```json
{
	"action": "OCEAN_POOLS_ADD_QUERY",
	"payload": {
		"title": "Turkcell clients below 26",
		"condition": "cellular_network === 'TURKCELL' && age < 26",
		"pool": "turkcell-clients-${device}",
		"add": {
			"location": true,
			"is_iphone": "(device.indexOf("iPhone") === 1 ? 'yes' : 'no')"
		}
	}
}
/* 
	This will generate a record in /pool-queries/all
*/
```

Let's assume our user is a 21-year-old male who is currently in `school-boun` and `brand-starbucks` location groups. On the refresh event, the worker will check following references:

```
/pool-queries/all

/pool-queries/${hash('age_range=1')}
/pool-queries/${hash('age_range=1|gender=male')}
/pool-queries/${hash('gender=male')}

/pool-queries/${hash('age_range=1|gender=male|location_group=school-boun')}
/pool-queries/${hash('age_range=1|location_group=school-boun')}
/pool-queries/${hash('gender=male|location_group=school-boun')}
/pool-queries/${hash('location_group=school-boun')}

/pool-queries/${hash('age_range=1|gender=male|location_group=brand-starbucks')}
/pool-queries/${hash('age_range=1|location_group=brand-starbucks')}
/pool-queries/${hash('gender=male|location_group=brand-starbucks')}
/pool-queries/${hash('location_group=brand-starbucks')}
```

Assuming there are only the pool queries we've just added, we have 4 queries in the system. We should receive 3 of them since the first query has a where condition of `gender=female`.
 
Let's review the those queries:


```json
{
	"key": "${hash('age_range=1|gender=male|location_group=school-boun')}/1",
	...
	"condition": "network === 'stu.bahcesehir.edu.tr' && age === 21",
	"pool": "male-bau-in-boun",
	"add": {
		"location": true
	}
	...
}
```
This condition passes, we should push user to the `/pools/${hash('male-bau-in-boun')}`, add to the list with the add object

```json
{
	"key": "${hash('gender=male')/1",
	...
	"condition": "network === 'stu.bahcesehir.edu.tr' && age > 22",
	"pool": "male-bau-22"
	...
}
```
This condition fails since the user is 21.

```json
{	
	"key": "all/1",
	...
	"condition": "cellular_network === 'TURKCELL' && age < 26",
	"pool": "turkcell-clients-${device}",	"add": {
		"is_iphone": "(device.indexOf("iPhone") === 1 ? 'yes' : 'no')"
	}
	...
}
```
This also passes, we should push user to `/pools/${hash('turkcell-clients-iPhone6')}`, add to the list with the add object.

When all queries are checked, we should compare the pools the user is currently in with the list we've just created. Let's say the user was previously in the Bahçeşehir campus was inin the pool `/pools/${hash('school-bau')}`. Also, user was already using Turkcell the last time we've checked and is already in the `/pools/${hash('turkcell-clients-iPhone6')}`.

We'll finish running this task with updates to the pools. The code should look like the following:

```js
const drop = Object.assign({}, user);

let updates = {};

// Updating the pools
updates["/pools/${hash('school-bau/batuhan')}"] = null;
updates["/pools/${hash('male-bau-in-boun/batuhan')}"] = drop;
updates["/pools/${hash('turkcell-clients-iPhone6/batuhan')}"] = Object.assign({
	is_iphone: e(pools_to_add[1].add.is_phone)
}, drop);

// Updating the pool queries
updates["/pool-queries/${hash('age_range=1|gender=male|location_group=school-boun')}/1/people/batuhan"] = true;
updates["/pool-queries/${hash('location_group=school-bau')}/1/people/batuhan"] = null; // For the one the user is no longer in
updates["/pool-queries/all/1/people/batuhan"] = true;


firebase.database().ref().update(updates).then(() => {
	trigger('LOCATION_SET_GEO_DROP', "/pools/${hash('male-bau-in-boun/batuhan')}");
	resolve();
});
```
What `LOCATION_SET_GEO_DROP` does is to add geo-fire related information the reference.


## Removing Pool Queries

To remove a pool, you'll need to remove its query. To remove a pool query, trigger `OCEAN_POOLS_REMOVE_QUERY` and pass the query key.

```json
{
	"action": "OCEAN_POOLS_REMOVE_QUERY",
	"payload": {
		"title": "Male Bahçeşehir students over 22",
		"where": {
			"gender": "male"
		},
		"condition": "network === 'stu.bahcesehir.edu.tr' && age > 22",
		"pool": "male-bau-22"
	}
}
/* 
	This will generate a record in /pool-queries/${hash('gender=male')}
*/
```

Subscribable

To achieve this as efficent as we can with the limitation of the Firebase Realtime Database, we've created a system we call **the Ocean**. In it, there are pools of users that could be queried by location.

Before we can into details, there are some definitions you'll need to be familiar with. Check them out in the Glossary.

A pool is a group of users with filter combinations that could be subscribed to. 

So, what does that mean? There are age, gender and network (school) filters for users inside the application. There are also an automatic filter, the geo filter.

Before we go into more details we need to examine how geo filters work. When a new latitude and longitude for a user is pushed to the queue, we first determine the location(s) for those coordinates. And push poolable location tags to users. (what if they are nowhere we have in our database?) 

Every location has possibly multiple poolables (which is a feature of it where groups of users become searchable, like country, city or school), some auto-generated from their tags like school or brand and some derived from their meta data like country, district and city. For the first versions, we only create poolables from the location tags.

For example, our users are Batuhan İçöz, a 21-year-old male Bahçeşehir student and Çiğdem Çabuker, a 20-year-old female Boğaziçi Student. Batuhan is in Boğaziçi South Campus whereas Çiğdem is currently in the Boğaziçi North Campus. Both campuses have "school-boun" location tag since they belong to the same school (boun). We add that location tag to our 2 users. For the purposes of this example let's say we want people also to see other people in all Starbucks's and Batuhan is also inside a Starbucks. We also push "special-brand-starbucks" location tag to him.

Also, these are their filters:
Batuhan wants to see all genders with ages between 18-30 across network.
Çiğdem wants to see males with ages between 20-21 with only people from her network.

Now, back to how pools are generated. With the above example, we have the location tag "school-boun" in two users and "brand-starbucks" tag in one user. As soon as those tags are added, the queue determines which pools they should be in based on their information and which ones they should subscribe to based on their filters.

Pool names are MD5 hashes of strings of the pool name scheme, which start with `${gender}/${age_range}` and added location tag or special tag like this: `${gender}/${age_range}/l-${location_tag}` and `${gender}/${age_range}/s-${special_tag}`. Special tags are designed for time limited events or B2B campaigns. When location and special tags are combined, special tag are added after the location tag.


Batuhan is pushed into the following pools:

m/1
m/1/school-boun
m/1/brand-starbucks

He subscribes into the following pools:

- m/1/school-boun
- m/2/school-boun
- m/3/school-boun

- f/1/school-boun
- f/2/school-boun
- f/3/school-boun

- m/1/brand-starbucks
- m/2/brand-starbucks
- m/3/brand-starbucks

f/1/brand-starbucks
f/2/brand-starbucks
f/3/brand-starbucks


Çiğdem is pushed into the following pools: 

f/1
f/1/school-boun

And subscribes to:

m/1/school-boun


## Subscriptions

Every pool has a list of subscribers. When a drop exits or enters a pool, subscribers are notified for this change. 

In the related action, a few things happen starting with checks.

- The drop is checked against the excluded drops list
- The drop is checked against the filters (currently only network since other filters are handled by the pool system)
- The drop owner (user) is checked against the excluded users list
- Previous interactions are checked between the latest drop of the pool owner user and the current drop, if found, we add them to the drop payload.

If all checks are passed, we push the payload to the user pool and they are added to the excluded drops list.

### User Pools

User pools are a special type of pool where drops are pushed here from the subscriptions as explained above.


# Actions

They are, for the most part, listed unordered.

## `AFTER_LOGIN`

This updates the Facebook token and the information derived from Facebook which are birthday, gender and name.

## `USER_ONBOARDING_TRIGGER_VERIFICATION`

## `OCEAN_POOLS_ADD_QUERY`

Adding a query starts by creating a reference inside the Pool Query Index, which is located at `/pool-queries/_indexes/${type}`. Altough it's not mentioned in the Ocean section, queries also have a `type` with 2 self-descriptive options: `generated` and `manual`. The default is `manual`. Currently, only user discovery pools are auto-generated. We also push it to `/pool-queries/_indexes/all` with the same key generated in the first push.

Again with the same key, we lastly push the pool query depending on its where conditions. This is detailed in the related section.

## `OCEAN_POOLS_REMOVE_QUERY`



- suspend discovery
- onboarding pool
- hello score
- security rules

## `INDEX_REFRESH_USERCRITARIAS`

This refreshes critarias for 
```js
const c = {a: 1, b: 2, c: 3, d:4};

const getCombinations = (criterias) => {
  const keys = Object.keys(criterias).sort();
  const result = [];
  const f = (prefix, keys) => {
    for (let i = 0; i < keys.length; i++) {
      const key = `${(prefix ? `${prefix}|` : prefix)}${keys[i]}=${criterias[keys[i]]}`;
      result.push(key);
      f(key, keys.slice(i + 1));
    }
  };
  f('', keys);
  return result;
};

getCombinations(c);
``


Where 

```js
Object.keys(where).sort().map(key => `${key}=${where[key]}`).join('|')
```open 