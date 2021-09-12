// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdWFxIUbjchiqeNO3L8LtNp8JyMfCatKI",
  authDomain: "lite-tripper.firebaseapp.com",
  projectId: "lite-tripper",
  storageBucket: "lite-tripper.appspot.com",
  messagingSenderId: "619686803558",
  appId: "1:619686803558:web:b19dcc30395aad4ccdd5a7",
  measurementId: "G-SYCHJT3HW1",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
