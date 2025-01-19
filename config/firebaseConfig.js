import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7KoBW4DvaGnUklptWlfoN_Hj3bEHVEnc",
  authDomain: "levatimovie.firebaseapp.com",
  databaseURL: "https://levatimovie-default-rtdb.firebaseio.com",
  projectId: "levatimovie",
  storageBucket: "levatimovie.appspot.com",
  messagingSenderId: "623211594806",
  appId: "1:623211594806:web:b4253e3c0d2d016ecbc497",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
