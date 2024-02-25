const validateFormData = (formData) => {
    let errors = {};
  
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (formData.price <= 0) {
      errors.price = 'Price must be greater than zero';
    }
  
    return errors;
  };
  
  export default validateFormData;