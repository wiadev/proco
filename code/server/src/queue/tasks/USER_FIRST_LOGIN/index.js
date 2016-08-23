import axios from 'axios';
import * as firebase from 'firebase';
export const database = () => firebase.database();
export const getUserRef = (uid) => database().ref(`users/${uid}`);

const worker = (data, progress, resolve, reject) => {
  console.log("here")

  const userRef = getUserRef(data.payload.uid);

  const tokenRef = userRef.child('tokens/facebook');
  const infoRef = userRef.child('info');
  tokenRef.once('value', snap => {

    const access_token = snap.val();
    console.log("access_token")

    if (!access_token) {
      return reject("got no token");
    }

    console.log("here2")

    axios.get('https://graph.facebook.com/v2.7/me', {
      params: {
        fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name'].join(','),
        access_token
      }
    }).then(response => {

      if(response < 200 || response > 399) {
        return reject();
      }

      const { id, name, gender, age_range, first_name, last_name, birthday } = response.data;

      let user = {
        fid: id,
        name,
        gender,
        age_range_on_facebook: age_range,
        first_name,
        last_name
      };

      if (birthday) {
        let _birthday = birthday.split('/');
        user.birthday = `${_birthday[1]}/${_birthday[0]}/${_birthday[2]}`;
        user.birthyear = _birthday[2];
      }


      infoRef.set(user).then(() => {
        resolve()
      });

    }).catch(e => console.log("err", e))

  });
};

const key = 'USER_FIRST_LOGIN';
module.exports = {
  worker,
  key
};
