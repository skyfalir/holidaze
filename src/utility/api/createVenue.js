
import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling';

const createVenue = async (formData) => {
  const endpoint = `${apiUrl}/venues`; 

  try {
    const userData = localStorageHandling.getUserData();
    const accessToken = userData.accessToken;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to post CreateVenueForm data');
    }

    const data = await response.json();
    return data; // Return the response data if needed
  } catch (error) {
    console.error('Error creating venue:', error);
    return null;
  }
};

export default createVenue;