import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0",
  authDomain: "fir-cypresstestcase.firebaseapp.com",
  projectId: "fir-cypresstestcase",
  storageBucket: "fir-cypresstestcase.appspot.com",
  messagingSenderId: "170387163472",
  appId: "1:170387163472:web:aa4a636ae983614c9ac455"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

