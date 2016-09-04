'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Commands;

var _acl = require('../tasks/acl');

var ACL = _interopRequireWildcard(_acl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function Commands(vorpal) {

  vorpal.command('acl generatetoken <uid>', 'Generates a Firebase token').action(function (args, cb) {
    var token = ACL.createCustomToken(args.uid);
    this.log('Here\'s your token:');
    this.log(token);
    if (cb) cb();
    return token;
  });

  vorpal.command('acl add <uid> <group>', 'Adds UID given to the group').action(function (args, cb) {
    var _this = this;

    var self = this;
    var uid = args.uid;
    var group = args.group;

    ACL.setGroupMembership(uid, group, true).then(function () {
      _this.log(uid + ' was *added* to the group ' + group);
      cb();
    });
  });

  vorpal.command('acl check <uid> <group>', 'Checks if UID given is in the group').action(function (args, cb) {
    var _this2 = this;

    var self = this;
    var uid = args.uid;
    var group = args.group;

    ACL.isInGroup(uid, group).then(function (status) {
      console.log(status);
      _this2.log(uid + ' is *' + (status ? 'IN' : 'NOT IN') + '* ' + group);
      cb();
    });
  });

  vorpal.command('acl reset <uid>', 'Resets groups of a UID').action(function (args, cb) {
    var _this3 = this;

    var self = this;
    var uid = args.uid;
    var group = args.group;

    ACL.resetAccess(uid).then(function () {
      _this3.log(uid + ' was *removed* from *ALL* groups.');
      cb();
    });
  });

  vorpal.command('acl rm <uid> <group>', 'Removes UID given from the group').action(function (args, cb) {
    var _this4 = this;

    var self = this;
    var uid = args.uid;
    var group = args.group;

    ACL.setGroupMembership(uid, group, null).then(function () {
      _this4.log(uid + ' was *removed* to the group ' + group);
      cb();
    });
  });

  vorpal.command('acl listmembers <group>', 'Lists members of a group').action(function (args, cb) {
    var self = this;
    var group = args.group;

    ACL.listMembersFor(group).then(function (members) {
      if (!members || members.length < 1) {
        self.log(group + ' doesn\'t have any members.');
      } else {
        self.log(group + ' has these members:');
        members.forEach(function (member) {
          return self.log('' + member);
        });
      }
      cb();
    });
  });

  vorpal.command('acl listgroups <uid>', 'Lists groups of a given UID').action(function (args, cb) {
    var self = this;
    var uid = args.uid;

    ACL.listGroupsFor(uid).then(function (groups) {
      if (!groups || groups.length < 1) {
        self.log(uid + ' is not in any group.');
      } else {
        self.log(uid + ' is in these groups:');
        groups.forEach(function (group) {
          return self.log('' + group);
        });
      }
      cb();
    });
  });

  return vorpal;
}
//# sourceMappingURL=acl.js.map