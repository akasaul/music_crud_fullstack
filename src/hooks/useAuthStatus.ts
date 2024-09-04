import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getItem } from "../lib/localStorage";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const token = getItem("token");

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (token) {
      setIsChecking(false);
      setIsLoggedIn(true);
    } else {
      setIsChecking(false);
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, token]);

  return { isLoggedIn, logIn, logOut, isChecking };
};

export default useAuthStatus;
