const functions = require('firebase-functions');

module.exports = functions.database().path('/users/interactions/{sid}/{rid}')
    .on('write', (event) => {

        const data = event.data;
        const adminRoot = data.adminRef.root;

        const {rid, sid} = event.params;
        const interaction = data.val();
        if (!interaction) Promise.resolve();

        console.log("new interaction", data.val(), event.params);

        const getIndexUpdate = (root, user1, user2, interaction) =>
            adminRoot.child(`/users/interaction-indexes/${user1}/${user2}/latest_interaction`)
                .set(interaction)
                .then(() => {
                    adminRoot.child(`/users/interaction-indexes/${rid}/${sid}`)
                        .transaction((interaction_index) => {
                            if (interaction_index) interaction_index.unread_count++;
                            return interaction_index;
                        });
                    return Promise.resolve();
                });

        let updates = [];
        updates.push(adminRoot.child(`/users/interactions/${rid}/${sid}/${data.key}`).set(interaction));
        updates.push(adminRoot.child(`/users/interaction-backups/${rid}/${sid}/${data.key}`).set(interaction));
        updates.push(adminRoot.child(`/users/interaction-backups/${sid}/${rid}/${data.key}`).set(interaction));
        updates.push(getIndexUpdate(adminRoot, rid, sid, interaction));
        updates.push(getIndexUpdate(adminRoot, sid, rid, interaction));

        return Promise.all(updates);

    });
