/*
* Parrot: A sane way to control Proco database.
* Since we currently don't need it, we don't expose these tasks as library but
* we are creating an interactive CLI application.
* Waay easier than writing a dashboard with React.
* Also faster than writing, testing & deploying Cloud Functions.
*/

const vorpal = require('vorpal')();
import ACL from './commands/acl';
import Playhouse from './commands/playhouse';
import AppUsers from './commands/appUsers';

vorpal.localStorage('parrot');

vorpal.use(ACL);
vorpal.use(Playhouse);
vorpal.use(AppUsers);


vorpal.command('parrot auth <uid>', `Sets an UID to the CLI to use with the Database.`)
  .action(function (args, cb) {
    vorpal.execSync(`parrot set uid ${args.uid}`);
    this.log(`You are now logged-in.`);
    cb();
  });

vorpal.command('parrot set <key> <value>', 'Sets a value to local storage.')
  .action(function (args, cb) {
    const previous = vorpal.localStorage.getItem(args.key);

    vorpal.localStorage.setItem(args.key, args.value);

    if (previous) {
      this.log(`Previous value was for ${args.key} was {previous}`)
    }

    this.log(`${args.key} is *now* set to ${args.value}`);

  });

vorpal.command('parrot get <key>', 'Gets a value for a key from local storage.')
  .action(function (args, cb) {
    this.log(`${args.key} is set to ${vorpal.localStorage.getItem(args.key)}`);
    cb();
  });


vorpal.command('parrot rmkey <key>', 'Removes a key from local storage.')
  .action(function (args, cb) {
    vorpal.localStorage.removeItem(args.key);
    this.log(`${args.key} is now deleted.`);
    cb();
  });


vorpal
  .delimiter('parrot$')
  .show()
  .parse(process.argv);
