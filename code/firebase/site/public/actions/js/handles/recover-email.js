function handleRecoverEmail(auth, actionCode) {
  var restoredEmail = null;
  // Confirm the action code is valid.
  auth.checkActionCode(actionCode).then(function(info) {
    // Get the restored email address.
    restoredEmail = info['data']['email'];

    // Revert to the old email.
    return auth.applyActionCode(actionCode);
  }).then(function() {
    // Account email reverted to restoredEmail

    // TODO: Display a confirmation message to the user.

    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    auth.sendPasswordResetEmail(restoredEmail).then(function() {
      // Password reset confirmation sent. Ask user to check their email.
    }).catch(function(error) {
      // Error encountered while sending password reset code.
    });
  }).catch(function(error) {
    // Invalid code.
  });
}