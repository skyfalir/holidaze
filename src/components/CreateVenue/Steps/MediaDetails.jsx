import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../createvenueform.css';
const StepThree = ({ formData, handleChange, setFormData }) => {
	const [mediaData, setMediaData] = useState([]);
	const [newMediaUrl, setNewMediaUrl] = useState('');

	const handleMediaUrlChange = (e) => {
		setNewMediaUrl(e.target.value);
	};
	const handleAddMedia = () => {
		let type = '';
		if (newMediaUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
			type = 'image';
		} else if (newMediaUrl.match(/\.(mp4|ogg|webm)$/i)) {
			type = 'video';
		}
		if (type) {
			const newMediaItem = { url: newMediaUrl, type };
			const updatedMediaData = [...mediaData, newMediaItem];
			setMediaData(updatedMediaData);
			setNewMediaUrl('');
		}
	};
	const handleRemoveMedia = (index) => {
		const updatedMediaData = mediaData.filter((_, i) => i !== index);
		setMediaData(updatedMediaData);
	};
	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			media: mediaData.map((item) => item.url), 
		}));
	}, [mediaData, setFormData]); // I know SetFormData is redundant here, ESlint is complaining however - so here it is..

	return (
		<>
			<h2>Show off your venue!</h2>
			<div className="media">
				<div className="url-input">
					<input
						type="text"
						value={newMediaUrl}
						onChange={handleMediaUrlChange}
						placeholder="Enter media URL"
					/>
					<button onClick={handleAddMedia}>Add Media</button>
				</div>
				<Carousel className="vc-carousel">
					{mediaData.map((media, index) => (
						<div key={index}>
							{media.type === 'image' && (
								<img src={media.url} alt={`Media Preview ${index + 1}`} />
							)}
							{media.type === 'video' && (
								<video controls>
									<source src={media.url} type="video/mp4" />
								</video>
							)}
						</div>
					))}
				</Carousel>
				<div className="media-list">
					<ul>
						{mediaData.map((media, index) => (
							<li key={index}>
								<span>
									{media.type === 'image'
										? `Image ${index + 1}`
										: `Video ${index + 1}`}
								</span>
								<span
									className="remove-media"
									style={{ cursor: 'pointer' }}
									onClick={() => handleRemoveMedia(index)}
								>
									{' '}
									&#10006;
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default StepThree;
