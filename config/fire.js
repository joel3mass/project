import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyArR6jWvF0y9DqaChptBo2WXRz1EawTpg8",
  authDomain: "memosimprod.firebaseapp.com",
  databaseURL: "https://memosimprod.firebaseio.com",
  projectId: "memosimprod",
  storageBucket: "memosimprod.appspot.com",
  messagingSenderId: "686646273967"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.database();
export { auth, db }