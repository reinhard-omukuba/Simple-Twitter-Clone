// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC60URSBoTrPMM_8zEYg8j2WXM1nZJ6Bww",
  authDomain: "twitterclone-e4448.firebaseapp.com",
  projectId: "twitterclone-e4448",
  storageBucket: "twitterclone-e4448.firebasestorage.app",
  messagingSenderId: "285593799958",
  appId: "1:285593799958:web:a3d690ca0cebc423709437",
  measurementId: "G-E9167W7200"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export{app}
export{analytics}
