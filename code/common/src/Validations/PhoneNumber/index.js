import { isMobilePhone } from 'validator';

const Validate = (number) => {
    const test = isMobilePhone(number, 'tr-TR');

    if (tests) return number;
    return false;
}

export default Validate;