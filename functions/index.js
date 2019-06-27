const admin = require("firebase-admin");
admin.initializeApp();

exports.onUserStatusChanged = require("./trigger/onUserStatusChanged");
exports.helloWorld = require("./routes/oheloWorld");
