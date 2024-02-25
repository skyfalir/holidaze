import React, { createContext, useState, useEffect } from 'react';
import localStorageHandling  from '../utility/localStorageHandling';
export const AuthContext = createContext({
});
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVenueManager, setIsVenueManager] = useState(null);
  useEffect(() => {
    const checkUserRole = async () => {
      const userData = await localStorageHandling.getUserData();
      if (userData) {
        setIsLoggedIn(true);
        setIsVenueManager(userData.venueManager);
      }
    };
    checkUserRole();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isVenueManager }}>
      {children}
    </AuthContext.Provider>
  );
};