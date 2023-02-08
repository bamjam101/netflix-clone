import { initializeApp } from "firebase/app";
import {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAzlvau-HoRQDsTy9oKgLPY9uQQtfbKZA",
  authDomain: "netflix-clone-4fcab.firebaseapp.com",
  projectId: "netflix-clone-4fcab",
  storageBucket: "netflix-clone-4fcab.appspot.com",
  messagingSenderId: "66722546400",
  appId: "1:66722546400:web:b85390ba6874dea28d8685",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export type AuthContextType = ReturnType<typeof useProvideAuth>;

export const useAuth = () => useContext(AuthContext) ?? ({} as AuthContextType);

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) =>
      setUser(user)
    );

  const signOutUser = () => signOut(auth).then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unsubscribe();
  });

  return {
    signIn,
    signUp,
    signOutUser,
    user,
  };
}
