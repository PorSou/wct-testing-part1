// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiBqW4g5dVLfZYCI_pW47NJr8xz1L_v-k",
  authDomain: "test-project-3573d.firebaseapp.com",
  projectId: "test-project-3573d",
  storageBucket: "test-project-3573d.firebasestorage.app",
  messagingSenderId: "125033939084",
  appId: "1:125033939084:web:616cfeeaf3fa455c9a3ba9",
  measurementId: "G-QFVQQE1L4E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;
