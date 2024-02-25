import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling';
const deleteVenue = async (venueId) => {
  try {
    if (!venueId) {
      throw new Error('Venue ID is required for deletion.');
    }
    const userData = localStorageHandling.getUserData();
    const accessToken = userData.accessToken;
    const response = await fetch(`${apiUrl}/venues/${venueId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete the venue.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting venue:', error);
    return null;
  }
};
export default deleteVenue;