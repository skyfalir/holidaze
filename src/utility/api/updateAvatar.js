import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling';
export const avatarUpdate = async (avatarUrl) => {
    const userData = localStorageHandling.getUserData();
    const { name, accessToken } = userData;
    const mediaUrl = `/profiles/${name}/media`;
    try {
      const response = await fetch(apiUrl + mediaUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });
      if (response.ok) {
        console.log('Avatar updated successfully');
        userData.avatar = avatarUrl;
        localStorageHandling.setUserData(userData);
      } else {
        console.log('Avatar update failed');
        console.log(accessToken)
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };
