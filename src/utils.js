
const constants = require('./constants');
const utils = {
  isSocketObjValid: function (socket) {
    return socket && typeof socket == 'object'
  },

  validateAuth: function (authDetails) {
    if (typeof authDetails != 'object') {
      return false;
    }
    if (constants.authTypes[authDetails.authType] === constants.authTypes["username"]) {
      return typeof authDetails.username == 'string' && typeof authDetails.password == 'string'
        && authDetails.username.length > 0;
    }
  }
}

module.exports = utils;