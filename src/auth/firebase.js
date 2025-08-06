import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// --- AUTH FUNCTIONS ---

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    return null; // No error
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return "Could not sign in with Google. Please try again.";
  }
};

// Sign in with Email and Password
export const signInWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return null;
    } catch (error) {
        console.error("Email Sign-In Error:", error);
        return "Invalid email or password.";
    }
};

// Sign up with Email and Password
export const signUpWithEmail = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return null;
    } catch (error) {
        console.error("Email Sign-Up Error:", error);
        if (error.code === 'auth/email-already-in-use') {
            return "This email is already in use.";
        }
        return "Could not create account. Please try again.";
    }
};

// Sign out
export const doSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Sign Out Error:", error);
    }
};

// Listen for auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
