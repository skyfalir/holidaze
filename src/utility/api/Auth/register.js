import { apiUrl, registerUrl } from "../../apiConstants";

export const registerUser = async (formData) => {

try {
		const response = await fetch(apiUrl + registerUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			console.log('Registration successful');
		} else {
			console.log('Registration failed');
		}
	} catch (error) {
		console.error('Error:', error);
	}
};
