// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
const { serverTimestamp } = firebase.firestore.FieldValue;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApp7hgHHxJ0vBO9SNwBXWevIgfETJ4Mrs",
  authDomain: "penny-6ace2.firebaseapp.com",
  projectId: "penny-6ace2",
  storageBucket: "penny-6ace2.appspot.com",
  messagingSenderId: "460801235297",
  appId: "1:460801235297:web:aeedb8b94c15d737f08d20"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export { firestore, serverTimestamp };