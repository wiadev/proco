import { normalizeEmail, isEmail } from 'validator';
import { IsAllTrue, IsAnyTrue, InArray } from '../../Utils';

const AllowedNetworks = Object.keys(require('./AllowedNetworks.json'));
const CommonProviders = [
  '@gmail.com', '@googlemail.com', '@hotmail.com', '@outlook.com', '@live.com', '@me.com',
  '@mac.com', '@icloud.com', '@att.com', '@verizon.com', '@comcast.com', '@yahoo.com', '@aol.com',
  '@mynet.com',
];

const Validate = (email) => {
    email = normalizeEmail(email);

    if (!email) return Promise.reject('INVALID_EMAIL');

    const providerTests = CommonProviders.map(provider => {
      return email.includes(provider);
    });

    if (IsAnyTrue(providerTests)) return Promise.reject('COMMON_PROVIDER');

    return new Promise((resolve, reject) => {
      // Check other things

      if (InArray(AllowedNetworks, email.split('@')[1])) {
        resolve(email);
      } else {

        const otherTests = AllowedNetworks.map(network => {
          return network.includes(email.split('@')[1]);
        });

        if (IsAnyTrue(otherTests)) {
          reject('ONLY_STUDENT');
        } else if (email.includes('.edu')) {
          reject('NETWORK_NOT_SUPPORTED');
        } else {
          reject('CHECK_EMAIL');
        }
      }

    });
};

export default Validate;
