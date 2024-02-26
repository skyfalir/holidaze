import React from 'react';

const StepOne = ({ formData, handleChange, errors }) => {


	return (
		<>
			<h2>Tell us a bit about your venue</h2>
			<div className="title">
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Venue Name"
				/>
				{errors.name && <p className="error">{errors.name}</p>}
			</div>
			<div className="description">
				<textarea
					type="text"
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Description"
				/>
				{errors.description && <p className="error">{errors.description}</p>}
			</div>
			<div className="required-details">
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
				{errors.maxGuests && <p className="error">{errors.maxGuests}</p>}
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
