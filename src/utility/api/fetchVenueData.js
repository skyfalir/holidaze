import { apiUrl } from '../apiConstants';
import localStorageHandling from '../localStorageHandling';

const getVenueData = async ( id, currentPage, itemsPerPage, filters) => {
  try {
    
    const offset = (currentPage - 1) * itemsPerPage;
    let endpoint = '/venues';
    let queries = '?_bookings=true&_owner=true';
    if (id) {
      endpoint += `/${id}` + queries;
    } else if (filters.sortField && filters.sortOrder) {
      const {sortField, sortOrder} = filters;
      const sortQuery = `&limit=${itemsPerPage}&sort=${sortField}&sortOrder=${sortOrder}`;

      endpoint += queries + sortQuery + `&offset=${offset}`;
    } else {
      endpoint += queries + `limit=10`; // Default query when no filters are provided (just in case)
    }

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
    console.error('Error fetching venue:', error);
    return null;
  }
};

export default getVenueData;