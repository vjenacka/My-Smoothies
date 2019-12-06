import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBURdPvWiaRyBAUqNxv8jqqRKLtAPF4Z74",
  authDomain: "my-smoothies-bee4f.firebaseapp.com",
  databaseURL: "https://my-smoothies-bee4f.firebaseio.com",
  projectId: "my-smoothies-bee4f",
  storageBucket: "my-smoothies-bee4f.appspot.com",
  messagingSenderId: "911960985021",
  appId: "1:911960985021:web:c4e4cbd633c3554041d6d4"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: ture });

export default firebaseApp.firestore();
