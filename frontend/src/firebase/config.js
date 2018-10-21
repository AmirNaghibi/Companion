import firebase from 'firebase/app';
import 'firebase/auth';
// require("firebase/auth");
// require('firebase/database');

const config = {
    apiKey: "AIzaSyCf1DvkYK89RlzDFP1pTS8X-cEBJqyRetM",
    authDomain: "companion-ac72e.firebaseapp.com",
    databaseURL: "https://companion-ac72e.firebaseio.com",
    projectId: "companion-ac72e",
    storageBucket: "companion-ac72e.appspot.com",
    messagingSenderId: "44150046613"
  };

if(!firebase.apps.length){
    firebase.initializeApp(config);
}
export default firebase;

// export const database = firebase.database();
const auth = firebase.auth();
// export const googleAuthProvider = new firebase.auth.googleAuthProvider();

export {
    auth,
}