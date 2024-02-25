import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import getVenueData from '../utility/api/fetchVenueData';
import './venue.css';
import Booking from '../components/Booking/createBooking/Booking';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MapComponent from '../components/MapComponent/Map';
import handleLocalStorage from '../utility/localStorageHandling';

const Venue = () => {
	const { id } = useParams();
	const [venue, setVenue] = useState(null);
	const [isOwner, setIsOwner] = useState(false);

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				const data = await getVenueData(id);
				setVenue(data);
			} catch (error) {
				console.error('Error fetching venue data:', error);
			}
		};
		fetchVenue();
	}, [id]);

	useEffect(() => {
		const userData = handleLocalStorage.getUserData();
		if (userData && venue && userData.name === venue.owner.name) {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
	}, [venue]);

	if (!venue) {
		return <div>Loading...</div>;
	}
	return (
		<div className="center-container">
			<div className="venue-container">
				<Helmet>
					<title>Holidaze | {venue.name}</title>
				</Helmet>
				<div className="manage-top">
					<h1>{venue.name}</h1>
					{isOwner && (
						<Link to={`/venue/edit/${id}`} className="edit-button">
							Edit Venue
						</Link>
					)}
				</div>
				<div className="venue-image">
					<div className="carousel">
						{venue.media.length > 0 ? (
							<Carousel showArrows={true} showThumbs={true}>
								{venue.media.map((mediaItem, index) => (
									<div key={index}>
										<img src={mediaItem} alt={`Slide ${index + 1}`} />
									</div>
								))}
							</Carousel>
						) : (
							<div>
								<img
									src="https://via.placeholder.com/400x300.png?text=No+Images+Available"
									alt="No Images Available"
								/>
								<p>No images available</p>
							</div>
						)}
					</div>
				</div>
				<div className="venue-details">
					<h2>Description:</h2>
					<p>{venue.description}</p>
					<div className="venue-meta">
						<p>Price: {venue.price}</p>
						<p>Max Guests: {venue.maxGuests}</p>
						<p>Rating: {venue.rating}</p>
					</div>
				</div>
				<div className="bottom-section">
					<div className="venue-location">
						<MapComponent venue={venue} />
						<p>
							Location: {venue.location.city}, {venue.location.country}
						</p>
					</div>
					<Booking venue={venue} />
				</div>
			</div>
		</div>
	);
};
export default Venue;
