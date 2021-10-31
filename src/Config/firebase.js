import firebase from "firebase";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBlAMRQGO2ccQyc6HBeMdKI2yu8i4wBwGs",
    authDomain: "agustin-7fff9.firebaseapp.com",
    projectId: "agustin-7fff9",
    storageBucket: "agustin-7fff9.appspot.com",
    messagingSenderId: "811015218775",
    appId: "1:811015218775:web:b3eec96ca3750cbe502512",
    measurementId: "G-G99HV2WH6R"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.db = firebase.firestore()
    firebase.auth = firebase.auth()
    const storage =firebase.storage()
  
    export {storage, firebase as default };