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
} from "firebase/auth";

// EMAIL LOGIN
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// EMAIL REGISTER
export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// SOCIAL LOGIN
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithGithub = () => signInWithPopup(auth, githubProvider);
export const loginWithFacebook = () => signInWithPopup(auth, facebookProvider);
