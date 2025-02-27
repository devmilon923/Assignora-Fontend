import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from "../components/auth/firebase/firebase-setup";
import useAxios from "../services/useAxios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const api = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const close = onAuthStateChanged(auth, async (hasUser) => {
      if (hasUser) {
        try {
          setUser(hasUser);
          setLoading(false);
        } catch (error) {
       
          setUser(hasUser);
          setLoading(false);
        }
      } else {
        setLoading(false);
      
        await api.get(`/auth/logout`);
        setUser(null);
      }
    });
    return () => close();
  }, []);
  // Account create with email password
  const emailPasswordCreate = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Account login with email password
  const emailPasswordLogin = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Account login with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Account update
  const profileUpdate = async (object) => {
    return updateProfile(auth.currentUser, object);
  };

  // Account logout
  const logout = async () => {
    return signOut(auth);
  };
  // send reset password email
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // change password
  const changePassword = async (newPassword, currentPassword) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    return updatePassword(auth.currentUser, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        emailPasswordCreate,
        emailPasswordLogin,
        googleLogin,
        profileUpdate,
        logout,
        loading,
        changePassword,
        resetPassword,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
