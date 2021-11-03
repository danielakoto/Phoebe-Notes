// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1EpzlBdbgAOtvDWtjzqf1AUh0lXxVNWs",
  authDomain: "my-app-bf529.firebaseapp.com",
  databaseURL: "https://my-app-bf529-default-rtdb.firebaseio.com",
  projectId: "my-app-bf529",
  storageBucket: "my-app-bf529.appspot.com",
  messagingSenderId: "949423662641",
  appId: "1:949423662641:web:501da023d8440464891710",
  measurementId: "G-YCP1YSJRCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);