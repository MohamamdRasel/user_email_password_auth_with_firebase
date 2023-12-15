// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY7C1wHt8ej_BzgmqHuQyIFocOEcG0b8c",
  authDomain: "user-email-pass-auth-9682b.firebaseapp.com",
  projectId: "user-email-pass-auth-9682b",
  storageBucket: "user-email-pass-auth-9682b.appspot.com",
  messagingSenderId: "791289230487",
  appId: "1:791289230487:web:ed66ae5be53037a55325d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

 export default auth;