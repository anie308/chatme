// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getReactNativePersistence
} from 'firebase/auth/react-native'
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClyadgLjQ7_Cz6WHnrDM5f8Otb0lrU46M",
  authDomain: "unichat-c84b9.firebaseapp.com",
  projectId: "unichat-c84b9",
  storageBucket: "unichat-c84b9.appspot.com",
  messagingSenderId: "763628207357",
  appId: "1:763628207357:web:20f0894d769d64419f5294",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
