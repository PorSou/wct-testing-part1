// src/features/auth/authService.js
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Register with Email
export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Login with Email
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Social Logins
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithGithub = () => signInWithPopup(auth, githubProvider);
export const loginWithFacebook = () => signInWithPopup(auth, facebookProvider);

// Logout
export const logoutFirebase = () => signOut(auth);
