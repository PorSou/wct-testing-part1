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
export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login with Email
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google Login
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// GitHub Login
export const loginWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};

// Facebook Login
export const loginWithFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
};

// Logout
export const logoutFirebase = () => {
  return signOut(auth);
};
