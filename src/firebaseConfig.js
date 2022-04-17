// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    // apiKey: "AIzaSyDcs1GFAesG7VnsaBApYPT_3l3ZPRkqoWE",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const createAccount = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signin = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);
export const socialSignIn = (auth, provider) => signInWithPopup(auth, provider);
export const dbService = getFirestore(app);
// export const storageService = getStorage(app);
export const storageService = getStorage();