import * as ACL from '../tasks/acl';

export default function Commands(vorpal) {

  vorpal.command('acl generatetoken <uid>', 'Generates a Firebase token')
    .action(function (args, cb) {
      const token = ACL.createCustomToken(args.uid);
      this.log(`Here's your token:`);
      this.log(token);
      if(cb) cb();
      return token;
    });

  vorpal.command('acl add <uid> <group>', 'Adds UID given to the group')
    .action(function (args, cb) {
      const self = this;
      const { uid, group } = args;
      ACL.setGroupMembership(uid, group, true).then(() => {
        this.log(`${uid} was *added* to the group ${group}`);
        cb();
      });
    });

  vorpal.command('acl check <uid> <group>', 'Checks if UID given is in the group')
    .action(function (args, cb) {
      const self = this;
      const { uid, group } = args;
      ACL.isInGroup(uid, group).then((status) => {
        console.log(status)
        this.log(`${uid} is *${status ? 'IN' : 'NOT IN'}* ${group}`);
        cb();
      });
    });

  vorpal.command('acl reset <uid>', 'Resets groups of a UID')
    .action(function (args, cb) {
      const self = this;
      const { uid, group } = args;
      ACL.resetAccess(uid).then(() => {
        this.log(`${uid} was *removed* from *ALL* groups.`);
        cb();
      });
    });

  vorpal.command('acl rm <uid> <group>', 'Removes UID given from the group')
    .action(function (args, cb) {
      const self = this;
      const { uid, group } = args;
      ACL.setGroupMembership(uid, group, null).then(() => {
        this.log(`${uid} was *removed* to the group ${group}`);
        cb();
      });
    });

  vorpal.command('acl listmembers <group>', 'Lists members of a group')
    .action(function (args, cb) {
      const self = this;
      const { group } = args;
      ACL.listMembersFor(group).then((members) => {
        if (!members || members.length < 1) {
          self.log(`${group} doesn't have any members.`);
        } else {
          self.log(`${group} has these members:`);
          members.forEach(member => self.log(`${member}`))
        }
        cb();
      });
    });


  vorpal.command('acl listgroups <uid>',  'Lists groups of a given UID')
    .action(function (args, cb) {
      const self = this;
      const { uid } = args;
      ACL.listGroupsFor(uid).then((groups) => {
        if (!groups || groups.length < 1) {
          self.log(`${uid} is not in any group.`);
        } else {
          self.log(`${uid} is in these groups:`);
          groups.forEach(group => self.log(`${group}`))
        }
        cb();
      });
    });

    return vorpal;
}
