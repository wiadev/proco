import * as appUsers from '../tasks/appUsers';

export default function Commands(vorpal) {
  vorpal.command('app users clean <uid>', 'Cleanups a user')
    .action(function (args, cb) {
      appUsers.cleanAppUser(args.uid).then(() => {
        this.log(`${args.uid} is completely removed.`);
        cb();
      });
    });
}
