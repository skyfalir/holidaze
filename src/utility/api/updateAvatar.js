import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling';


export const avatarUpdate = async (avatarUrl) => {
    const userData = localStorageHandling.getUserData();
    const { name, accessToken } = userData;  // Retrieve the authToken from the user data in local storage
    const mediaUrl = `/profiles/${name}/media`;
  
    try {
      const response = await fetch(apiUrl + mediaUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,  // Include the authorization token in the headers
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });
  
      if (response.ok) {
        console.log('Avatar updated successfully');
        userData.avatar = avatarUrl;
        localStorageHandling.setUserData(userData);  // Update the userData in local storage
      } else {
        console.log('Avatar update failed');
        console.log(accessToken)
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };
