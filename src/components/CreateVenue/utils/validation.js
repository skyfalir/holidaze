export const validateStepOne = (formData) => {
  let errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Venue name is required.';
  }

  if (
    !formData.description.trim() ||
    formData.description.trim().split(/\s+/).length < 10
  ) {
    errors.description = 'Description must be at least 10 words.';
  }

  if (!formData.maxGuests) {
    errors.maxGuests = 'Max guests is required.';
  } else if (parseInt(formData.maxGuests, 10) <= 0) {
    errors.maxGuests = 'Max guests must be greater than 0.';
  }

  return errors;
};
export const validateStepTwo = (formData) => {
  let errors = {};

  if (!formData.location.city.trim()) {
    errors.city = 'City is required.';
  }

  if (!formData.location.address.trim()) {
    errors.address = 'Address is required.';
  }

  return errors;
};