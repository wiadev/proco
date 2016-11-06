import { normalizeEmail, isEmail, isISO8601, isIn } from "validator";
import { IsAnyTrue, InArray } from "../../../core/utils";
import { getFirebaseDataWithCache } from "../../../core/firebase";
import { setInfo } from "../api";

const getCleanNetworkDomain = (email) => email.split('@')[1].replace(/\./g, '-');
const CommonProviders = [
  '@gmail.com', '@googlemail.com', '@hotmail.com', '@outlook.com', '@live.com', '@me.com',
  '@mac.com', '@icloud.com', '@att.com', '@verizon.com', '@comcast.com', '@yahoo.com', '@aol.com',
  '@mynet.com',
];

export const onboardingData = (state) => ({
  onboarded: state.user.info.get('onboarded'),
  network_email_missing: !state.user.info.get('network_email'),
  network_email_verified: state.user.info.get('network_email_verified'),
  birthday_missing: !state.user.info.get('birthday'),
  gender_missing: !state.user.info.get('gender'),
  error: state.userOnboarding.get('error'),
});

export const checkNetworkEmail = email => {
  if (!isEmail(email)) return Promise.reject('INVALID_EMAIL');
  email = normalizeEmail(email);
  return new Promise((resolve, reject) => {

    const providerTests = CommonProviders.map(provider => {
      return email.includes(provider);
    });

    if (IsAnyTrue(providerTests)) return reject('COMMON_PROVIDER');

    return getFirebaseDataWithCache(`/settings/networks/email-map/${getCleanNetworkDomain(email)}`)
      .then(network => {
        if (network) return resolve();
        if (email.includes('.edu')) return reject('NETWORK_NOT_SUPPORTED');
        return reject('CHECK_EMAIL');
      });

  });
};

export const saveNetworkEmail = (uid, network_email) => setInfo(uid, 'network_email', network_email);

export const checkBirthday = birthday => new Promise((resolve, reject) => {
  if (isISO8601(birthday)) return resolve();
  return reject('INVALID_DATE');
});

export const checkGender = gender => new Promise((resolve, reject) => {
  if (isIn(gender, ['male', 'female'])) return resolve();
  return reject('INVALID_GENDER');
});

export const saveBirthday = (uid, birthday) => setInfo(uid, 'birthday', birthday);
export const saveGender = (uid, gender) => setInfo(uid, 'gender', gender);
