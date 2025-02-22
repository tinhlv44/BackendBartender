const firebase = require("firebase/app");
require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCpua1YZhbOoHREipvNYvOVbUfpi1wCpXo",
  authDomain: "mixology-9a467.firebaseapp.com",
  databaseURL: "https://mixology-9a467-default-rtdb.firebaseio.com",
  projectId: "mixology-9a467",
  storageBucket: "mixology-9a467.appspot.com",
  messagingSenderId: "570133460824",
  appId: "1:570133460824:web:710e9a9ac26de4a521972d",
  measurementId: "G-TMHFC990KR",
};
// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();
module.exports = storageRef;
