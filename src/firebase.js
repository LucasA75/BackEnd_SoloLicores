// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app")
//import { getAnalytics } from "firebase/analytics";
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCdo5L4EYN0rEGiJ-teGSX0v_1INiXMkVg",
    authDomain: "helloworld-d936b.firebaseapp.com",
    projectId: "helloworld-d936b",
    storageBucket: "helloworld-d936b.appspot.com",
    messagingSenderId: "1021030284203",
    appId: "1:1021030284203:web:08bbd1c7cf9d4f147eb0ee",
    measurementId: "G-LLMGLVLZRK"
};

const app = initializeApp(firebaseConfig);

/* Credenciales de FireBase-Admin */

var admin = require("firebase-admin");
var serviceAccount = require("./credensialesFirebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "helloworld-d936b.appspot.com"
});


/* Cada vez que quiera ocupar una libreria , exporto este archivo y puedo ocupar sus metodos */
module.exports = {
    app,
    admin,
    serviceAccount
}
