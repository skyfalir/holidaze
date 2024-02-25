import React, { useState } from 'react';
import { registerUser } from '../../../utility/api/Auth/register';
const SignUpForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
		venueManager: false,
	});
	const [formErrors, setFormErrors] = useState({});
	const [avatarPreview, setAvatarPreview] = useState('');
	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch (error) {
			return false;
		}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === 'avatar') {
			setFormData({
				...formData,
				[name]: value,
			});
			if (isValidUrl(value)) {
				setAvatarPreview(value);
			} else {
				setAvatarPreview('');
			}
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
			setFormErrors({
				...formErrors,
				[name]: null,
			});
		}
	};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputErrors = {};
    if (formData.name === '' || !/^[a-zA-Z0-9_]+$/.test(formData.name)) {
      inputErrors.name = 'Name can not contain special characters';
    }
    if (formData.email === '' || !/^[a-zA-Z0-9._%+-]+@(?:stud\.)?noroff\.no$/.test(formData.email)) {
      inputErrors.email = 'Email must be a valid .stud.noroff.no email.';
    }
    if (formData.password === '' || formData.password.length < 8) {
      inputErrors.password = 'Password must be at least 8 characters long.';
    }
    if (Object.keys(inputErrors).length > 0) {
      setFormErrors(inputErrors);
      return;
    }
    try {
      const response = await registerUser(formData);
      if (!response.ok) {
        const errorData = await response.json();
        const apiErrors = errorData.errors.map((error) => error.message);
        setFormErrors(apiErrors);
      } else {
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormErrors(['An error occurred while submitting the form. Please try again.']);
    }
  };
	const handleRadioChange = (value) => {
		setFormData({
			...formData,
			venueManager: value === 'true',
		});
	};
	return (
		<form onSubmit={handleSubmit}>
			<hr />
			<div className={`form-container ${formErrors.name ? 'error' : ''}`}>
				{formErrors.name && <span className="form-error">{formErrors.name}</span>}
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					placeholder="Name"
				/>
			</div>
			<div className={`form-container ${formErrors.email ? 'error' : ''}`}>
				{formErrors.email && (
					<span className="form-error">{formErrors.email}</span>
				)}
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
					placeholder="Email"
				/>
			</div>
			<div className={`form-container ${formErrors.password ? 'error' : ''}`}>
				{formErrors.password && (
					<span className="form-error">{formErrors.password}</span>
				)}
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Password"
				/>
			</div>
			<div className="avatar-container">
				{formErrors.avatar && (
					<span className="form-error">{formErrors.avatar}</span>
				)}
				<input
					type="text"
					name="avatar"
					value={formData.avatar}
					onChange={handleInputChange}
					placeholder="Avatar URL"
				/>
				{avatarPreview && (
					<img
						src={avatarPreview}
						className="avatar-preview"
						alt="Avatar Preview"
					/>
				)}
			</div>
			<div className="radio-container">
				<p>Are you a venue manager?</p>
				<div>
					<input
						type="radio"
						id="yes"
						name="venueManager"
						value="true"
						checked={formData.venueManager === true}
						onChange={() => handleRadioChange('true')}
            required
					/>
					<label htmlFor="yes">Yes</label>
				</div>
				<div>
					<input
						type="radio"
						id="no"
						name="venueManager"
						value="false"
						checked={formData.venueManager === false}
						onChange={() => handleRadioChange('false')}
            required
					/>
					<label htmlFor="no">No</label>
				</div>
			</div>
			<hr />
			<button type="submit">Register</button>
		</form>
	);
};
export default SignUpForm;
