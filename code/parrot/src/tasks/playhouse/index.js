import { firebaseAppROOT, database } from '../../utils';
import { cleanAppUser } from '../appUsers';
import faker from 'faker/locale/tr';
import moment from 'moment';
import slug from 'slug';
import GeoFire from 'geofire';
import { generateRandomPoint } from './utils';

export const usersRef = database.ref('users');
export const dollsRef = (uid) => database.ref(`internal/playhouse/dolls/${uid ? uid : ''}`);
export const oceanRef = new GeoFire(database.ref('tests/ocean'));

/*
* This function imitates what happens after a real user logins.
* Basically, what normally happens is when we recieve a Facebook token,
* our handler retrieves some information from Facebook and adds it to info ref.
* Another handler creates summaries and sends e-mails. 
* Facebook handler also creates the default filters & settings.
* But here we randomly generate them too, making the creation a single call.
*/
const addNewDoll = () => {

  const gender = Math.round(Math.random());

  const first_name = faker.name.firstName(gender);
  const last_name = faker.name.lastName(gender);

  const today = moment().subtract(1, 'days'); // Don't really want to handle timezone differences
  const birthday = moment(faker.date.between(today.clone().subtract(45, 'years'), today.clone().subtract(18, 'years')))
  
  // UID's are generated with the Doll name. We also add unix timestamp to the end to prevent possible collusions.
  const uid = slug(`d-${first_name}-${last_name}-${birthday.format('X')}`, { lower: true });


  const info = {
    fid: 0, // Facebook ID is always 0 with the dolls.
    name: `${first_name} ${last_name}`,
    first_name,
    last_name,
    birthday: birthday.format('YYYY-MM-DD'),
    gender: (gender ? 'Female' : 'Male'),
    avatar: faker.internet.avatar(),
    network_email: `${uid}@playhouse.procoapp.com`,
    network: `playhouse`, // Also, the network assignment normally automatic but done in the e-mail verification steps (obivously)
  };

  const settings = {
    suspendDiscovery: (Math.round(Math.random()) ? true : false),
    notifyAnnouncements: false,
    notifyNewMessages: false,
  };

  const genderFilters = ['Male', 'Female', 'Both'];
  
  // Since we are only testing with a few hundred users and manually checking, this filter would be an overkill.
  //const randomAge = (min = 18, max = 45) => Math.floor(Math.random() * (max - min + 1) + min);
  //const ageMin = randomAge();
  //const ageMax = randomAge(ageMin);

  const filters = {
    gender: genderFilters[Math.floor(Math.random() * genderFilters.length)],
    ageMin: 18,
    ageMax: 45,
    onlyFromNetwork: (Math.round(Math.random()) ? true : false),
  };

  // We are not setting onboarded because that's handled by our handlers :)
  const is = {
    verified: true,
  };

  const data = {
    [`info/${uid}`]: info,
    [`settings/${uid}`]: settings,
    [`filters/${uid}`]: filters,
    [`is/${uid}`]: is,
    [`network-map/playhouse/${uid}`]: true,
  };

  return dollsRef(uid)
    .set({
      data: {
        info,
        settings,
        filters,
      },
      token: firebaseAppROOT.auth().createCustomToken(uid),
      added_at: moment().toString(),
    })
    .then(() => usersRef.update(data).then(() => uid))
    .then(() => uid);
};

export const cleanDoll = (uid) => cleanAppUser(uid).then(() => dollsRef(uid).set(null).then(() => uid));

export const cleanAllDolls = () => dollsRef().once('value').then(snap => 
  Promise.all(Object.keys(snap.val()).map(doll => cleanDoll(doll)))
);

export const addNewDolls = (count = 1) => {

  let tasks = [];

  for (var i = 0; i < count; i++) {
    tasks.push(addNewDoll());
  }

  return Promise.all(tasks);

};

const positionDoll = (uid, lat, lng) => oceanRef.set(uid, [lat, lng]).then(() => {uid, lat, lng});

export const spreadDolls = (lat = 41.042073848901005, lng = 29.027252197265625, radius = 15000) => dollsRef().once('value').then(snap => 
  Promise.all(Object.keys(snap.val()).map(doll => {
    const loc = generateRandomPoint({lat, lng}, radius);
    return positionDoll(doll, loc.lat, loc.lng);
  }))
);