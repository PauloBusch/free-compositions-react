import firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyAx6693ILETBxslQO9CRdl0kW1ANP7guxg",
  authDomain: "free-compositions.firebaseapp.com",
  projectId: "free-compositions",
  storageBucket: "free-compositions.appspot.com",
  messagingSenderId: "610802536995",
  appId: "1:610802536995:web:5e73c7813b6c8029971796",
  measurementId: "G-W8XVW79TXW"
};

const firebaseInstance = firebase.initializeApp(config);
export default firebaseInstance;
