// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo",
  authDomain: "trackerappauthentication.firebaseapp.com",
  projectId: "trackerappauthentication",
  storageBucket: "trackerappauthentication.appspot.com",
  messagingSenderId: "812762423677",
  appId: "1:812762423677:web:722e978332d68334602c14"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);