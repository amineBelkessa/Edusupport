const {initializaApp} = require("firebase-admin/app");

initializaApp();
const updateUser = require("./api/updateUser");
exports.updateUser = updateUser.updateUser;