const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');
//const { database } = require("firebase-admin");

//permissions => name originalangular-firebase-auth-8533b-firebase-adminsdk-mragb-dd4bed578c

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("./permissions.json"),
  databaseURL: "https://angular-firebase-auth-8533b.firebaseio.com",
});


app.use(cors({ origin: true }));

app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "hello world" });
});

app.use(require('./routes/marcas-routes'))


exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
