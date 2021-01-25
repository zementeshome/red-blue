import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAzvHi2h3OtQ17gGZmiFYxhrqzXWmFn3jw",
    authDomain: "red-blue-mh.firebaseapp.com",
    projectId: "red-blue-mh",
    storageBucket: "red-blue-mh.appspot.com",
    messagingSenderId: "135834074932",
    appId: "1:135834074932:web:980403bd87df270f88af61"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const db = fire.firestore();
  export const auth = firebase.auth();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

  console.log(firebase.auth.Auth.Persistence.NONE);

  export default fire;