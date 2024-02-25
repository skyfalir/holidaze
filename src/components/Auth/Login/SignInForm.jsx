import React, { useContext, useState } from 'react';
import { loginUser } from '../../../utility/api/Auth/login';
import { AuthContext } from '../../../context/AuthContext';
const SignInForm = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: null,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputErrors = {};
    if (formData.email === '') {
      inputErrors.email = 'Email is required.';
    }
    if (formData.password === '') {
      inputErrors.password = 'Password is required.';
    }
    if (Object.keys(inputErrors).length > 0) {
      setFormErrors(inputErrors);
      return;
    }
    try {
      const response = await loginUser(formData);
      if (response && response.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        if (response.errors && response.errors.length > 0) {
          const apiErrors = response.errors;
          const updatedFormErrors = { ...formErrors };
          apiErrors.forEach((error) => {
            const inputName = error.path[0];
            const errorMessage = error.message;
            updatedFormErrors[inputName] = errorMessage;
          });
          setFormErrors(updatedFormErrors);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={`form-container ${formErrors.email ? 'error' : ''}`}>
        {formErrors.email && <span className="form-error">{formErrors.email}</span>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
      </div>
      <div className={`form-container ${formErrors.password ? 'error' : ''}`}>
        {formErrors.password && <span className="form-error">{formErrors.password}</span>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
export default SignInForm;