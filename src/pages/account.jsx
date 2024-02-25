import React, { useEffect } from 'react';
import { useState } from 'react';
import { getProfileData } from '../utility/api/fetchProfile';
import './account.css';
import localStorageHandling from '../utility/localStorageHandling';
import { avatarUpdate } from '../utility/api/updateAvatar';
const Account = () => {
	const [avatarUrl, setAvatarUrl] = useState('');
	const [error, setError] = useState('');
	const [closestBooking, setClosestBooking] = useState(null);
	const [otherBookings, setOtherBookings] = useState([]);

	useEffect(() => {
		const fetchAndProcessBookings = async () => {
			const userData = localStorageHandling.getUserData();
			if (userData && userData.name) {
				try {
					const bookingsData = await getProfileData(userData.name, 'bookings');
					const sortedBookings = bookingsData.sort(
						(a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
					);
					const today = new Date();

					// Find the first upcoming booking where dateFrom is in the future
					const firstUpcomingIndex = sortedBookings.findIndex(
						(booking) => new Date(booking.dateFrom) >= today
					);

					if (firstUpcomingIndex !== -1) {
						// Set the closest upcoming booking
						setClosestBooking(sortedBookings[firstUpcomingIndex]);
						
						setOtherBookings(sortedBookings);
					;
					} else {
						// No upcoming bookings, set both states to empty
						setClosestBooking(null);
						setOtherBookings([]);
					}
				} catch (error) {
					console.error('Error fetching bookings:', error);
				}
			}
		};

		fetchAndProcessBookings();
	}, []);
	const isValidUrl = (url) => {
		const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlPattern.test(url);
	};
	const handleAvatarUpdate = async (e) => {
		e.preventDefault();
		if (!isValidUrl(avatarUrl)) {
			setError('Please enter a valid URL');
			return;
		}
		try {
			await avatarUpdate(avatarUrl);
		} catch (error) {
			setError('An error occurred while updating the avatar');
			console.error('Error updating avatar:', error);
		}
	};
	return (
		<div className="account-wrapper">
			<div className="account-container">
				<div className="settings">
					<div className="user-info">
						<p>{localStorageHandling.getUserData().name}</p>
						<p>{localStorageHandling.getUserData().email}</p>
					</div>
					<button className="change-password">Change Password</button>
					<div className="avatar-container">
						<img
							src={localStorageHandling.getAvatarUrl()}
							alt="avatar"
							className="avatar-preview"
						/>
						<div className="error-message">{error}</div>
						<form
							className="change-avatar-form"
							onSubmit={handleAvatarUpdate}
						>
							<input
								type="text"
								id="avatarUrl"
								name="avatar"
								placeholder="Enter new avatar URL"
								value={avatarUrl}
								onChange={(e) => setAvatarUrl(e.target.value)}
							/>
							<button type="submit">Update Avatar</button>
						</form>
					</div>
					<div className="booking-section">
						<h2>Upcoming Booking</h2>
						{closestBooking ? (
							<div className="booking-detail">
								<p>
									From:{' '}
									{new Date(
										closestBooking.dateFrom
									).toLocaleDateString()}
								</p>
								<p>
									To:{' '}
									{new Date(closestBooking.dateTo).toLocaleDateString()}
								</p>
								<p>Guests: {closestBooking.guests}</p>
							</div>
						) : (
							<p>No upcoming bookings.</p>
						)}
					</div>
					<div className="booking-section">
						<h2>Booking history</h2>
						<div className="scrollable-bookings">
							{otherBookings.length > 0 ? (
								otherBookings.map((booking) => (
									<div key={booking.id} className="all-bookings">
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
										<p>Guests: {booking.guests}</p>
									</div>
								))
							) : (
								<p>No other bookings.</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Account;
