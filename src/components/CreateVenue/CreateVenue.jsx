import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createVenue from '../../utility/api/createVenue';
import updateVenue from '../../utility/api/updateVenue';
import StepOne from './Steps/PrimaryDetails';
import StepTwo from './Steps/LocationDetails';
import StepThree from './Steps/MediaDetails';
import getVenueData from '../../utility/api/fetchVenueData';
import deleteVenue from '../../utility/api/deleteVenue';
import {validateStepOne, validateStepTwo} from './utils/validation';
function CreateVenueForm({ id, isEditMode }) {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [currentStep, setCurrentStep] = useState(1);
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

	// Fetch and set venue data on edit mode
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

	// handle form steps

	const validateCurrentStep = () => {
		switch (currentStep) {
		case 1:
			return validateStepOne(formData);
		case 2:
				return validateStepTwo(formData);
		
		  default:
			return {};
		}
	  };

	const totalSteps = 3;
	const isLastStep = currentStep === totalSteps;
	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};
	const handleNext = () => {
		const currentErrors = validateCurrentStep();
		setErrors(currentErrors);
	
		if (Object.keys(currentErrors).length === 0) {
		  setCurrentStep(currentStep + 1);
		}
	  };

	// handle form data
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevFormData) => {
			if (currentStep === 1) {
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
			} else if (currentStep === 2) {
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
	// handle form submission
	const handleSubmit = async () => {
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
	};
	// handle delete
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

	  // render form steps
	  const renderStep = () => {
		switch (currentStep) {
		  case 1:
			return (
			  <>
				<StepOne formData={formData} handleChange={handleChange} errors={errors} />
				
			  </>
			);
		  case 2:
			return (
			  <>
				<StepTwo formData={formData} handleChange={handleChange} errors={errors} />
				
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
					<button onClick={handlePrevious} disabled={currentStep === 1}>
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
