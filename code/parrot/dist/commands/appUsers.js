'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Commands;

var _appUsers = require('../tasks/appUsers');

var _appUsers2 = _interopRequireDefault(_appUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Commands(vorpal) {
  vorpal.command('app users clean <uid>', 'Cleanups a user').action(function (args, cb) {
    var _this = this;

    _appUsers2.default.cleanAppUser(args.uid).then(function () {
      _this.log(args.uid + ' is completely removed.');
      cb();
    });
  });
}
//# sourceMappingURL=appUsers.js.map