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
  storageBucket: "test-project-3573d.appspot.com",
  messagingSenderId: "125033939084",
  appId: "1:125033939084:web:616cfeeaf3fa455c9a3ba9",
  measurementId: "G-QFVQQE1L4E",
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // force Google account chooser
});

export const githubProvider = new GithubAuthProvider(); // GitHub will use existing session

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  auth_type: "reauthenticate", // force Facebook login screen
});

export default app;
