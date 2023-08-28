import React, { useState } from 'react';
import FormLog from './formLog';

const Register = () => {
	const [registrationError, setRegistrationError] = useState('');

	const handleRegister = async (formData) => {
		try {
			console.log(formData)
			const response = await fetch('https://livinng.up.railway.app/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Registration failed');
			}

			// Registration successful, you can handle the success as needed
			console.log('Registration successful');
		} catch (error) {
			setRegistrationError(error.message);
		}
	};

	return (
		<div>
			<FormLog onSubmit={handleRegister} />
			{registrationError && <p>{registrationError}</p>}
		</div>
	);
};

export default Register;
