import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'
import 'firebase/analytics'
const firebaseConfig = {
    apiKey: "AIzaSyCxIisQ5opyKCX8UFf7TYwuCl75fR946YY",
    authDomain: "giabaothanhhuyen-60b4a.firebaseapp.com",
    projectId: "giabaothanhhuyen-60b4a",
    storageBucket: "giabaothanhhuyen-60b4a.appspot.com",
    messagingSenderId: "244638607841",
    appId: "1:244638607841:web:dd44583f8db50d0cb1caa0",
    measurementId: "G-SBSV11REVD",
    databaseURL:"https://giabaothanhhuyen-60b4a-default-rtdb.firebaseio.com/"
}
if (firebase.apps.length === 0 ) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

}
export const provider= new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
