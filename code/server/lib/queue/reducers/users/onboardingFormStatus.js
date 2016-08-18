"use strict";

var onboardingFormStatus = function onboardingFormStatus(user) {
    var status = {
        birthday: !!user.birthday,
        gender: !!user.gender,
        network_email: !!user.network.email,
        network_verification: !!user.network.is_verified
    };

    return Object.assign(status, {
        is_finished: status.birthday && status.gender && status.network_email && status.network_verification
    });
};

module.exports = onboardingFormStatus;