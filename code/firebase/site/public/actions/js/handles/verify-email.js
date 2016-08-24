function handleVerifyEmail(auth, actionCode) {
  // Try to apply the email verification code.
  console.log("auth", auth);
  auth.checkActionCode(actionCode).then(function(resp) {

console.log(actionCode, resp, auth.currentUser)
    // Email address has been verified.

    // TODO: Display a confirmation message to the user.
    // You could also provide the user with a link back to the app.
  }).catch(function(error) {
    // Code is invalid or expired. Ask the user to verify their email address
    // again.
  });
}