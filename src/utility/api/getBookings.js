import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling'; 


const getBookings = async (id) => {
  let endpoint = '/bookings';
  if (id) {
    endpoint += `/${id}`;
  }

  try {
    const userData = localStorageHandling.getUserData();
    const accessToken = userData.accessToken;

    const response = await fetch(apiUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return null;
  }
};

export default getBookings;