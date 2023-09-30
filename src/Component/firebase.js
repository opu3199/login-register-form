// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcOJiwwErTWMdRNZWgsZGgWUkGpewJ3BI",
  authDomain: "login-register-form-8bf90.firebaseapp.com",
  projectId: "login-register-form-8bf90",
  storageBucket: "login-register-form-8bf90.appspot.com",
  messagingSenderId: "292273374478",
  appId: "1:292273374478:web:d6a98e7a6da8b124af435f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;