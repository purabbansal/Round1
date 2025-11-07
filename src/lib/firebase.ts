import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// The canvas environment provides __firebase_config and __initial_auth_token globally.
declare const __firebase_config: string;
declare const __initial_auth_token: string;
declare const __app_id: string;

// --- MANDATORY FIREBASE SETUP ---

const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

/**
 * Initializes authentication using the provided custom token or signing in anonymously.
 * This function must be called once at the start of any client-side context that needs Firestore.
 * @returns The current user ID.
 */
export async function initializeAuth(): Promise<string> {
  let userId: string;
  try {
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      const userCredential = await signInWithCustomToken(auth, __initial_auth_token);
      userId = userCredential.user.uid;
    } else {
      const userCredential = await signInAnonymously(auth);
      userId = userCredential.user.uid;
    }
  } catch (error) {
    console.error("Firebase Auth Initialization Failed:", error);
    // Fallback to a random ID if sign-in fails, though this won't allow Firestore access.
    userId = auth.currentUser?.uid || crypto.randomUUID(); 
  }
  return userId;
}

// Ensure auth state is initialized when imported
initializeAuth();
// Note: We don't export the userId directly, as it may change. It is accessed via auth.currentUser.uid.