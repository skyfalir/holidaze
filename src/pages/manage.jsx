import React, { useEffect, useState } from 'react';
import { getProfileData } from '../utility/api/fetchProfile';
import localStorageHandling from '../utility/localStorageHandling';
import './manage.css';
const ManageVenues = () => {
    const [profile, setProfile] = useState(null);
    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            const profileName = localStorageHandling.getUserData().name;
            const profileData = await getProfileData(profileName, 'venues');
            setProfile(profileData);
            setVenues(profileData.venues || []);
            setBookings(profileData.bookings || []);
        };

        fetchProfile();
    }, []);

    return (
        <div className="manage-container">
            <div>
              {profile ? (
                <>
                  <div className="venues-container">
                    {venues.map((venue, index) => (
                      <div key={index}>
                        <h3>{venue.name}</h3>
                        <p>{venue.description}</p>
                        {/* Include other venue details as needed */}
                      </div>
                    ))}
                  </div>
                  <div className="bookings-container">
                    {bookings.map((booking, index) => (
                      <div key={index}>
                        <h4>Booking ID: {booking.id}</h4>
                        <p>Guests: {booking.guests}</p>
                        <p>Date: {booking.date}</p>
                        {/* Include other booking details as needed */}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>Loading profile...</div>
              )}
            </div>
        </div>
      );
    };
export default ManageVenues;