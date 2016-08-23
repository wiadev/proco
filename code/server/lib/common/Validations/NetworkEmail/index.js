'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _Utils = require('../../Utils');

var AllowedNetworks = Object.keys(require('./AllowedNetworks.json'));
var CommonProviders = ['@gmail.com', '@googlemail.com', '@hotmail.com', '@outlook.com', '@live.com', '@me.com', '@mac.com', '@icloud.com', '@att.com', '@verizon.com', '@comcast.com', '@yahoo.com', '@aol.com', '@mynet.com'];

var Validate = function Validate(email) {
  email = (0, _validator.normalizeEmail)(email);

  if (!email) return Promise.reject('INVALID_EMAIL');

  var providerTests = CommonProviders.map(function (provider) {
    return email.includes(provider);
  });

  if ((0, _Utils.IsAnyTrue)(providerTests)) return Promise.reject('COMMON_PROVIDER');

  return new Promise(function (resolve, reject) {
    // Check other things

    var domain = email.split('@')[1];
    if ((0, _Utils.InArray)(AllowedNetworks, domain)) {
      resolve({
        email: email,
        network: AllowedNetworks[domain],
        supported: true
      });
    } else {

      var otherTests = AllowedNetworks.map(function (network) {
        return network.includes(email.split('@')[1]);
      });

      if ((0, _Utils.IsAnyTrue)(otherTests)) {
        reject('ONLY_STUDENT');
      } else if (email.includes('.edu')) {
        reject('NETWORK_NOT_SUPPORTED');
      } else {
        reject('CHECK_EMAIL');
      }
    }
  });
};

exports.default = Validate;