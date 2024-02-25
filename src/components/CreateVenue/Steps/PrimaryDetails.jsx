import React from 'react';

const StepOne = ({ formData, handleChange }) => {
	return (
		<>
			<h2>Tell us a bit about your venue</h2>
			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				placeholder="Venue Name"
			/>
			<textarea
				type="text"
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Description"
			/>

			<div className="vf-details">
				<label>
					Max Guests
					<input
						type="number"
						name="maxGuests"
						value={formData.maxGuests}
						onChange={handleChange}
						placeholder="Max Guests"
					/>
				</label>
				<label>
					Rating
					<input
						type="number"
						name="rating"
						value={formData.rating}
						onChange={handleChange}
						placeholder="Rating"
					/>
				</label>
			</div>

			<h3>Facilities</h3>
			<div className="cv-facilities">
				<label>
					Wifi
					<input
						type="checkbox"
						name="wifi"
						checked={formData.meta.wifi}
						onChange={handleChange}
					/>
				</label>
				<label>
					Parking
					<input
						type="checkbox"
						name="parking"
						checked={formData.meta.parking}
						onChange={handleChange}
					/>
				</label>
				<label>
					Pets
					<input
						type="checkbox"
						name="pets"
						checked={formData.meta.pets}
						onChange={handleChange}
					/>
				</label>
				<label>
					Breakfast
					<input
						type="checkbox"
						name="breakfast"
						checked={formData.meta.breakfast}
						onChange={handleChange}
					/>
				</label>
			</div>
		</>
	);
};

export default StepOne;
