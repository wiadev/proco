const axios = require('axios');
const helpers = require('../helpers');

const worker = (data, progress, resolve, reject) => {
  
  const user = helpers.getUserRef(data.payload.uid);

  user.child('info').once('value').then(_user => {

    console.log(_user);
  });

  // promises = [];

  // promises.push(() => {
  //   return user.child('summary').update({
  //     firstName: data.payload.firstName,

  //   });
  // });
  // Promise.all(promises).then(() => {
  //   resolve();
  // }).catch((e) => {
  //   reject(e);
  // })

};

const key = 'USER_UPDATE_INFO';

module.exports = {
  worker,
  key
};
/*
  "name": "F. Batuhan İçöz",
  "first_name": "Batuhan",
  "last_name": "Icoz",
  "gender": "male", // accepts male or female
  "birthdate": "1995-06-21", // following format: YYYY-MM-DD
  "network": "stu.bahcesehir.edu.tr",
  "network_email": "firatbatuhan.icoz@stu.bahcesehir.edu.tr",
  "joined_at": 12312312312, // timestamp
  "summary": {


  },
  "discoverySettings": {

  },*/