const express = require('express');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const uuid = require('uuid/v5');
const config = {
    apiKey: "AIzaSyDb7JD39_bUQsX6JDLgbVwypI8RQpdvH24",
    authDomain: "enyeregisteruser.firebaseapp.com",
    databaseURL: "https://enyeregisteruser.firebaseio.com",
    projectId: "enyeregisteruser",
    storageBucket: "enyeregisteruser.appspot.com",
    messagingSenderId: "442901724140",
    appId: "1:442901724140:web:492aa5a0f46c3e8649dec9"
  };

// Express and CORS middleware init

admin.initializeApp(config);
const app = express();

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

app.use(cors());


const generateText = new Date(Date.now())+'KLdfkjdskjdfsnjisdf'
app.post("/", (req, res) => {

    return admin.database().ref('/users').push(request.body)
        .then((result) => {
            return res.status(200).send(result)
        }).catch(error => {
            console.error(error);
            return res.status(500).send('Oh no! Error: ' + error);
        });
});

app.get("/", (re, res) => {
    return admin.database().ref().on("value", snapshot => {
        return res.status(200).send(snapshot.val());
    }, error => {
        console.error(error);
        return res.status(500).send('Oh no! Error: ' + error);
    });
});

exports.users = functions.https.onRequest(app);

exports.updateUserId = functions.database.ref('/users/{userid}')
    .onCreate((snapshot) => {
        const userData = snapshot.val();
        userData.id = uuid(generateText,uuid.DNS)
        return snapshot.ref.update({
            id: userData.id
        });
    });