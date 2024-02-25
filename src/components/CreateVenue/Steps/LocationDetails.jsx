import React from 'react';

const StepTwo = ({ formData, handleChange }) => {
  return (
  <>
					<h2>Where is the venue located?</h2>
					<input
						type="text"
						name="city"
						value={formData.location.city}
						onChange={handleChange}
						placeholder="City"
					/>
					<input
						type="text"
						name="address"
						value={formData.location.address}
						onChange={handleChange}
						placeholder="Address"
					/>
				</>
  );
};

export default StepTwo;