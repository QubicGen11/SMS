import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import StepIndicator from './StepIndicator';
import './SetupConfirmation.css';

const SetupConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Correct placement of useNavigate
  const formData = state?.formData || {}; // Access formData passed from Setup

  const steps = ['Organization', 'Preview', 'Payment', 'Finish'];
  const currentStep = 1;

  // Handle the next button click to navigate to the final page
  const handleNext = () => {
    navigate('/final', { state: { formData } }); // Pass formData or any relevant data
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex max-w-96xl w-full h-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 rounded-l-lg fixed top-0 bottom-0 left-0">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png"
            alt="QubicGen Logo"
            className="mb-8 logo transition-transform duration-300 ease-in-out transform hover:scale-110 animate-logoInitial"
          />
          <h1 className="text-2xl font-normal">Unlock Your Thoughts</h1>
        </div>
        <div className="w-full md:ml-96 p-4 md:p-6 h-full overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Confirm Your Details</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-8">
            <h2 className="text-2xl text-center mr-56 font-bold mb-4">Confirm Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="text-sm"><span className="text-base font-bold">Organization Name:</span> {formData.organisationName}</div> {/* Corrected field name */}
              <div className="text-sm"><span className="text-base font-bold">Registering Person Name:</span> {formData.registerPersonName}</div>
              <div className="text-sm"><span className="text-base font-bold">Founder First Name:</span> {formData.founderFirstName}</div>
              <div className="text-sm"><span className="text-base font-bold">Founder Last Name:</span> {formData.founderLastName}</div>
              <div className="text-sm"><span className="text-base font-bold">Mobile Number:</span> {formData.mobileNumber}</div>
              <div className="text-sm"><span className="text-base font-bold">Founder Email:</span> {formData.founderEmail}</div>
              <div className="text-sm"><span className="text-base font-bold">Type of School:</span> {formData.typeOfSchool}</div>
              <div className="text-sm"><span className="text-base font-bold">Syllabus Type:</span> {formData.syllubusType}</div>
              <div className="text-sm"><span className="text-base font-bold">Address Line 1:</span> {formData.addressLine1}</div>
              <div className="text-sm"><span className="text-base font-bold">Address Line 2:</span> {formData.addressLine2}</div>
              <div className="text-sm"><span className="text-base font-bold">Pin Code:</span> {formData.pincode}</div>
              <div className="text-sm"><span className="text-base font-bold">City:</span> {formData.city}</div>
              <div className="text-sm"><span className="text-base font-bold">State:</span> {formData.state}</div>
              <div className="text-sm"><span className="text-base font-bold">Mandal:</span> {formData.mandal}</div>
              <div className="text-sm"><span className="text-base font-bold">Village:</span> {formData.village}</div>
            </div>
            <div className="flex justify-between mt-8">
              <Link to="/setup">
                <button className="bg-[#00274D] text-white px-4 py-2 rounded-md">Edit</button>
              </Link>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                onClick={handleNext}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupConfirmation;
