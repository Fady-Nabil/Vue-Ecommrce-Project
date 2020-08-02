import firebase from 'firebase';
require('firebase/firestore');
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdO8fVX60Dq_zWvhTik5WC1rprrWQFcsI",
    authDomain: "vue-ecommerce-5dcd5.firebaseapp.com",
    databaseURL: "https://vue-ecommerce-5dcd5.firebaseio.com",
    projectId: "vue-ecommerce-5dcd5",
    storageBucket: "vue-ecommerce-5dcd5.appspot.com",
    messagingSenderId: "771163867116",
    appId: "1:771163867116:web:7eafb7c5223a0620f962c9"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig); //initailize firebase
export const db = firebase.firestore(); //initialize firestore (current database no sql database)