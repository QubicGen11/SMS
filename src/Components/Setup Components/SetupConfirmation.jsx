import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StepIndicator from './StepIndicator';
import './SetupConfirmation.css';

const SetupConfirmation = () => {
  const steps = ['Organization', 'Preview', 'Payment', 'Finish'];
  const currentStep = 1; // Set this dynamically as per your logic
  const [branchDetails, setBranchDetails] = useState({});
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem('branchDetails'));
    if (storedDetails && storedDetails.length > 0) {
      setBranchDetails(storedDetails[0]);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex max-w-964xl w-full h-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 rounded-l-lg fixed top-0 bottom-0 left-0">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png"
            alt="QubicGen Logo"
            className="mb-8 logo transition-transform duration-300 ease-in-out transform hover:scale-110 animate-logoInitial"
          />
          <h1 className='text-2xl font-normal'>Unlock Your Thoughts</h1>
        </div>
        <div className="w-full md:ml-96 p-4 md:p-6 h-full overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Set Up Your Account</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-8">
            <h2 className="text-2xl text-center font-bold mb-4">Confirm Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div><strong>Organization Name:</strong> {branchDetails.organizationName}</div>
              <div><strong>Registering Person Name:</strong> {branchDetails.registerPersonName}</div>
              <div><strong>Founder First Name:</strong> {branchDetails.founderFirstName}</div>
              <div><strong>Founder Last Name:</strong> {branchDetails.founderLastName}</div>
              <div><strong>Mobile Number:</strong> {branchDetails.mobileNumber}</div>
              <div><strong>Email:</strong> {branchDetails.email}</div>
              <div><strong>Type of School:</strong> {branchDetails.typeOfSchool}</div>
              <div><strong>Syllabus Type:</strong> {branchDetails.syllubusType}</div>
              <div><strong>Address Line 1:</strong> {branchDetails.addressLine1}</div>
              <div><strong>Address Line 2:</strong> {branchDetails.addressLine2}</div>
              <div><strong>Pin Code:</strong> {branchDetails.pincode}</div>
              <div><strong>City:</strong> {branchDetails.city}</div>
              <div><strong>State:</strong> {branchDetails.state}</div>
              <div><strong>Mandal:</strong> {branchDetails.mandal}</div>
              <div><strong>Village:</strong> {branchDetails.village}</div>
              <div><strong>Founder Email:</strong> {branchDetails.founderEmail}</div>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={isAcknowledged}
                onChange={() => setIsAcknowledged(!isAcknowledged)}
              />
              I acknowledge that all the information provided is correct.
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
              />
              I agree to the <a href="/terms" className="text-blue-500 underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-500 underline">Privacy Policy</a>.
            </label>
          </div>

          <div className="flex justify-between mt-8">
            <Link to="/setup">
              <button className="bg-[#00274D] text-white px-4 py-2 rounded-md">Edit</button>
            </Link>
            <Link to="/ordersummmary">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                disabled={!isAcknowledged || !isAgreed}
              >
                Confirm
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupConfirmation;