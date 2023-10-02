// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCrQpwrTFvp18375e43i0XQ04xgML1W8oE",
  authDomain: "clone-88a66.firebaseapp.com",
  projectId: "clone-88a66",
  storageBucket: "clone-88a66.appspot.com",
  messagingSenderId: "828980502971",
  appId: "1:828980502971:web:20df9a91184bc03abb649e",
  measurementId: "G-4E2ZYJC5D3"
};  
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db }// firestore is the real time datbase in the firebase
// by exporting the "db" we can perform the database operations and " auth" to handle the user authentication throught your application.