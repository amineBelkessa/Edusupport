
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAWZSSFyHVBptb5paufkOEzJ1fySptvxk8",
  authDomain: "edusupport-7b3ca.firebaseapp.com",
  projectId: "edusupport-7b3ca",
  storageBucket: "edusupport-7b3ca.appspot.com",
  messagingSenderId: "231338407300",
  appId: "1:231338407300:web:ec7728bfd4b9456c8359d1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
export const storage = getStorage(app);