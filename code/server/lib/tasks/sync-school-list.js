'use strict';

var list = require('university-domains-list');

var _list = {};

list.forEach(function (domain) {
  _list[domain.domain.split('.').join('-')] = domain;
});

console.log(JSON.stringify(_list));