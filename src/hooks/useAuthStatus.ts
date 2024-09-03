import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
// import { auth } from '../firebase/firebase';

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      setIsChecking(false);
      setIsLoggedIn(true);
    } else {
      setIsChecking(false);
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return { isLoggedIn, isChecking };
};

export default useAuthStatus;
