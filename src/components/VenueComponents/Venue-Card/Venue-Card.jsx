import React from 'react';
import { Link } from 'react-router-dom';
import './venue-card.css';
const VenueCard = ({ venue }) => {
  if (!venue) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`venue-card`}>
      <div className="venue-card-image-container">
        <img
          alt={venue.name}
          src={venue.media[0]}
          className="venue-card-image"
        />
      </div>
      <div className="vc-details">
      <div className="vc-title">
            <h2 >{venue.name}</h2>
          </div>
        <div className="details-container">
          <div className="vc-desc">
            <p>Description:</p>
            <span className='vc-desc-text'>{venue.description}</span>
          </div>
          <div className="vc-meta">
            <p>Price: {venue.price}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Rating: {venue.rating}</p>
          </div>
        </div>
        <Link to={`/venue/${venue.id}`}>
          <button className="cta-venue">View Details</button>
        </Link>
      </div>
    </div>
  );
};
export default VenueCard;