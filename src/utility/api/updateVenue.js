import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling';

const editVenue = async (Venueid, formData) => {
  const endpoint = `${apiUrl}/venues/${Venueid}`; 

  try {
    const userData = localStorageHandling.getUserData();
    const accessToken = userData.accessToken;

    const response = await fetch(endpoint, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update venue with ID ${Venueid}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(`Error updating venue with ID ${Venueid}:`, error);
    return null;
  }
};

export default editVenue;