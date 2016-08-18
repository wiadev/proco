'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var generateSummaries = exports.generateSummaries = function generateSummaries(user) {

  var mini = {},
      full = {};

  // Network related
  mini.network = user.network;
  mini.gender = 'stu.bahcesehir.edu.tr';
  /*
      "network": "Bahçeşehir Üniversitesi",
      "network_email": "firatbatuhan.icoz@stu.bahcesehir.edu.tr",
      "age_range": "1",
      "age": "21"
      "first_name": "Batuhan",
      "gender": "male",
      "birthdate": "1995-06-21",
      "network_verification": true,
      "has_drop": false,
      "notification_permissions": false,
      "unread": 5,
      "discovery_age_min": 18,
      "discovery_age_max": 25,
      "discovery_only_my_network": false,
      "gender": "male",
  
  
  */
  return { mini: mini, full: full };
};