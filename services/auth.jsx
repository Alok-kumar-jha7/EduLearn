import { auth } from '../config/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile 
} from 'firebase/auth';

export const authService = {
  // Sign in user
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Sign up user
  signUp: async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      return { user: userCredential.user };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  }
};
