module.exports = function (adminRootRef, uid) {
    const onboardedRef = adminRootRef.child(`/users/is/${uid}/onboarded`);

    return onboardedRef
        .once('value')
        .then(snap => snap.val())
        .then(onboarded => {
            if (onboarded === true) return Promise.resolve();

            return adminRootRef
                .child(`/users/info/${uid}`)
                .once('value')
                .then(snap => snap.val())
                .then(info => {
                    const {birthday = null, gender = null, network_email = null} = info;
                    if (birthday && gender && network_email) return onboardedRef.set(true);
                    if (onboarded !== false) return onboardedRef.set(false);
                    return Promise.resolve();
                });

        });

};