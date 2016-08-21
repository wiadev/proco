module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = assertString;
	function assertString(input) {
	  if (typeof input !== 'string') {
	    throw new TypeError('This library (validator.js) validates strings only');
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = merge;
	function merge() {
	  var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var defaults = arguments[1];

	  for (var key in defaults) {
	    if (typeof obj[key] === 'undefined') {
	      obj[key] = defaults[key];
	    }
	  }
	  return obj;
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFDQN;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _merge = __webpack_require__(2);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_fqdn_options = {
	  require_tld: true,
	  allow_underscores: false,
	  allow_trailing_dot: false
	};

	function isFDQN(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_fqdn_options);

	  /* Remove the optional trailing dot before checking validity */
	  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
	    str = str.substring(0, str.length - 1);
	  }
	  var parts = str.split('.');
	  if (options.require_tld) {
	    var tld = parts.pop();
	    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
	      return false;
	    }
	  }
	  for (var part, i = 0; i < parts.length; i++) {
	    part = parts[i];
	    if (options.allow_underscores) {
	      part = part.replace(/_/g, '');
	    }
	    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
	      return false;
	    }
	    if (/[\uff01-\uff5e]/.test(part)) {
	      // disallow full-width chars
	      return false;
	    }
	    if (part[0] === '-' || part[part.length - 1] === '-') {
	      return false;
	    }
	  }
	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toDate;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toDate(date) {
	  (0, _assertString2.default)(date);
	  date = Date.parse(date);
	  return !isNaN(date) ? new Date(date) : null;
	}
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = toString;
	function toString(input) {
	  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input !== null) {
	    if (typeof input.toString === 'function') {
	      input = input.toString();
	    } else {
	      input = '[object Object]';
	    }
	  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
	    input = '';
	  }
	  return String(input);
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IsAllTrue = exports.InArray = exports.Firebase = undefined;

	var _Firebase2 = __webpack_require__(23);

	var _Firebase3 = _interopRequireDefault(_Firebase2);

	var _InArray2 = __webpack_require__(24);

	var _InArray3 = _interopRequireDefault(_InArray2);

	var _IsAllTrue2 = __webpack_require__(25);

	var _IsAllTrue3 = _interopRequireDefault(_IsAllTrue2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Firebase = _Firebase3.default;
	exports.InArray = _InArray3.default;
	exports.IsAllTrue = _IsAllTrue3.default;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toDate = __webpack_require__(4);

	var _toDate2 = _interopRequireDefault(_toDate);

	var _toFloat = __webpack_require__(19);

	var _toFloat2 = _interopRequireDefault(_toFloat);

	var _toInt = __webpack_require__(72);

	var _toInt2 = _interopRequireDefault(_toInt);

	var _toBoolean = __webpack_require__(71);

	var _toBoolean2 = _interopRequireDefault(_toBoolean);

	var _equals = __webpack_require__(32);

	var _equals2 = _interopRequireDefault(_equals);

	var _contains = __webpack_require__(31);

	var _contains2 = _interopRequireDefault(_contains);

	var _matches = __webpack_require__(68);

	var _matches2 = _interopRequireDefault(_matches);

	var _isEmail = __webpack_require__(11);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _isURL = __webpack_require__(63);

	var _isURL2 = _interopRequireDefault(_isURL);

	var _isMACAddress = __webpack_require__(56);

	var _isMACAddress2 = _interopRequireDefault(_isMACAddress);

	var _isIP = __webpack_require__(15);

	var _isIP2 = _interopRequireDefault(_isIP);

	var _isFQDN = __webpack_require__(3);

	var _isFQDN2 = _interopRequireDefault(_isFQDN);

	var _isBoolean = __webpack_require__(40);

	var _isBoolean2 = _interopRequireDefault(_isBoolean);

	var _isAlpha = __webpack_require__(35);

	var _isAlpha2 = _interopRequireDefault(_isAlpha);

	var _isAlphanumeric = __webpack_require__(36);

	var _isAlphanumeric2 = _interopRequireDefault(_isAlphanumeric);

	var _isNumeric = __webpack_require__(61);

	var _isNumeric2 = _interopRequireDefault(_isNumeric);

	var _isLowercase = __webpack_require__(55);

	var _isLowercase2 = _interopRequireDefault(_isLowercase);

	var _isUppercase = __webpack_require__(65);

	var _isUppercase2 = _interopRequireDefault(_isUppercase);

	var _isAscii = __webpack_require__(37);

	var _isAscii2 = _interopRequireDefault(_isAscii);

	var _isFullWidth = __webpack_require__(12);

	var _isFullWidth2 = _interopRequireDefault(_isFullWidth);

	var _isHalfWidth = __webpack_require__(13);

	var _isHalfWidth2 = _interopRequireDefault(_isHalfWidth);

	var _isVariableWidth = __webpack_require__(66);

	var _isVariableWidth2 = _interopRequireDefault(_isVariableWidth);

	var _isMultibyte = __webpack_require__(59);

	var _isMultibyte2 = _interopRequireDefault(_isMultibyte);

	var _isSurrogatePair = __webpack_require__(62);

	var _isSurrogatePair2 = _interopRequireDefault(_isSurrogatePair);

	var _isInt = __webpack_require__(52);

	var _isInt2 = _interopRequireDefault(_isInt);

	var _isFloat = __webpack_require__(47);

	var _isFloat2 = _interopRequireDefault(_isFloat);

	var _isDecimal = __webpack_require__(45);

	var _isDecimal2 = _interopRequireDefault(_isDecimal);

	var _isHexadecimal = __webpack_require__(14);

	var _isHexadecimal2 = _interopRequireDefault(_isHexadecimal);

	var _isDivisibleBy = __webpack_require__(46);

	var _isDivisibleBy2 = _interopRequireDefault(_isDivisibleBy);

	var _isHexColor = __webpack_require__(48);

	var _isHexColor2 = _interopRequireDefault(_isHexColor);

	var _isJSON = __webpack_require__(53);

	var _isJSON2 = _interopRequireDefault(_isJSON);

	var _isNull = __webpack_require__(60);

	var _isNull2 = _interopRequireDefault(_isNull);

	var _isLength = __webpack_require__(54);

	var _isLength2 = _interopRequireDefault(_isLength);

	var _isByteLength = __webpack_require__(10);

	var _isByteLength2 = _interopRequireDefault(_isByteLength);

	var _isUUID = __webpack_require__(64);

	var _isUUID2 = _interopRequireDefault(_isUUID);

	var _isMongoId = __webpack_require__(58);

	var _isMongoId2 = _interopRequireDefault(_isMongoId);

	var _isDate = __webpack_require__(44);

	var _isDate2 = _interopRequireDefault(_isDate);

	var _isAfter = __webpack_require__(34);

	var _isAfter2 = _interopRequireDefault(_isAfter);

	var _isBefore = __webpack_require__(39);

	var _isBefore2 = _interopRequireDefault(_isBefore);

	var _isIn = __webpack_require__(51);

	var _isIn2 = _interopRequireDefault(_isIn);

	var _isCreditCard = __webpack_require__(41);

	var _isCreditCard2 = _interopRequireDefault(_isCreditCard);

	var _isISIN = __webpack_require__(50);

	var _isISIN2 = _interopRequireDefault(_isISIN);

	var _isISBN = __webpack_require__(49);

	var _isISBN2 = _interopRequireDefault(_isISBN);

	var _isMobilePhone = __webpack_require__(57);

	var _isMobilePhone2 = _interopRequireDefault(_isMobilePhone);

	var _isCurrency = __webpack_require__(42);

	var _isCurrency2 = _interopRequireDefault(_isCurrency);

	var _isISO = __webpack_require__(16);

	var _isISO2 = _interopRequireDefault(_isISO);

	var _isBase = __webpack_require__(38);

	var _isBase2 = _interopRequireDefault(_isBase);

	var _isDataURI = __webpack_require__(43);

	var _isDataURI2 = _interopRequireDefault(_isDataURI);

	var _ltrim = __webpack_require__(17);

	var _ltrim2 = _interopRequireDefault(_ltrim);

	var _rtrim = __webpack_require__(18);

	var _rtrim2 = _interopRequireDefault(_rtrim);

	var _trim = __webpack_require__(73);

	var _trim2 = _interopRequireDefault(_trim);

	var _escape = __webpack_require__(33);

	var _escape2 = _interopRequireDefault(_escape);

	var _unescape = __webpack_require__(74);

	var _unescape2 = _interopRequireDefault(_unescape);

	var _stripLow = __webpack_require__(70);

	var _stripLow2 = _interopRequireDefault(_stripLow);

	var _whitelist = __webpack_require__(75);

	var _whitelist2 = _interopRequireDefault(_whitelist);

	var _blacklist = __webpack_require__(9);

	var _blacklist2 = _interopRequireDefault(_blacklist);

	var _isWhitelisted = __webpack_require__(67);

	var _isWhitelisted2 = _interopRequireDefault(_isWhitelisted);

	var _normalizeEmail = __webpack_require__(69);

	var _normalizeEmail2 = _interopRequireDefault(_normalizeEmail);

	var _toString = __webpack_require__(5);

	var _toString2 = _interopRequireDefault(_toString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var version = '5.5.0';

	var validator = {
	  version: version,
	  toDate: _toDate2.default,
	  toFloat: _toFloat2.default, toInt: _toInt2.default,
	  toBoolean: _toBoolean2.default,
	  equals: _equals2.default, contains: _contains2.default, matches: _matches2.default,
	  isEmail: _isEmail2.default, isURL: _isURL2.default, isMACAddress: _isMACAddress2.default, isIP: _isIP2.default, isFQDN: _isFQDN2.default,
	  isBoolean: _isBoolean2.default,
	  isAlpha: _isAlpha2.default, isAlphanumeric: _isAlphanumeric2.default, isNumeric: _isNumeric2.default, isLowercase: _isLowercase2.default, isUppercase: _isUppercase2.default,
	  isAscii: _isAscii2.default, isFullWidth: _isFullWidth2.default, isHalfWidth: _isHalfWidth2.default, isVariableWidth: _isVariableWidth2.default,
	  isMultibyte: _isMultibyte2.default, isSurrogatePair: _isSurrogatePair2.default,
	  isInt: _isInt2.default, isFloat: _isFloat2.default, isDecimal: _isDecimal2.default, isHexadecimal: _isHexadecimal2.default, isDivisibleBy: _isDivisibleBy2.default,
	  isHexColor: _isHexColor2.default,
	  isJSON: _isJSON2.default,
	  isNull: _isNull2.default,
	  isLength: _isLength2.default, isByteLength: _isByteLength2.default,
	  isUUID: _isUUID2.default, isMongoId: _isMongoId2.default,
	  isDate: _isDate2.default, isAfter: _isAfter2.default, isBefore: _isBefore2.default,
	  isIn: _isIn2.default,
	  isCreditCard: _isCreditCard2.default,
	  isISIN: _isISIN2.default, isISBN: _isISBN2.default,
	  isMobilePhone: _isMobilePhone2.default,
	  isCurrency: _isCurrency2.default,
	  isISO8601: _isISO2.default,
	  isBase64: _isBase2.default, isDataURI: _isDataURI2.default,
	  ltrim: _ltrim2.default, rtrim: _rtrim2.default, trim: _trim2.default,
	  escape: _escape2.default, unescape: _unescape2.default, stripLow: _stripLow2.default,
	  whitelist: _whitelist2.default, blacklist: _blacklist2.default,
	  isWhitelisted: _isWhitelisted2.default,
	  normalizeEmail: _normalizeEmail2.default,
	  toString: _toString2.default
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var alpha = exports.alpha = {
	  'en-US': /^[A-Z]+$/i,
	  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
	  'de-DE': /^[A-ZÄÖÜß]+$/i,
	  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
	  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
	  'nl-NL': /^[A-ZÉËÏÓÖÜ]+$/i,
	  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
	  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
	  'pt-PT': /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
	  'ru-RU': /^[А-ЯЁа-яё]+$/i,
	  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
	  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
	};

	var alphanumeric = exports.alphanumeric = {
	  'en-US': /^[0-9A-Z]+$/i,
	  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
	  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
	  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
	  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
	  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
	  'nl-NL': /^[0-9A-ZÉËÏÓÖÜ]+$/i,
	  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
	  'pt-PT': /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
	  'ru-RU': /^[0-9А-ЯЁа-яё]+$/i,
	  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
	  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
	};

	var englishLocales = exports.englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];

	for (var locale, i = 0; i < englishLocales.length; i++) {
	  locale = 'en-' + englishLocales[i];
	  alpha[locale] = alpha['en-US'];
	  alphanumeric[locale] = alphanumeric['en-US'];
	}

	// Source: http://www.localeplanet.com/java/
	var arabicLocales = exports.arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];

	for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
	  _locale = 'ar-' + arabicLocales[_i];
	  alpha[_locale] = alpha.ar;
	  alphanumeric[_locale] = alphanumeric.ar;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = blacklist;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function blacklist(str, chars) {
	  (0, _assertString2.default)(str);
	  return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
	}
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isByteLength;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable prefer-rest-params */
	function isByteLength(str, options) {
	  (0, _assertString2.default)(str);
	  var min = void 0;
	  var max = void 0;
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    min = options.min || 0;
	    max = options.max;
	  } else {
	    // backwards compatibility: isByteLength(str, min [, max])
	    min = arguments[1];
	    max = arguments[2];
	  }
	  var len = encodeURI(str).split(/%..|./).length - 1;
	  return len >= min && (typeof max === 'undefined' || len <= max);
	}
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isEmail;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _merge = __webpack_require__(2);

	var _merge2 = _interopRequireDefault(_merge);

	var _isByteLength = __webpack_require__(10);

	var _isByteLength2 = _interopRequireDefault(_isByteLength);

	var _isFQDN = __webpack_require__(3);

	var _isFQDN2 = _interopRequireDefault(_isFQDN);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_email_options = {
	  allow_display_name: false,
	  allow_utf8_local_part: true,
	  require_tld: true
	};

	/* eslint-disable max-len */
	/* eslint-disable no-control-regex */
	var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
	var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
	var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
	var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
	var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
	/* eslint-enable max-len */
	/* eslint-enable no-control-regex */

	function isEmail(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_email_options);

	  if (options.allow_display_name) {
	    var display_email = str.match(displayName);
	    if (display_email) {
	      str = display_email[1];
	    }
	  }

	  var parts = str.split('@');
	  var domain = parts.pop();
	  var user = parts.join('@');

	  var lower_domain = domain.toLowerCase();
	  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
	    user = user.replace(/\./g, '').toLowerCase();
	  }

	  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 256 })) {
	    return false;
	  }

	  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
	    return false;
	  }

	  if (user[0] === '"') {
	    user = user.slice(1, user.length - 1);
	    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
	  }

	  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

	  var user_parts = user.split('.');
	  for (var i = 0; i < user_parts.length; i++) {
	    if (!pattern.test(user_parts[i])) {
	      return false;
	    }
	  }

	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullWidth = undefined;
	exports.default = isFullWidth;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fullWidth = exports.fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

	function isFullWidth(str) {
	  (0, _assertString2.default)(str);
	  return fullWidth.test(str);
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.halfWidth = undefined;
	exports.default = isHalfWidth;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var halfWidth = exports.halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

	function isHalfWidth(str) {
	  (0, _assertString2.default)(str);
	  return halfWidth.test(str);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isHexadecimal;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hexadecimal = /^[0-9A-F]+$/i;

	function isHexadecimal(str) {
	  (0, _assertString2.default)(str);
	  return hexadecimal.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isIP;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var ipv6Block = /^[0-9A-F]{1,4}$/i;

	function isIP(str) {
	  var version = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  (0, _assertString2.default)(str);
	  version = String(version);
	  if (!version) {
	    return isIP(str, 4) || isIP(str, 6);
	  } else if (version === '4') {
	    if (!ipv4Maybe.test(str)) {
	      return false;
	    }
	    var parts = str.split('.').sort(function (a, b) {
	      return a - b;
	    });
	    return parts[3] <= 255;
	  } else if (version === '6') {
	    var blocks = str.split(':');
	    var foundOmissionBlock = false; // marker to indicate ::

	    // At least some OS accept the last 32 bits of an IPv6 address
	    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
	    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
	    // and '::a.b.c.d' is deprecated, but also valid.
	    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
	    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

	    if (blocks.length > expectedNumberOfBlocks) {
	      return false;
	    }
	    // initial or final ::
	    if (str === '::') {
	      return true;
	    } else if (str.substr(0, 2) === '::') {
	      blocks.shift();
	      blocks.shift();
	      foundOmissionBlock = true;
	    } else if (str.substr(str.length - 2) === '::') {
	      blocks.pop();
	      blocks.pop();
	      foundOmissionBlock = true;
	    }

	    for (var i = 0; i < blocks.length; ++i) {
	      // test for a :: which can not be at the string start/end
	      // since those cases have been handled above
	      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
	        if (foundOmissionBlock) {
	          return false; // multiple :: in address
	        }
	        foundOmissionBlock = true;
	      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
	        // it has been checked before that the last
	        // block is a valid IPv4 address
	      } else if (!ipv6Block.test(blocks[i])) {
	        return false;
	      }
	    }
	    if (foundOmissionBlock) {
	      return blocks.length >= 1;
	    }
	    return blocks.length === expectedNumberOfBlocks;
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.iso8601 = undefined;

	exports.default = function (str) {
	  (0, _assertString2.default)(str);
	  return iso8601.test(str);
	};

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable max-len */
	// from http://goo.gl/0ejHHW
	var iso8601 = exports.iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
	/* eslint-enable max-len */

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ltrim;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ltrim(str, chars) {
	  (0, _assertString2.default)(str);
	  var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
	  return str.replace(pattern, '');
	}
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rtrim;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function rtrim(str, chars) {
	  (0, _assertString2.default)(str);
	  var pattern = chars ? new RegExp('[' + chars + ']') : /\s/;

	  var idx = str.length - 1;
	  while (idx >= 0 && pattern.test(str[idx])) {
	    idx--;
	  }

	  return idx < str.length ? str.substr(0, idx + 1) : str;
	}
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toFloat;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toFloat(str) {
	  (0, _assertString2.default)(str);
	  return parseFloat(str);
	}
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ServerActionResults = exports.ServerActionResults = function ServerActionResults(data) {
	  return "queues/" + data.action + "/results/" + data.payload.key;
	};

	exports.default = ServerActionResults;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getUserRef = function getUserRef(uid) {
	  var child = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	  var ref = "users/" + uid;
	  if (!child) return ref;
	  return ref + "/" + child;
	};
	exports.default = getUserRef;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.User = exports.ServerActionResults = undefined;

	var _ServerActionResults2 = __webpack_require__(20);

	var _ServerActionResults3 = _interopRequireDefault(_ServerActionResults2);

	var _User2 = __webpack_require__(21);

	var _User3 = _interopRequireDefault(_User2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.ServerActionResults = _ServerActionResults3.default;
	exports.User = _User3.default;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getDataFromRef = exports.getDataFromRef = function getDataFromRef(ref) {
	  return ref.once('value').then(function (snap) {
	    return snap.val();
	  });
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	/*!
	 * in-array <https://github.com/jonschlinkert/in-array>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */

	'use strict';

	module.exports = function inArray(arr, val) {
	  arr = arr || [];
	  var len = arr.length;
	  var i;

	  for (i = 0; i < len; i++) {
	    if (arr[i] === val) {
	      return true;
	    }
	  }
	  return false;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var IsAllTrue = function IsAllTrue(arr) {
	  return arr.every(function (el) {
	    return Boolean(el) == true;
	  });
	};
	exports.default = IsAllTrue;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(7);

	var _Utils = __webpack_require__(6);

	var AllowedNetworks = Object.keys(__webpack_require__(30));
	var CommonProviders = ['@gmail.com', '@googlemail.com', '@hotmail.com', '@outlook.com', '@live.com', '@me.com', '@mac.com', '@icloud.com', '@att.com', '@verizon.com', '@comcast.com', '@yahoo.com', '@aol.com', '@mynet.com'];

	var Validate = function Validate(email) {
	  email = (0, _validator.normalizeEmail)(email);

	  var tests = (0, _Utils.IsAllTrue)([(0, _validator.isEmail)(email)]);

	  if (!tests) return Promise.reject('INVALID_EMAIL');

	  var providerTests = CommonProviders.map(function (provider) {
	    return email.includes(provider);
	  });

	  if ((0, _Utils.IsAllTrue)(providerTests)) return Promise.reject('COMMON_PROVIDER');

	  return new Promise(function (resolve, reject) {
	    // Check other things

	    if ((0, _Utils.InArray)(AllowedNetworks, email.split('@')[1])) {
	      resolve(email);
	    } else {
	      if (email.includes('.edu')) {
	        reject('NETWORK_NOT_SUPPORTED');
	      } else {
	        reject('CHECK_EMAIL');
	      }
	    }
	  });
	};

	exports.default = Validate;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _validator = __webpack_require__(7);

	var Validate = function Validate(number) {
	    var test = (0, _validator.isMobilePhone)(number, 'tr-TR');

	    if (tests) return number;
	    return false;
	};

	exports.default = Validate;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NetworkEmailValidation = exports.PhoneNumberValidation = undefined;

	var _PhoneNumber = __webpack_require__(27);

	var _PhoneNumber2 = _interopRequireDefault(_PhoneNumber);

	var _NetworkEmail = __webpack_require__(26);

	var _NetworkEmail2 = _interopRequireDefault(_NetworkEmail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.PhoneNumberValidation = _PhoneNumber2.default;
	exports.NetworkEmailValidation = _NetworkEmail2.default;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _References = __webpack_require__(22);

	var _References2 = _interopRequireDefault(_References);

	var _Utils = __webpack_require__(6);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Validations = __webpack_require__(28);

	var _Validations2 = _interopRequireDefault(_Validations);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  References: _References2.default,
	  Utils: _Utils2.default,
	  Validations: _Validations2.default
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {
		"std.yeditepe.edu.tr": true,
		"stu.bahcesehir.edu.tr": true,
		"barbar.com.tr": true
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = contains;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toString = __webpack_require__(5);

	var _toString2 = _interopRequireDefault(_toString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function contains(str, elem) {
	  (0, _assertString2.default)(str);
	  return str.indexOf((0, _toString2.default)(elem)) >= 0;
	}
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = equals;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function equals(str, comparison) {
	  (0, _assertString2.default)(str);
	  return str === comparison;
	}
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = escape;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function escape(str) {
	      (0, _assertString2.default)(str);
	      return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/`/g, '&#96;');
	}
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAfter;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toDate = __webpack_require__(4);

	var _toDate2 = _interopRequireDefault(_toDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAfter(str) {
	  var date = arguments.length <= 1 || arguments[1] === undefined ? String(new Date()) : arguments[1];

	  (0, _assertString2.default)(str);
	  var comparison = (0, _toDate2.default)(date);
	  var original = (0, _toDate2.default)(str);
	  return !!(original && comparison && original > comparison);
	}
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAlpha;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _alpha = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAlpha(str) {
	  var locale = arguments.length <= 1 || arguments[1] === undefined ? 'en-US' : arguments[1];

	  (0, _assertString2.default)(str);
	  if (locale in _alpha.alpha) {
	    return _alpha.alpha[locale].test(str);
	  }
	  throw new Error('Invalid locale \'' + locale + '\'');
	}
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAlphanumeric;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _alpha = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAlphanumeric(str) {
	  var locale = arguments.length <= 1 || arguments[1] === undefined ? 'en-US' : arguments[1];

	  (0, _assertString2.default)(str);
	  if (locale in _alpha.alphanumeric) {
	    return _alpha.alphanumeric[locale].test(str);
	  }
	  throw new Error('Invalid locale \'' + locale + '\'');
	}
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAscii;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-control-regex */
	var ascii = /^[\x00-\x7F]+$/;
	/* eslint-enable no-control-regex */

	function isAscii(str) {
	  (0, _assertString2.default)(str);
	  return ascii.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBase64;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var notBase64 = /[^A-Z0-9+\/=]/i;

	function isBase64(str) {
	  (0, _assertString2.default)(str);
	  var len = str.length;
	  if (!len || len % 4 !== 0 || notBase64.test(str)) {
	    return false;
	  }
	  var firstPaddingChar = str.indexOf('=');
	  return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
	}
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBefore;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toDate = __webpack_require__(4);

	var _toDate2 = _interopRequireDefault(_toDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isBefore(str) {
	  var date = arguments.length <= 1 || arguments[1] === undefined ? String(new Date()) : arguments[1];

	  (0, _assertString2.default)(str);
	  var comparison = (0, _toDate2.default)(date);
	  var original = (0, _toDate2.default)(str);
	  return !!(original && comparison && original < comparison);
	}
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBoolean;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isBoolean(str) {
	  (0, _assertString2.default)(str);
	  return ['true', 'false', '1', '0'].indexOf(str) >= 0;
	}
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isCreditCard;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable max-len */
	var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})|62[0-9]{14}$/;
	/* eslint-enable max-len */

	function isCreditCard(str) {
	  (0, _assertString2.default)(str);
	  var sanitized = str.replace(/[^0-9]+/g, '');
	  if (!creditCard.test(sanitized)) {
	    return false;
	  }
	  var sum = 0;
	  var digit = void 0;
	  var tmpNum = void 0;
	  var shouldDouble = void 0;
	  for (var i = sanitized.length - 1; i >= 0; i--) {
	    digit = sanitized.substring(i, i + 1);
	    tmpNum = parseInt(digit, 10);
	    if (shouldDouble) {
	      tmpNum *= 2;
	      if (tmpNum >= 10) {
	        sum += tmpNum % 10 + 1;
	      } else {
	        sum += tmpNum;
	      }
	    } else {
	      sum += tmpNum;
	    }
	    shouldDouble = !shouldDouble;
	  }
	  return !!(sum % 10 === 0 ? sanitized : false);
	}
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isCurrency;

	var _merge = __webpack_require__(2);

	var _merge2 = _interopRequireDefault(_merge);

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function currencyRegex(options) {
	  var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?'),
	      negative = '-?',
	      whole_dollar_amount_without_sep = '[1-9]\\d*',
	      whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*',
	      valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
	      whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?',
	      decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
	  var pattern = whole_dollar_amount + decimal_amount;

	  // default is negative sign before symbol, but there are two other options (besides parens)
	  if (options.allow_negatives && !options.parens_for_negatives) {
	    if (options.negative_sign_after_digits) {
	      pattern += negative;
	    } else if (options.negative_sign_before_digits) {
	      pattern = negative + pattern;
	    }
	  }

	  // South African Rand, for example, uses R 123 (space) and R-123 (no space)
	  if (options.allow_negative_sign_placeholder) {
	    pattern = '( (?!\\-))?' + pattern;
	  } else if (options.allow_space_after_symbol) {
	    pattern = ' ?' + pattern;
	  } else if (options.allow_space_after_digits) {
	    pattern += '( (?!$))?';
	  }

	  if (options.symbol_after_digits) {
	    pattern += symbol;
	  } else {
	    pattern = symbol + pattern;
	  }

	  if (options.allow_negatives) {
	    if (options.parens_for_negatives) {
	      pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
	    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
	      pattern = negative + pattern;
	    }
	  }

	  /* eslint-disable prefer-template */
	  return new RegExp('^' +
	  // ensure there's a dollar and/or decimal amount, and that
	  // it doesn't start with a space or a negative sign followed by a space
	  '(?!-? )(?=.*\\d)' + pattern + '$');
	  /* eslint-enable prefer-template */
	}

	var default_currency_options = {
	  symbol: '$',
	  require_symbol: false,
	  allow_space_after_symbol: false,
	  symbol_after_digits: false,
	  allow_negatives: true,
	  parens_for_negatives: false,
	  negative_sign_before_digits: false,
	  negative_sign_after_digits: false,
	  allow_negative_sign_placeholder: false,
	  thousands_separator: ',',
	  decimal_separator: '.',
	  allow_space_after_digits: false
	};

	function isCurrency(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_currency_options);
	  return currencyRegex(options).test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDataURI;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dataURI = /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9!\$&',\(\)\*\+,;=\-\._~:@\/\?%\s]*\s*$/i; // eslint-disable-line max-len

	function isDataURI(str) {
	  (0, _assertString2.default)(str);
	  return dataURI.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDate;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isISO = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getTimezoneOffset(str) {
	  var iso8601Parts = str.match(_isISO.iso8601);
	  var timezone = void 0,
	      sign = void 0,
	      hours = void 0,
	      minutes = void 0;
	  if (!iso8601Parts) {
	    str = str.toLowerCase();
	    timezone = str.match(/(?:\s|gmt\s*)(-|\+)(\d{1,4})(\s|$)/);
	    if (!timezone) {
	      return str.indexOf('gmt') !== -1 ? 0 : null;
	    }
	    sign = timezone[1];
	    var offset = timezone[2];
	    if (offset.length === 3) {
	      offset = '0' + offset;
	    }
	    if (offset.length <= 2) {
	      hours = 0;
	      minutes = parseInt(offset, 10);
	    } else {
	      hours = parseInt(offset.slice(0, 2), 10);
	      minutes = parseInt(offset.slice(2, 4), 10);
	    }
	  } else {
	    timezone = iso8601Parts[21];
	    if (!timezone) {
	      // if no hour/minute was provided, the date is GMT
	      return !iso8601Parts[12] ? 0 : null;
	    }
	    if (timezone === 'z' || timezone === 'Z') {
	      return 0;
	    }
	    sign = iso8601Parts[22];
	    if (timezone.indexOf(':') !== -1) {
	      hours = parseInt(iso8601Parts[23], 10);
	      minutes = parseInt(iso8601Parts[24], 10);
	    } else {
	      hours = 0;
	      minutes = parseInt(iso8601Parts[23], 10);
	    }
	  }
	  return (hours * 60 + minutes) * (sign === '-' ? 1 : -1);
	}

	function isDate(str) {
	  (0, _assertString2.default)(str);
	  var normalizedDate = new Date(Date.parse(str));
	  if (isNaN(normalizedDate)) {
	    return false;
	  }

	  // normalizedDate is in the user's timezone. Apply the input
	  // timezone offset to the date so that the year and day match
	  // the input
	  var timezoneOffset = getTimezoneOffset(str);
	  if (timezoneOffset !== null) {
	    var timezoneDifference = normalizedDate.getTimezoneOffset() - timezoneOffset;
	    normalizedDate = new Date(normalizedDate.getTime() + 60000 * timezoneDifference);
	  }

	  var day = String(normalizedDate.getDate());
	  var dayOrYear = void 0,
	      dayOrYearMatches = void 0,
	      year = void 0;
	  // check for valid double digits that could be late days
	  // check for all matches since a string like '12/23' is a valid date
	  // ignore everything with nearby colons
	  dayOrYearMatches = str.match(/(^|[^:\d])[23]\d([^:\d]|$)/g);
	  if (!dayOrYearMatches) {
	    return true;
	  }
	  dayOrYear = dayOrYearMatches.map(function (digitString) {
	    return digitString.match(/\d+/g)[0];
	  }).join('/');

	  year = String(normalizedDate.getFullYear()).slice(-2);
	  if (dayOrYear === day || dayOrYear === year) {
	    return true;
	  } else if (dayOrYear === '' + day / year || dayOrYear === '' + year / day) {
	    return true;
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDecimal;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/;

	function isDecimal(str) {
	  (0, _assertString2.default)(str);
	  return str !== '' && decimal.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDivisibleBy;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toFloat = __webpack_require__(19);

	var _toFloat2 = _interopRequireDefault(_toFloat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isDivisibleBy(str, num) {
	  (0, _assertString2.default)(str);
	  return (0, _toFloat2.default)(str) % parseInt(num, 10) === 0;
	}
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFloat;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

	function isFloat(str, options) {
	  (0, _assertString2.default)(str);
	  options = options || {};
	  if (str === '' || str === '.') {
	    return false;
	  }
	  return float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
	}
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isHexColor;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

	function isHexColor(str) {
	  (0, _assertString2.default)(str);
	  return hexcolor.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isISBN;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
	var isbn13Maybe = /^(?:[0-9]{13})$/;
	var factor = [1, 3];

	function isISBN(str) {
	  var version = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  (0, _assertString2.default)(str);
	  version = String(version);
	  if (!version) {
	    return isISBN(str, 10) || isISBN(str, 13);
	  }
	  var sanitized = str.replace(/[\s-]+/g, '');
	  var checksum = 0;
	  var i = void 0;
	  if (version === '10') {
	    if (!isbn10Maybe.test(sanitized)) {
	      return false;
	    }
	    for (i = 0; i < 9; i++) {
	      checksum += (i + 1) * sanitized.charAt(i);
	    }
	    if (sanitized.charAt(9) === 'X') {
	      checksum += 10 * 10;
	    } else {
	      checksum += 10 * sanitized.charAt(9);
	    }
	    if (checksum % 11 === 0) {
	      return !!sanitized;
	    }
	  } else if (version === '13') {
	    if (!isbn13Maybe.test(sanitized)) {
	      return false;
	    }
	    for (i = 0; i < 12; i++) {
	      checksum += factor[i % 2] * sanitized.charAt(i);
	    }
	    if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
	      return !!sanitized;
	    }
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isISIN;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

	function isISIN(str) {
	  (0, _assertString2.default)(str);
	  if (!isin.test(str)) {
	    return false;
	  }

	  var checksumStr = str.replace(/[A-Z]/g, function (character) {
	    return parseInt(character, 36);
	  });

	  var sum = 0;
	  var digit = void 0;
	  var tmpNum = void 0;
	  var shouldDouble = true;
	  for (var i = checksumStr.length - 2; i >= 0; i--) {
	    digit = checksumStr.substring(i, i + 1);
	    tmpNum = parseInt(digit, 10);
	    if (shouldDouble) {
	      tmpNum *= 2;
	      if (tmpNum >= 10) {
	        sum += tmpNum + 1;
	      } else {
	        sum += tmpNum;
	      }
	    } else {
	      sum += tmpNum;
	    }
	    shouldDouble = !shouldDouble;
	  }

	  return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
	}
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isIn;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toString = __webpack_require__(5);

	var _toString2 = _interopRequireDefault(_toString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isIn(str, options) {
	  (0, _assertString2.default)(str);
	  var i = void 0;
	  if (Object.prototype.toString.call(options) === '[object Array]') {
	    var array = [];
	    for (i in options) {
	      if ({}.hasOwnProperty.call(options, i)) {
	        array[i] = (0, _toString2.default)(options[i]);
	      }
	    }
	    return array.indexOf(str) >= 0;
	  } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    return options.hasOwnProperty(str);
	  } else if (options && typeof options.indexOf === 'function') {
	    return options.indexOf(str) >= 0;
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isInt;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
	var intLeadingZeroes = /^[-+]?[0-9]+$/;

	function isInt(str, options) {
	  (0, _assertString2.default)(str);
	  options = options || {};

	  // Get the regex to use for testing, based on whether
	  // leading zeroes are allowed or not.
	  var regex = options.hasOwnProperty('allow_leading_zeroes') && options.allow_leading_zeroes ? intLeadingZeroes : int;

	  // Check min/max
	  var minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
	  var maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;

	  return regex.test(str) && minCheckPassed && maxCheckPassed;
	}
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isJSON;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isJSON(str) {
	  (0, _assertString2.default)(str);
	  try {
	    var obj = JSON.parse(str);
	    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	  } catch (e) {/* ignore */}
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isLength;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable prefer-rest-params */
	function isLength(str, options) {
	  (0, _assertString2.default)(str);
	  var min = void 0;
	  var max = void 0;
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    min = options.min || 0;
	    max = options.max;
	  } else {
	    // backwards compatibility: isLength(str, min [, max])
	    min = arguments[1];
	    max = arguments[2];
	  }
	  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
	  var len = str.length - surrogatePairs.length;
	  return len >= min && (typeof max === 'undefined' || len <= max);
	}
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isLowercase;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isLowercase(str) {
	  (0, _assertString2.default)(str);
	  return str === str.toLowerCase();
	}
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMACAddress;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;

	function isMACAddress(str) {
	  (0, _assertString2.default)(str);
	  return macAddress.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMobilePhone;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable max-len */
	var phones = {
	  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
	  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
	  'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
	  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
	  'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
	  'da-DK': /^(\+?45)?(\d{8})$/,
	  'el-GR': /^(\+?30)?(69\d{8})$/,
	  'en-AU': /^(\+?61|0)4\d{8}$/,
	  'en-GB': /^(\+?44|0)7\d{9}$/,
	  'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
	  'en-IN': /^(\+?91|0)?[789]\d{9}$/,
	  'en-NZ': /^(\+?64|0)2\d{7,9}$/,
	  'en-ZA': /^(\+?27|0)\d{9}$/,
	  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
	  'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
	  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
	  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
	  'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
	  'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
	  'nb-NO': /^(\+?47)?[49]\d{7}$/,
	  'nn-NO': /^(\+?47)?[49]\d{7}$/,
	  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
	  'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
	  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
	  'ru-RU': /^(\+?7|8)?9\d{9}$/,
	  'tr-TR': /^(\+?90|0)?5\d{9}$/,
	  'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
	  'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
	  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
	};
	/* eslint-enable max-len */

	// aliases
	phones['en-CA'] = phones['en-US'];

	function isMobilePhone(str, locale) {
	  (0, _assertString2.default)(str);
	  if (locale in phones) {
	    return phones[locale].test(str);
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMongoId;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isHexadecimal = __webpack_require__(14);

	var _isHexadecimal2 = _interopRequireDefault(_isHexadecimal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isMongoId(str) {
	  (0, _assertString2.default)(str);
	  return (0, _isHexadecimal2.default)(str) && str.length === 24;
	}
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMultibyte;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-control-regex */
	var multibyte = /[^\x00-\x7F]/;
	/* eslint-enable no-control-regex */

	function isMultibyte(str) {
	  (0, _assertString2.default)(str);
	  return multibyte.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isNull;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isNull(str) {
	  (0, _assertString2.default)(str);
	  return str.length === 0;
	}
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isNumeric;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var numeric = /^[-+]?[0-9]+$/;

	function isNumeric(str) {
	  (0, _assertString2.default)(str);
	  return numeric.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isSurrogatePair;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

	function isSurrogatePair(str) {
	  (0, _assertString2.default)(str);
	  return surrogatePair.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isURL;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isFQDN = __webpack_require__(3);

	var _isFQDN2 = _interopRequireDefault(_isFQDN);

	var _isIP = __webpack_require__(15);

	var _isIP2 = _interopRequireDefault(_isIP);

	var _merge = __webpack_require__(2);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_url_options = {
	  protocols: ['http', 'https', 'ftp'],
	  require_tld: true,
	  require_protocol: false,
	  require_valid_protocol: true,
	  allow_underscores: false,
	  allow_trailing_dot: false,
	  allow_protocol_relative_urls: false
	};

	function isURL(url, options) {
	  (0, _assertString2.default)(url);
	  if (!url || url.length >= 2083 || /\s/.test(url)) {
	    return false;
	  }
	  if (url.indexOf('mailto:') === 0) {
	    return false;
	  }
	  options = (0, _merge2.default)(options, default_url_options);
	  var protocol = void 0,
	      auth = void 0,
	      host = void 0,
	      hostname = void 0,
	      port = void 0,
	      port_str = void 0,
	      split = void 0;

	  split = url.split('#');
	  url = split.shift();

	  split = url.split('?');
	  url = split.shift();

	  split = url.split('://');
	  if (split.length > 1) {
	    protocol = split.shift();
	    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
	      return false;
	    }
	  } else if (options.require_protocol) {
	    return false;
	  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
	    split[0] = url.substr(2);
	  }
	  url = split.join('://');

	  split = url.split('/');
	  url = split.shift();
	  split = url.split('@');
	  if (split.length > 1) {
	    auth = split.shift();
	    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
	      return false;
	    }
	  }
	  hostname = split.join('@');
	  split = hostname.split(':');
	  host = split.shift();
	  if (split.length) {
	    port_str = split.join(':');
	    port = parseInt(port_str, 10);
	    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
	      return false;
	    }
	  }
	  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && host !== 'localhost') {
	    return false;
	  }
	  if (options.host_whitelist && options.host_whitelist.indexOf(host) === -1) {
	    return false;
	  }
	  if (options.host_blacklist && options.host_blacklist.indexOf(host) !== -1) {
	    return false;
	  }
	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isUUID;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var uuid = {
	  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
	  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
	  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
	  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	};

	function isUUID(str) {
	  var version = arguments.length <= 1 || arguments[1] === undefined ? 'all' : arguments[1];

	  (0, _assertString2.default)(str);
	  var pattern = uuid[version];
	  return pattern && pattern.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isUppercase;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isUppercase(str) {
	  (0, _assertString2.default)(str);
	  return str === str.toUpperCase();
	}
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isVariableWidth;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isFullWidth = __webpack_require__(12);

	var _isHalfWidth = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isVariableWidth(str) {
	  (0, _assertString2.default)(str);
	  return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isWhitelisted;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isWhitelisted(str, chars) {
	  (0, _assertString2.default)(str);
	  for (var i = str.length - 1; i >= 0; i--) {
	    if (chars.indexOf(str[i]) === -1) {
	      return false;
	    }
	  }
	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = matches;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function matches(str, pattern, modifiers) {
	  (0, _assertString2.default)(str);
	  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
	    pattern = new RegExp(pattern, modifiers);
	  }
	  return pattern.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = normalizeEmail;

	var _isEmail = __webpack_require__(11);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _merge = __webpack_require__(2);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_normalize_email_options = {
	  lowercase: true,
	  remove_dots: true,
	  remove_extension: true
	};

	function normalizeEmail(email, options) {
	  options = (0, _merge2.default)(options, default_normalize_email_options);
	  if (!(0, _isEmail2.default)(email)) {
	    return false;
	  }
	  var parts = email.split('@', 2);
	  parts[1] = parts[1].toLowerCase();
	  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
	    if (options.remove_extension) {
	      parts[0] = parts[0].split('+')[0];
	    }
	    if (options.remove_dots) {
	      parts[0] = parts[0].replace(/\./g, '');
	    }
	    if (!parts[0].length) {
	      return false;
	    }
	    parts[0] = parts[0].toLowerCase();
	    parts[1] = 'gmail.com';
	  } else if (options.lowercase) {
	    parts[0] = parts[0].toLowerCase();
	  }
	  return parts.join('@');
	}
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = stripLow;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _blacklist = __webpack_require__(9);

	var _blacklist2 = _interopRequireDefault(_blacklist);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function stripLow(str, keep_new_lines) {
	  (0, _assertString2.default)(str);
	  var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
	  return (0, _blacklist2.default)(str, chars);
	}
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toBoolean;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toBoolean(str, strict) {
	  (0, _assertString2.default)(str);
	  if (strict) {
	    return str === '1' || str === 'true';
	  }
	  return str !== '0' && str !== 'false' && str !== '';
	}
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toInt;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toInt(str, radix) {
	  (0, _assertString2.default)(str);
	  return parseInt(str, radix || 10);
	}
	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = trim;

	var _rtrim = __webpack_require__(18);

	var _rtrim2 = _interopRequireDefault(_rtrim);

	var _ltrim = __webpack_require__(17);

	var _ltrim2 = _interopRequireDefault(_ltrim);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function trim(str, chars) {
	  return (0, _rtrim2.default)((0, _ltrim2.default)(str, chars), chars);
	}
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = unescape;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function unescape(str) {
	      (0, _assertString2.default)(str);
	      return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#96;/g, '`');
	}
	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = whitelist;

	var _assertString = __webpack_require__(1);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function whitelist(str, chars) {
	  (0, _assertString2.default)(str);
	  return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
	}
	module.exports = exports['default'];

/***/ }
/******/ ]);