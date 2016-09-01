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
                    const {birthday = null, gender = null, network = null} = info;
                    if (birthday && gender && network) {
                        console.log("Boarded")
                        return onboardedRef.set(true);
                    } else {
                        console.log("not boarded", info)
                    }
                    if (onboarded !== false) return onboardedRef.set(false);
                    return Promise.resolve();
                });

        });

};