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
import { 
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

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
const db = getFirestore(app); // Initialize Firestore
const googleProvider = new GoogleAuthProvider();

// --- AUTH FUNCTIONS ---

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    return null;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return "Could not sign in with Google. Please try again.";
  }
};

export const signInWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return null;
    } catch (error) {
        return "Invalid email or password.";
    }
};

export const signUpWithEmail = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return null;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            return "This email is already in use.";
        }
        return "Could not create account. Please try again.";
    }
};

export const doSignOut = async () => {
    await signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};


// --- FIRESTORE FUNCTIONS ---

// Save a recipe to the user's collection
export const saveRecipe = async (userId, recipe) => {
    try {
        // Add the userId to the recipe object to know who it belongs to
        await addDoc(collection(db, "recipes"), {
            ...recipe,
            userId: userId,
        });
        return { success: true };
    } catch (error) {
        console.error("Error saving recipe: ", error);
        return { success: false, error: "Could not save recipe." };
    }
};

// Get all saved recipes for a specific user
export const getSavedRecipes = async (userId) => {
    try {
        const q = query(collection(db, "recipes"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const recipes = [];
        querySnapshot.forEach((doc) => {
            // Push the document data along with its unique ID
            recipes.push({ id: doc.id, ...doc.data() });
        });
        return recipes;
    } catch (error) {
        console.error("Error getting recipes: ", error);
        return [];
    }
};

// Delete a specific recipe
export const deleteRecipe = async (recipeId) => {
    try {
        await deleteDoc(doc(db, "recipes", recipeId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting recipe: ", error);
        return { success: false, error: "Could not delete recipe." };
    }
};
