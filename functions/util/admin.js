// const admin = require('firebase-admin');
const initializeApp = require('firebase/app');

const firebaseConfig = {
    apiKey: "AIzaSyDh7vUleCHxYiXjignAwVoPNUBc56HfcT8",
    authDomain: "social-web-88671.firebaseapp.com",
    databaseURL: "https://social-web-88671-default-rtdb.firebaseio.com",
    projectId: "social-web-88671",
    storageBucket: "social-web-88671.appspot.com",
    messagingSenderId: "163385767006",
    appId: "1:163385767006:web:a4a347b38af0548c3270cf",
    measurementId: "G-6Z000VTGKP"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// admin.initializeApp();

// const db = admin.firestore();

module.exports = { app, db };