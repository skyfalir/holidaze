import React from 'react';

import PropTypes from 'prop-types';

import './featured-card.css';

const FeaturedCard = (props) => {
	return (
		<div className={`featured-card-container ${props.rootClassName} `}>
			<img alt={props.imageAlt} src={props.image} className="featured-card-image" />
			<div className="featured-card-container1">
				<span className="featured-card-text">{props.city}</span>
				<span className="featured-card-text1">{props.description}</span>
				<button className="button cta-featured">Book Now</button>
			</div>
		</div>
	);
};

FeaturedCard.defaultProps = {
	image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000',
	imageAlt: 'image',
	city: 'City Name',
	rootClassName: '',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
};

FeaturedCard.propTypes = {
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	city: PropTypes.string,
	rootClassName: PropTypes.string,
	description: PropTypes.string,
};

export default FeaturedCard;
