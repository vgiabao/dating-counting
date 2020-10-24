import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB8zCADQbuyuaV4yO3aHyVYKW6ceZlGmNU",
    authDomain: "fir-dating-35bd8.firebaseapp.com",
    databaseURL: "https://fir-dating-35bd8.firebaseio.com",
    projectId: "fir-dating-35bd8",
    storageBucket: "fir-dating-35bd8.appspot.com",
    messagingSenderId: "898652645591",
    appId: "1:898652645591:web:23376fa558842f3f94e892",
    measurementId: "G-W6WEWXFF8C"
}
if (firebase.apps.length === 0 ) firebase.initializeApp(firebaseConfig)
export const provider= new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase