import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useState } from "react";

import PropTypes from "prop-types";
export const AuthContext = createContext(null);
import auth from "../firebase/firebase.config.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [access, setAccess] = useState("");

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setAccess("");
        toast("Logout Successful");
      })
      .catch(() => {
        toast("Error occured");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // console.log(currentUser);
      setIsLoading(false);
    });
    return () => unSubscribe();
  }, [user]);
  // if(user) setAccess(user.access);
  useEffect(() => {
    setIsLoading(true);
    if(user?.email) {
      fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setAccess(data.access);
        }
      })
    } 
      setIsLoading(false);
  }, [user]);

  const authInfo = {
    user,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut,
    access,
    setAccess,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
