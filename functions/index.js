const express = require('express');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const uuid = require('uuid/v5');


// Express and CORS middleware init

admin.initializeApp();
const app = express();

app.use((req, res, next) => {
    req.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(cors());


const generateText = new Date(Date.now())+'KLdfkjdskjdfsnjisdf'
app.post("/", (req, res) => {

    return admin.database().ref('/users').push(req.body)
        .then((result) => {
            return res.status(200).send(result)
        }).catch(error => {
            console.error(error);
            return res.status(500).send(error.message);
        });
});

app.get("/", (req, res) => {
    return admin.database().ref().on("value", snapshot => {
        return res.status(200).send(snapshot.val());
    }, error => {
        console.error(error);
        return res.status(500).send('Oh no! Error: ' + error.message);
    });
});

exports.users = functions.https.onRequest(app);

exports.updateUserId = functions.database.ref('/users/{pushID}')
    .onCreate((snapshot) => {
        const userData = snapshot.val();
        userData.id = uuid(generateText,uuid.DNS)
        return snapshot.ref.update({
            id: userData.id
        });
    });