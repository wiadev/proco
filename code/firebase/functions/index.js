/* Barbar Startup Factory presents */

const functions = require('firebase-functions');

/*
  Try to arrange functions as they are needed in a regular user flow
  There are two types functions, exposed and internal.
  Basically, exposed functions can be triggered by the user
  so we need to be super careful about validations & security rules.
  Internal functions are triggered by either admins or the system itself.

  You'll realize there is a naming scheme, try to abide by it.
  Also, if your function is too long you may be doing it wrong.
  If you are sure you are doing it right and there are no shared code,
  try to split it into pieces and put it inside a directory
  with the same naming scheme and a index.js
*/

let $ = {};

// Exposed functions
$.handleUserFacebookTokenChange = require('./functions/database/handleUserFacebookTokenChange');

$.handleUserInfoChange = require('./functions/database/handleUserInfoChange');
$.handleUserPhotoChange = require('./functions/database/handleUserPhotoChange');

$.handleUserMobileNumberChange = require('./functions/database/handleUserMobileNumberChange');
$.handleUserMobileNumberVerification = require('./functions/database/handleUserMobileNumberVerification');

$.handleUserNetworkEmailChange = require('./functions/database/handleUserNetworkEmailChange');
$.handleUserNetworkEmailVerification = require('./functions/database/handleUserNetworkEmailVerification');
$.handleUserNetworkEmailVerificationOnWeb = require('./functions/database/handleUserNetworkEmailVerificationOnWeb');

$.handleUserPostedNewInteraction = require('./functions/database/handleUserPostedNewInteraction');

$.handleNewLocationData = require('./functions/http/handleNewLocationData');

// Internal functions

$.handleUserCleanupTask = require('./functions/database/handleUserCleanupTask');

module.exports = $;
