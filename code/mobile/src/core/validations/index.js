import { isMobilePhone } from 'validator';
import NetworkEmailValidation from './NetworkEmail';

module.exports = {
  PhoneNumberValidation: (number) => isMobilePhone(number, 'tr-TR') ? number : false,
  NetworkEmailValidation,
};
