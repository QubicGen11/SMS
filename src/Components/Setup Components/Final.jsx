import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import StepIndicator from './StepIndicator';

const Final = () => {
  const steps = ['Organization', 'Preview', 'Payment', 'Finish'];
  const currentStep = 4;

  const location = useLocation();

  // Retrieve formData from location or local storage
  const formData =  JSON.parse(localStorage.getItem('formData')) || {};

  // Define required fields for validation
  const requiredFields = [
    'organizationName', 
    'registerPersonName', 
    'founderFirstName', 
    'founderLastName', 
    'mobileNumber', 
    'typeOfSchool', 
    'syllabusType', 
    'addressLine1', 
    'addressLine2', 
    'email', 
    'city', 
    'state', 
    'pincode', 
    'mandal', 
    'founderEmail', 
    'founderPassword'
  ];

  const validateFormData = () => {
    let missingFields = [];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        missingFields.push(field);
      }
    });


    return true;
  };

  const handleFinishClick = async () => {
    try {
      if (!validateFormData()) {
        return;
      }
  
      // Print the form data to the console for debugging
      console.log('Form Data:', formData);
  
      // Make the POST request with the form data
      const response = await axios.post('http://localhost:3000/sms/neworg', formData);
  
      // Handle response  
      console.log('Response:', response.data);
  
      // Clear local storage after successful POST request
      localStorage.removeItem('formData');
  
      // Redirect to login page or another page if needed
      window.location.href = '/';
  
    } catch (error) {
      console.error('Error making POST request:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('There was an error making the POST request. Check the console for more details.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-96xl w-full flex md:flex-row h-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] w-[40vw] text-white p-8 w-96 rounded-l-lg">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full p-4 md:p-6 h-full overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Set Up Your Account</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="text-center text-2xl font-bold mb-4">Almost Done!</div>
          <div className="text-center text-lg mb-4">You have successfully registered your school with us.</div>
          <div className='flex justify-center'>
            <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720525171/Registration_Successful_hmvcir.gif" alt="Success" className="w-48 h-40 mb-4" />
          </div>
          <div className="text-center text-2xl font-bold mb-4">
            <p className='text-sm font-medium'>Note: Use Organization email ID and password to Login</p>
          </div>
          <div className="text-center text-lg mb-4">
            <p className='text-sm font-medium'>Click on the Finish button below to redirect to the Login Page</p>
          </div>
          <div className="flex justify-between w-full px-6">
            <Link to="/ordersummary" className="bg-[#00274D] text-white px-4 py-2 rounded-md">Previous</Link>
            <button onClick={handleFinishClick} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Finish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;
