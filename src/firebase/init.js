import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLiSKEGCYR3t9lDmJ3Kni74ysJD_2hBFQ",
    authDomain: "vue-chatroom-s.firebaseapp.com",
    databaseURL: "https://vue-chatroom-s.firebaseio.com",
    projectId: "vue-chatroom-s",
    storageBucket: "vue-chatroom-s.appspot.com",
    messagingSenderId: "657966269492"
  };
  const firebaseApp = firebase.initializeApp(config);

  export default firebaseApp.firestore()