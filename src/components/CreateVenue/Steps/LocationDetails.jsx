import React from 'react';

const StepTwo = ({ formData, handleChange, errors }) => {
  return (
  <>
					<h2>Where is the venue located?</h2>
					<div className="city">
						<input
							type="text"
							name="city"
							value={formData.location.city}
							onChange={handleChange}
							placeholder="City"
						/>
						{errors.city && <p className="error">{errors.city}</p>}
					</div>
					<div className="address">
						<input
							type="text"
							name="address"
							value={formData.location.address}
							onChange={handleChange}
							placeholder="Address"
						/>
						{errors.address && <p className="error">{errors.address}</p>}
					</div>
				</>
  );
};

export default StepTwo;