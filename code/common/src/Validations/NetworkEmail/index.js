import { normalizeEmail, isEmail } from 'validator';
import { IsAllTrue, InArray } from '../../Utils';

const AllowedNetworks = Object.keys(require('../../../config/AllowedNetworks.json'));

const Validate = (email) => {
    email = normalizeEmail(email);

    const tests = IsAllTrue([
        isEmail(email),
        InArray(AllowedNetworks, email.split('@')[1])
    ]);

    if (tests) return email;
    return false;
};

export default Validate;