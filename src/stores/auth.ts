import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, type User, type UserCredential } from "firebase/auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<User | null>(null);

  const initAuthListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in:", user);
        currentUser.value = user;
      } else {
        console.log("No user logged in");
        currentUser.value = null;
      }
      console.log("current user:", auth.currentUser);

    });
  };

  const isAuthenticated = computed(() => currentUser.value !== null);

  const emailSignInCreate = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        response: error?.code || error?.message || "Error creating user with email and password",
      };
    }
  };

  const emailAndPasswordSignIn = async (email: string, password: string) => {
    try {
      const res: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, response: res?.user };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        response: error?.code || error?.message || "Error signing in with email and password",
      };
    }
  };

  const passwordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        response:
          "Please check your email and follow the link to reset your password.",
      };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        response: error?.code || error?.message || "Error sending password reset email.",
      };
    }
  };

  const signOut = async () => {
    try {
      auth?.signOut();
    } catch (error: any) {
      console.error("Error signing out", error);
      return {
        success: false,
        response: error?.code || error?.message || "Error signing out",
      };
    };
  }

  return { auth, isAuthenticated, currentUser, initAuthListener, emailSignInCreate, emailAndPasswordSignIn, passwordReset, signOut }
})