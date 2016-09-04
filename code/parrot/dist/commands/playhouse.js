'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Commands;

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _playhouse = require('../tasks/playhouse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Commands(vorpal) {

  vorpal.command('ph login admin [uid]', 'Login to the Playhouse UI with the UID given. If none given, uses \'playhouse_admin\'.').action(function (args, cb) {
    var uid = args.uid ? args.uid : 'playhouse_admin';
    var token = vorpal.execSync('acl generatetoken ' + uid);
    var link = 'http://localhost:7503/login/admin?token=' + token;
    (0, _open2.default)(link);
    this.log('If a browser didn\'t opened, go to: ' + link);
    cb();
  });

  vorpal.command('ph login user <fid>', 'Login to the Playhouse UI with a Test User.').option('-s, --sync', 'Runs "ph sync list" before running. Helps with expired tokens.').option('-c, --clean', 'Cleans user from the app and our lists before getting the token. This also triggers --sync.').action(function (args, cb) {
    var _this = this;

    var fid = args.fid;
    var before = new Promise(function (resolve) {
      if (args.options.sync) _this.log('Please sync manually.');
      return resolve();
    });
    before.then(function () {
      _this.log('Getting access token...');
      return _playhouse.facebook.getAccessTokenFor(fid).then(function (access_token) {
        if (access_token) {
          _this.log('Got the token! If you must know, it\'s ' + access_token);
          var link = 'http://localhost:7503/login/user?access_token=' + access_token;
          (0, _open2.default)(link);
          _this.log('If a browser didn\'t opened, go to: ' + link);
          _this.log('Also, if there is an error, it may be about expired tokens. Try running with --sync.');
        } else {
          _this.log('We couldn\'t find a token for Facebook ID ' + fid + '. Check if the user installed the app or if the ID is correct.');
        }

        cb();
      });
    });
  });

  vorpal.command('ph sync list', 'Synchronizes the list of our Facebook Test Users').action(function (args, cb) {
    var _this2 = this;

    var uid = vorpal.localStorage.getItem('uid');

    if (!uid) {
      this.log('You need an UID with a \'playhouse_writers\' permission.');
      cb();
      return;
    }

    this.log('Starting to sync...');
    return _playhouse.facebook.syncFacebookTestUserList().then(function (count) {
      _this2.log(count + ' users were sync\'d.');
      cb();
      return Promise.resolve();
    });
  });

  vorpal.command('ph sync profiles', 'Downloads the profile details of our Facebook Test Users').action(function (args, cb) {
    var _this3 = this;

    var uid = vorpal.localStorage.getItem('uid');

    if (!uid) {
      this.log('You need an UID with a \'playhouse_writers\' permission.');
      cb();
      return;
    }

    this.log('Notice: Remember to always run \'ph sync list\' before running this command.');
    this.log('Starting to pulling profile details of our Test Users... This may take a while.');
    return _playhouse.facebook.syncFacebookTestUserProfiles().then(function (count) {
      _this3.log(count + ' users were sync\'d.');
      cb();
    });
  });

  vorpal.command('ph sync passwords [password]', 'Sets passwords of all Test Users to [password]. Defaults to "bar123bar."').action(function (args, cb) {
    var _this4 = this;

    var uid = vorpal.localStorage.getItem('uid');

    if (!uid) {
      this.log('You need an UID with a \'playhouse_writers\' permission.');
      cb();
      return;
    }

    var password = args.password || 'bar123bar.';

    this.log('Starting to set passwords...');
    return _playhouse.facebook.syncFacebookTestUserPasswords(password).then(function (count) {
      _this4.log(count + ' user passwords were set to ' + password);
      cb();
      return Promise.resolve();
    });
  });

  vorpal.command('ph sync app', 'Adds all users to the app').action(function (args, cb) {
    var _this5 = this;

    var uid = vorpal.localStorage.getItem('uid');

    if (!uid) {
      this.log('You need an UID with a \'playhouse_writers\' permission.');
      cb();
      return;
    }

    this.log('Starting to add...This *will* take a few minutes.');
    return _playhouse.facebook.syncFacebookTestUsersWithApp().then(function (count) {
      _this5.log(count + ' user were added to the app');
      cb();
      return Promise.resolve();
    });
  });

  vorpal.command('ph clean app', 'Cleans all users from the app').action(function (args, cb) {
    var _this6 = this;

    var uid = vorpal.localStorage.getItem('uid');

    if (!uid) {
      this.log('You need an UID with a \'playhouse_writers\' permission.');
      cb();
      return;
    }

    this.log('Starting to clean...This *will* take a seconds minutes.');
    return _playhouse.facebook.cleanFacebookTestUsersFromApp().then(function (count) {
      _this6.log(count + ' user were cleaned from the app');
      cb();
      return Promise.resolve();
    });
  });
}
//# sourceMappingURL=playhouse.js.map