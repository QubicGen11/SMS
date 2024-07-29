import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StepIndicator from './StepIndicator';
import './SetupConfirmation.css';

const SetupConfirmation = () => {
  const steps = ['Organization', 'Preview', 'Payment', 'Finish'];
  const currentStep = 1;
  const [branchDetails, setBranchDetails] = useState({});
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [acknowledgeError, setAcknowledgeError] = useState('');
  const [agreeError, setAgreeError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem('branchDetails'));
    if (storedDetails && storedDetails.length > 0) {
      setBranchDetails(storedDetails[0]);
    }
  }, []);

  const handleConfirm = () => {
    let hasError = false;

    if (!isAcknowledged) {
      setAcknowledgeError('Please acknowledge that the information provided is correct.');
      hasError = true;
    } else {
      setAcknowledgeError('');
    }

    if (!isAgreed) {
      setAgreeError('Please agree to the Terms and Conditions and Privacy Policy.');
      hasError = true;
    } else {
      setAgreeError('');
    }

    if (!hasError) {
      navigate('/ordersummmary');
    }
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Set Up Your Account</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-8">
            <h2 className="text-2xl text-center mr-56 font-bold mb-4">Confirm Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="text-sm"><span className="text-base font-bold">Organization Name:</span> {branchDetails.organizationName}</div>
              <div className="text-sm"><span className="text-base font-bold">Registering Person Name:</span> {branchDetails.registerPersonName}</div>
              <div className="text-sm"><span className="text-base font-bold">Founder First Name:</span> {branchDetails.founderFirstName}</div>
              <div className="text-sm"><span className="text-base font-bold">Founder Last Name:</span> {branchDetails.founderLastName}</div>
              <div className="text-sm"><span className="text-base font-bold">Mobile Number:</span> {branchDetails.mobileNumber}</div>
              <div className="text-sm"><span className="text-base font-bold">Email:</span> {branchDetails.founderEmail}</div>
              <div className="text-sm"><span className="text-base font-bold">Type of School:</span> {branchDetails.typeOfSchool}</div>
              <div className="text-sm"><span className="text-base font-bold">Syllabus Type:</span> {branchDetails.syllubusType}</div>
              <div className="text-sm"><span className="text-base font-bold">Address Line 1:</span> {branchDetails.addressLine1}</div>
              <div className="text-sm"><span className="text-base font-bold">Address Line 2:</span> {branchDetails.addressLine2}</div>
              <div className="text-sm"><span className="text-base font-bold">Pin Code:</span> {branchDetails.pincode}</div>
              <div className="text-sm"><span className="text-base font-bold">City:</span> {branchDetails.city}</div>
              <div className="text-sm"><span className="text-base font-bold">State:</span> {branchDetails.state}</div>
              <div className="text-sm"><span className="text-base font-bold">Mandal:</span> {branchDetails.mandal}</div>
              <div className="text-sm"><span className="text-base font-bold">Village:</span> {branchDetails.village}</div>
              <div className="text-sm"><span className="text-base font-bold">Founder Email:</span> {branchDetails.founderEmail}</div>
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
            {acknowledgeError && <p className="text-red-500 text-xs">{acknowledgeError}</p>}
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
              />
              I agree to the <a href="/terms" className="text-blue-500 underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-500 underline">Privacy Policy</a>.
            </label>
            {agreeError && <p className="text-red-500 text-xs">{agreeError}</p>}
          </div>

          <div className="flex justify-between mt-8">
            <Link to="/setup">
              <button className="bg-[#00274D] text-white px-4 py-2 rounded-md">Edit</button>
            </Link>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupConfirmation;