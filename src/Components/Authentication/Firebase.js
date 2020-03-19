import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD9ZK4-3RqlfKIzjRo0vcQmYnKOa5FBVtc",
    authDomain: "dating-counting.firebaseapp.com",
    databaseURL: "https://dating-counting.firebaseio.com",
    projectId: "dating-counting",
    storageBucket: "dating-counting.appspot.com",
    messagingSenderId: "447990018113",
    appId: "1:447990018113:web:49a6d90b04fbdb3831d6c0",
    measurementId: "G-KV13C2JFC4"
}
if (firebase.apps.length === 0 ) firebase.initializeApp(firebaseConfig)
export const provider= new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase