import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; // Adjust the path if necessary

const ForgotPasswordModal = ({ showModal, setShowModal }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = async () => {
    if (step === 1) {
      // Send POST request with emailOrMobile
      try {
        const response = await axios.post('http://localhost:3000/sms/sendEmail', { email: formData.emailOrMobile });
        console.log(response.data); // Handle response data if needed
        setStep(step + 1);
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      }
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleClose = () => {
    setShowModal(false);
    setStep(1);
  };

  return (
    <Modal show={showModal} onClose={handleClose}>
      {step === 1 && (
        <div className="flex flex-col items-center p-4">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720546311/lock_lo7rgi.png" alt="Lock" className="h-10 mb-4" />
          <h2 className="text-sm font-bold mb-2">Trouble Logging in?</h2>
          <p className="mb-4 text-xs">Enter registered Mobile number or email address.</p>
          <input
            type="text"
            name="emailOrMobile"
            value={formData.emailOrMobile}
            onChange={handleInputChange}
            className="w-full h-7 p-1 mb-4 border rounded-md text-sm"
            placeholder="Enter Email or Mobile"
            required
          />
          <div className="flex justify-between w-full">
            <button onClick={handleClose} className="text-red-500 text-xs">Close</button>
            <button onClick={handleNext} className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">Submit</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center p-4">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720546830/Verify_nrugmj.png" alt="Verify" className="h-10 mb-4" />
          <h2 className="text-sm font-bold mb-2">Verify Your Identity</h2>
          <p className="mb-4 text-xs">To verify your identity, we have sent a security code to your mobile number/email.</p>
          <input
            type="text"
            name="resetcode"
            value={formData.verificationCode}
            onChange={handleInputChange}
            className="w-full h-7 p-1 mb-4 border rounded-md text-sm"
            placeholder="Enter Security Code"
          />
          <input
            type="text"
            name="email"
            value={formData.verificationCode}
            onChange={handleInputChange}
            className="w-full h-7 p-1 mb-4 border rounded-md text-sm"
            placeholder="Enter EmailId"
          />
          <input
            type="text"
            name="newPassword"
            value={formData.verificationCode}
            onChange={handleInputChange}
            className="w-full h-7 p-1 mb-4 border rounded-md text-sm"
            placeholder="Enter Security Code"
          />
          <div className="flex justify-between w-full">
            <button onClick={handlePrevious} className="text-red-500 text-xs">Previous</button>
            <button onClick={handleNext} className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center p-4">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720546891/padlock_3_j1puvk.png" alt="Lock" className="h-10 mb-4" />
          <h2 className="text-sm font-bold mb-2">Setup new password</h2>
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full h-7 p-1 mb-4 border rounded-md text-sm"
            placeholder="Enter new password"
          />
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full h-7 p-1 mb-4 border rounded-md text-sm"
            placeholder="Re-Enter new password"
          />
          <div className="flex justify-between w-full">
            <button onClick={handlePrevious} className="text-red-500 text-xs">Previous</button>
            <button onClick={handleClose} className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">Submit</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
