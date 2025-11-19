import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Add this to your lib/firebase.js
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
 apiKey: "AIzaSyAFTMCP8Xess7YdQORSVoL-NGFDjPCnMHM",
  authDomain: "homebudgetapp-9f89b.firebaseapp.com",
  databaseURL: "https://homebudgetapp-9f89b-default-rtdb.firebaseio.com",
  projectId: "homebudgetapp-9f89b",
  storageBucket: "homebudgetapp-9f89b.appspot.com",
  messagingSenderId: "376870799077",
  appId: "1:376870799077:web:63ec29e676a073f02f760c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
