import open from 'open';
import * as ph from '../tasks/playhouse';

export default function Commands(vorpal) {

  vorpal.command('ph login [uid]', `Login to the Playhouse UI with the UID given. If none given, uses 'playhouse_admin'.`)
    .action(function (args, cb) {
      const uid = (args.uid ? args.uid : 'playhouse_admin');
      const token = vorpal.execSync(`acl generatetoken ${uid}`);
      const link = 'http://localhost:7503/login/admin?token=' + token;
      open(link);
      this.log(`If a browser didn't opened, go to: ${link}`);
      cb();
    });

  vorpal.command('ph add [count]', 'Adds new dolls to the app')
    .action(function (args, cb) {
      const self = this;

      this.log(`Starting to add...Shouldn't take long.`);
      return ph.addNewDolls(args.count).then((uids) => {
        uids.forEach(uid => self.log(`${uid} was added to the Playhouse (and the app).`))
        cb();
      });
    });

  vorpal.command('ph clean all', 'Cleans all dolls from the app')
    .alias('ph startover')
    .action(function (args, cb) {
      const self = this;

      this.log(`Starting to clean...Shouldn't take long.`);
      return ph.cleanAllDolls().then((uids) => {
        uids.forEach(uid => self.log(`${uid} was cleaned from the Playhouse (and the app).`))
        cb();
      });
    });

  vorpal.command('ph spread all', 'Spreads dolls all around')
    .action(function (args, cb) {
      const self = this;

      this.log(`Starting to spread...Shouldn't take long.`);
      return ph.spreadDolls().then((dolls) => {
        dolls.forEach(doll => self.log(`${doll.uid} was positioned at ${doll.lat}, ${doll.lng}`))
        cb();
      });
    });


  vorpal.command('ph attach question all', 'Attaches a random question to all dolls')
    .action(function (args, cb) {
      const self = this;

      this.log(`Starting to attach...Shouldn't take long.`);
      return ph.attachQuestionToDolls().then((dolls) => {
        dolls.forEach(doll => self.log(`${doll.uid} was attached with the question ${doll.question}`))
        cb();
      });
    });


  vorpal.command('ph clean <uid>', 'Cleans a doll from the app')
    .action(function (args, cb) {
      const self = this;

      this.log(`Starting to clean...Shouldn't take long.`);
      return ph.cleanDoll(args.uid).then(() => {
        self.log(`${args.uid} was cleaned to the Playhouse (and the app).`)
        cb();
      });
    });


}
