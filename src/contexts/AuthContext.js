import React, { useContext, useEffect, useState } from "react";
import { LoadingView } from "../components/LoadingView";
import firebase from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser: currentUser ?? null,
  };

  if (loading) return <LoadingView />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
