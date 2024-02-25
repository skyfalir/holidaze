const localStorageHandling = {
    getUserData: () => {
      return JSON.parse(localStorage.getItem('userData'));
    },
    setUserData: (userData) => {
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    removeUserData: () => {
      localStorage.removeItem('userData');
    },
    getAvatarUrl: () => {
        const userData = localStorageHandling.getUserData();
        return userData ? userData.avatar : null;
      }
  };
  
  export default localStorageHandling;