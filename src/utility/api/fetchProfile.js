import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling';
export const getProfileData = async (name, dataType) => {
  try {
    if (!name) throw new Error("Profile name is not found");

    let endpoint;
    switch (dataType) {
      case 'venues':
        endpoint = `/profiles/${name}/venues/?_bookings=true&_venues=true`;
        break;
      case 'bookings':
        endpoint = `/profiles/${name}/bookings`;
        break;
      default:
        throw new Error("Invalid data type specified");
    }

    const userData = localStorageHandling.getUserData();
    const accessToken = userData.accessToken;
    
    const response = await fetch(apiUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};