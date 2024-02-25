import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling'; 

const createBooking = async (bookingData) => {
  const endpoint = `${apiUrl}/bookings`;

  try {
    const userData = localStorageHandling.getUserData();
    const accessToken = userData.accessToken;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bookingData),
    });
    const isSuccessful = response.ok;
    const data = await response.json();
    return { isSuccessful, data };
  } catch (error) {
    console.error('Error creating booking:', error);
    return null;
  }
};

export default createBooking;