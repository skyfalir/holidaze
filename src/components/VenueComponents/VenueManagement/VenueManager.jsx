import React, { useState, useEffect } from 'react';
import { getProfileData } from '../../../utility/api/fetchProfile';
import localStorageHandling from '../../../utility/localStorageHandling';
import './venue-manage.css';
const VenueManagementPanel = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [venues, setVenues] = useState([]);
	const [selectedVenue, setSelectedVenue] = useState(null);

	useEffect(() => {
		const fetchVenues = async () => {
			const userData = localStorageHandling.getUserData();
			if (userData && userData.name) {
				const profileData = await getProfileData(userData.name, 'venues');
				console.log('Profile data:', profileData);
				if (profileData && profileData.length > 0) {
					setVenues(profileData);
				}
			}
		};
		fetchVenues();
	}, []);

	const handleToggleOpen = () => {
		setIsOpen(!isOpen);
	};
	const handleManageClick = (venue) => {
		const sortedBookings = (venue.bookings || []).sort((a, b) => {
			const dateA = new Date(a.dateFrom);
			const dateB = new Date(b.dateFrom);
			return dateA - dateB;
		});
		setSelectedVenue({ ...venue, bookings: sortedBookings });
	};
	return (
		<div className={`venue-management-panel ${isOpen ? 'open' : ''}`}>
			<button onClick={handleToggleOpen}>
				{isOpen ? 'Close Management Panel' : 'Open Management Panel'}
			</button>
			{isOpen && (
				<div className="management-content">
					<div className="managed-venues">
						{venues.length > 0 ? (
							venues.map((venue) => (
								<div key={venue.id} className="venue-item">
									<h3>{venue.name}</h3>
									{venue.media && venue.media[0] && (
										<img src={venue.media[0]} alt={venue.name} />
									)}
									<button onClick={() => handleManageClick(venue)}>
										Manage
									</button>
								</div>
							))
						) : (
							<div>No venues to manage.</div>
						)}
					</div>
					<div className="booking-details">
						{selectedVenue &&
						selectedVenue.bookings &&
						selectedVenue.bookings.length > 0 ? (
							selectedVenue.bookings.map((booking) => (
								<div key={booking.id} className="booking-item">
									<div className="booking-dates">
										<p>
											From:{' '}
											{new Date(
												booking.dateFrom
											).toLocaleDateString()}
										</p>
										<p>
											To:{' '}
											{new Date(
												booking.dateTo
											).toLocaleDateString()}
										</p>
									</div>
									<p>Guests: {booking.guests}</p>
								</div>
							))
						) : (
							<p>No upcoming bookings.</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
export default VenueManagementPanel;
