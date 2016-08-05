'use strict';

var axios = require('axios');
var helpers = require('../helpers');

var worker = function worker(data, progress, resolve, reject) {

  var user = helpers.getUserRef(data.payload.uid);

  user.child('info').once('value').then(function (_user) {

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

var key = 'USER_UPDATE_INFO';

module.exports = {
  worker: worker,
  key: key
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