import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAAn4p55CgyjRwEPc2Q3EBLn-K79mkPIhw",
  authDomain: "finalprojectwebpro.firebaseapp.com",
  databaseURL: "https://finalprojectwebpro-default-rtdb.firebaseio.com",
  projectId: "finalprojectwebpro",
  storageBucket: "finalprojectwebpro.appspot.com",
  messagingSenderId: "236871338570",
  appId: "1:236871338570:web:c494596828e62085c1f4b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;