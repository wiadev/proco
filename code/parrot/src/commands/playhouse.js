import open from 'open';
import { facebook, playhouse } from '../tasks/playhouse';

export default function Commands(vorpal) {

  vorpal.command('ph login admin [uid]', `Login to the Playhouse UI with the UID given. If none given, uses 'playhouse_admin'.`)
    .action(function (args, cb) {
      const uid = (args.uid ? args.uid : 'playhouse_admin');
      const token = vorpal.execSync(`acl generatetoken ${uid}`);
      const link = 'http://localhost:7503/login/admin?token=' + token;
      open(link);
      this.log(`If a browser didn't opened, go to: ${link}`);
      cb();
    });

  vorpal.command('ph login user <fid>', `Login to the Playhouse UI with a Test User.`)
    .option('-s, --sync', 'Runs "ph sync list" before running. Helps with expired tokens.')
    .option('-c, --clean', 'Cleans user from the app and our lists before getting the token. This also triggers --sync.')
    .action(function (args, cb) {
      const fid = args.fid;
      const before = new Promise((resolve) => {
          if (args.options.sync) this.log('Please sync manually.')
          return resolve();
      });
      before.then(() => {
        this.log(`Getting access token...`);
        return facebook.getAccessTokenFor(fid).then(access_token => {
          if(access_token) {
            this.log(`Got the token! If you must know, it's ${access_token}`);
            const link = 'http://localhost:7503/login/user?access_token=' + access_token;
            open(link);
            this.log(`If a browser didn't opened, go to: ${link}`);
            this.log(`Also, if there is an error, it may be about expired tokens. Try running with --sync.`);
          } else {
            this.log(`We couldn't find a token for Facebook ID ${fid}. Check if the user installed the app or if the ID is correct.`);
          }

          cb();
        });
      });
    });


  vorpal.command('ph sync list', 'Synchronizes the list of our Facebook Test Users')
    .action(function (args, cb) {

      const uid = vorpal.localStorage.getItem('uid');

      if (!uid) {
        this.log(`You need an UID with a 'playhouse_writers' permission.`);
        cb();
        return;
      }

      this.log(`Starting to sync...`);
      return facebook.syncFacebookTestUserList().then((count) => {
        this.log(`${count} users were sync'd.`);
        cb();
        return Promise.resolve();
      });
    });

  vorpal.command('ph sync profiles', 'Downloads the profile details of our Facebook Test Users')
    .action(function (args, cb) {

      const uid = vorpal.localStorage.getItem('uid');

      if (!uid) {
        this.log(`You need an UID with a 'playhouse_writers' permission.`);
        cb();
        return;
      }

      this.log(`Notice: Remember to always run 'ph sync list' before running this command.`);
      this.log(`Starting to pulling profile details of our Test Users... This may take a while.`);
      return facebook.syncFacebookTestUserProfiles().then((count) => {
        this.log(`${count} users were sync'd.`);
        cb();
      });
    });

  vorpal.command('ph sync passwords [password]', 'Sets passwords of all Test Users to [password]. Defaults to "bar123bar."')
    .action(function (args, cb) {

      const uid = vorpal.localStorage.getItem('uid');

      if (!uid) {
        this.log(`You need an UID with a 'playhouse_writers' permission.`);
        cb();
        return;
      }

      const password = args.password || 'bar123bar.';

      this.log(`Starting to set passwords...`);
      return facebook.syncFacebookTestUserPasswords(password).then((count) => {
        this.log(`${count} user passwords were set to ${password}`);
        cb();
        return Promise.resolve();
      });
    });

  vorpal.command('ph sync app', 'Adds all users to the app')
    .action(function (args, cb) {

      const uid = vorpal.localStorage.getItem('uid');

      if (!uid) {
        this.log(`You need an UID with a 'playhouse_writers' permission.`);
        cb();
        return;
      }

      this.log(`Starting to add...This *will* take a few minutes.`);
      return facebook.syncFacebookTestUsersWithApp().then((count) => {
        this.log(`${count} user were added to the app`);
        cb();
        return Promise.resolve();
      });
    });

  vorpal.command('ph clean app', 'Cleans all users from the app')
    .action(function (args, cb) {

      const uid = vorpal.localStorage.getItem('uid');

      if (!uid) {
        this.log(`You need an UID with a 'playhouse_writers' permission.`);
        cb();
        return;
      }

      this.log(`Starting to clean...This *will* take a seconds minutes.`);
      return facebook.cleanFacebookTestUsersFromApp().then((count) => {
        this.log(`${count} user were cleaned from the app`);
        cb();
        return Promise.resolve();
      });
    });



}
