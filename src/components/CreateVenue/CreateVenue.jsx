import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createVenue from '../../utility/api/createVenue';
import updateVenue from '../../utility/api/updateVenue';
import StepOne from './Steps/PrimaryDetails';
import StepTwo from './Steps/LocationDetails';
import StepThree from './Steps/MediaDetails';
import getVenueData from '../../utility/api/fetchVenueData';
import deleteVenue from '../../utility/api/deleteVenue';
import validateFormData from './utils/validation';
function CreateVenueForm({ id, isEditMode }) {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		media: [],
		price: 0,
		maxGuests: 0,
		rating: 0,
		meta: {
			wifi: false,
			parking: false,
			breakfast: false,
			pets: false,
		},
		location: {
			address: '',
			city: '',
			zip: '',
			country: '',
			continent: '',
			lat: 0,
			lng: 0,
		},
	});
	useEffect(() => {
		const fetchAndSetVenueData = async () => {
			try {
				const data = await getVenueData(id);
				setFormData(data);
			} catch (error) {
				console.error('Error fetching venue data:', error);
			}
		};
		if (isEditMode && id) {
			fetchAndSetVenueData();
		}
	}, [isEditMode, id]);
	const totalSteps = 3;
	const isLastStep = step === totalSteps;
	const handlePrevious = () => {
		if (step > 1) {
			setStep((prevStep) => prevStep - 1);
		}
	};
	const handleNext = () => {
		if (step < totalSteps) {
			setStep((prevStep) => prevStep + 1);
		}
	};
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevFormData) => {
			if (step === 1) {
				if (type === 'checkbox') {
					return {
						...prevFormData,
						meta: {
							...prevFormData.meta,
							[name]: checked,
						},
					};
				} else if (type === 'number') {
					return {
						...prevFormData,
						[name]: value === '' ? '' : parseInt(value),
					};
				} else {
					return {
						...prevFormData,
						[name]: value,
					};
				}
			} else if (step === 2) {
				return {
					...prevFormData,
					location: {
						...prevFormData.location,
						[name]:
							type === 'number'
								? value === ''
									? ''
									: parseInt(value)
								: value,
					},
				};
			}
		});
	};

	const handleSubmit = async () => {
		const validationErrors = validateFormData(formData);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length === 0) {
		try {
			let apiResponse;
			if (isEditMode) {
				apiResponse = await updateVenue(id, formData);
				console.log('CreateVenueForm updated successfully:', apiResponse);
				navigate(`/venue/${apiResponse.id}`);
			} else {
				apiResponse = await createVenue(formData);
				console.log('CreateVenueForm submitted successfully:', apiResponse);
				navigate(`/venue/${apiResponse.id}`);
			}
		} catch (error) {
			console.error('Error submitting CreateVenueForm:', error);
		}
	}
	};
	const renderValidationErrors = (errors) => {
		return (
		  <div className="validation-errors">
			{Object.keys(errors).map((key) => (
			  <div key={key}>{errors[key]}</div>
			))}
		  </div>
		);
	  };
	const handleDeleteVenue = async () => {
		try {
		  const result = await deleteVenue(id);
		  if (result) {
			console.log('Venue deleted successfully:', result);
		  } else {
			console.error('No result returned from the delete operation');
		  } 
		} catch (error) {
		  console.error('Error deleting venue:', error);
		}
	  };
	  const renderStep = () => {
		switch (step) {
		  case 1:
			return (
			  <>
				<StepOne formData={formData} handleChange={handleChange} errors={errors} />
				{renderValidationErrors(errors.stepOne)}
			  </>
			);
		  case 2:
			return (
			  <>
				<StepTwo formData={formData} handleChange={handleChange} errors={errors} />
				{renderValidationErrors(errors.stepTwo)}
			  </>
			);
		  case 3:
			return (
			  <>
				<StepThree
				  formData={formData}
				  handleChange={handleChange}
				  setFormData={setFormData}
				  errors={errors}
				/>
				{renderValidationErrors(errors.stepThree)}
			  </>
			);
		  default:
			return null;
		}
	  };
	return (
		<div className="form-container">
			<div className="create-venue-form">
				{renderStep()}
				<div className="step-buttons">
					<button onClick={handlePrevious} disabled={step === 1}>
						Back
					</button>
					{isLastStep ? (
						<button className="create-venue" onClick={handleSubmit}>
							Submit
						</button>
					) : (
						<button onClick={handleNext}>Next</button>
					)}
				</div>
			</div>
			{isEditMode && (
				<button className="delete-button" onClick={handleDeleteVenue}>Delete</button>
			)}
		</div>
	);
}
export default CreateVenueForm;
