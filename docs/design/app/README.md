To make the process easier going forward, I've grouped our screens into 5 categories. These are intro, onboarding, menu, discovery and chat. They, for the most part, don't interact with each other and function independently. There are some common elements (components), which are listed in the Components section. I've tried to list everything in the order they appear. I've also tried to make names of things more consistent. Please ping if you see any errors or have questions.

# Categories
## Intro (Root)
![01_intro/01_loading](./exports/01_intro/01_loading.png)
![01_intro/02_login](./exports/01_intro/02_login.png)

## Onboarding

### Form
![02_onboarding/01_form](./exports/02_onboarding/01_form.png)

### Verification
This is a **modal** component. It uses 2 **text button** components.

![02_onboarding/02_verification](./exports/02_onboarding/02_verification.png)

## Menu

### Menu
There is a **profile loop** component in the background, a **profile photo** component in the upper side and a **icon button** in the footer. 

![03_menu/01_menu](./exports/03_menu/01_menu.png)

### Post question

#### Form
There is a **profile loop** component in the background and a **conversation bubble**.

![03_menu/02_update_question_01_form](./exports/03_menu/02_update_question_01_form.png)

#### Verification
There is a **profile loop** component in the background, a **conversation bubble** and 2 **icon button**s.

![03_menu/02_update_question_02_verify](./exports/03_menu/02_update_question_02_verify.png)

### Shoot a loop

#### Shoot
It uses a **icon button**.

![03_menu/03_shoot_loop_01_shoot](./exports/03_menu/03_shoot_loop_01_shoot.png)

#### Verify
There are 2 **icon button**s. On this screen, there is a text timer. The buttons will show up after the the timer is over.

![03_menu/03_shoot_loop_02_verify](./exports/03_menu/03_shoot_loop_02_verify.png)

#### No camera access
This is an **information screen** component with a **text button**.

![03_menu/03_shoot_loop_03_no_camera_access](./exports/03_menu/03_shoot_loop_03_no_camera_access.png)

### Discovery Filters

![03_menu/04_discovery_flilters](./exports/03_menu/04_discovery_flilters.png)

### Settings

#### Main
![03_menu/05_settings_01_main](./exports/03_menu/05_settings_01_main.png)

#### Update School
![03_menu/05_settings_02_update_school](./exports/03_menu/05_settings_02_update_school.png)

## Discovery
Discovery has 2 fixed buttons on it: one for going to the upper menu and one for opening the chat screen.

### Profile
Profiles basically have 2 types of common components: **profile loop** and **conversation bubble**. There is also the **answer button**. When touched it pops the keyboard for answer. If it's touched hard or long, it pops a context menu, which is shown below. Keyboard and the **conversation bubble** for answer slides up when triggered. We should also be able to slide up to answer in addition the answer button.

### An unanswered profile
![04_discovery/01_profile_01_unanswered_01_main](./exports/04_discovery/01_profile_01_unanswered_01_main.png)

#### Answer screen
![04_discovery/01_profile_01_unanswered_02_answer](./exports/04_discovery/01_profile_01_unanswered_02_answer.png)

#### Context menu
![04_discovery/01_profile_01_unanswered_02_context](./exports/04_discovery/01_profile_01_unanswered_02_context.png)

### An answered profile
![04_discovery/01_profile_02_answered_01_main](./exports/04_discovery/01_profile_02_answered_01_main.png)

#### Answer screen
![04_discovery/01_profile_02_answered_02_answer](./exports/04_discovery/01_profile_02_answered_02_answer.png)

## Onboarding
These appear in the discovery instead of profile's. All of which are **information screen** components.

### Notification permissions

![04_discovery/02_onboarding_01_notifications](./exports/04_discovery/02_onboarding_01_notifications.png)

### Ask question
![04_discovery/02_onboarding_02_ask](./exports/04_discovery/02_onboarding_02_ask.png)

### Shoot loop

![04_discovery/02_onboarding_03_shoot_loop](./exports/04_discovery/02_onboarding_03_shoot_loop.png)

## Chat

### List
![05_chat/01_list](./exports/05_chat/01_list.png)

### Conversation
This has **conversation bubble**s and a **profile photo**.
![05_chat/02_conversation_01_main](./exports/05_chat/02_conversation_01_main.png)

#### Context

Triggered by the 3 dots in the header.

![05_chat/02_conversation_02_context_menu](./exports/05_chat/02_conversation_02_context_menu.png)

# Common Components

Only components that are used in multiple screens are listed here.

## Modal

When opened, they blur the background. It renders its children.

## Button

Props: Background color, border color, text color, text
 
## Profile Loop

To be documanted.

## Profile Photo

Props: image, border (int, disabled if 0), border color, onTouch, onLongTouch
Displayes the image inside a circle.

## Conversation Bubble

## Icon button

Props: Background color, border color, icon color, icon

## Information screen

Props: image, headline, description, buttons (Array of buttons)

## Context menu

Props: 
- hasCancel (defaults to true)
- onSelect (returns id on item select)
- items: Array of objects

Touching cancel or outside of the menu closes it.

Item object is strectured like this:

```js
{
	"backgroundColor": "#000",
	"textColor": #fff",
	"text": "Test",
	"id": "test"
}
```