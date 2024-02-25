import { apiUrl, loginUrl } from '../../apiConstants';

export const loginUser = async (formData) => {
	try {
		const response = await fetch(apiUrl + loginUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Login successful');
			storeUserData(data); // Store the user data including the access token
			return { success: true }; // Return success flag
		} else {
			const errorData = await response.json();
			console.log('Login failed', errorData);
			return { success: false, errors: errorData.errors };
		}
	} catch (error) {
		console.error('Error:', error);
		// Handle error if needed
	}
};

const storeUserData = (userData, expirationSeconds) => {
	const currentTime = Date.now();
	const expirationTime = new Date(currentTime + expirationSeconds * 1000);
	const dataWithExpiration = { ...userData, expirationTime };
	localStorage.setItem('userData', JSON.stringify(dataWithExpiration));
};
const refreshExpirationTimer = (expirationSeconds) => {
	const storedUserData = localStorage.getItem('userData');
	if (storedUserData) {
		const userData = JSON.parse(storedUserData);
		const currentTime = Date.now();
		const expirationTime = new Date(currentTime + expirationSeconds * 1000);
		const dataWithExpiration = { ...userData, expirationTime };
		localStorage.setItem('userData', JSON.stringify(dataWithExpiration));
	}
};

refreshExpirationTimer(3600);
