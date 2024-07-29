import React, { useEffect, useState } from 'react';
import StepIndicator from './StepIndicator';
import { Link } from 'react-router-dom';

const OrderSummary = () => {
  const steps = ['Organization', 'Preview', 'Payment', 'Finish'];
  const currentStep = 2; // Set this dynamically as per your logic
  const [branchDetails, setBranchDetails] = useState({});
  const [logo, setLogo] = useState('');

  useEffect(() => {
    const storedBranchDetails = JSON.parse(localStorage.getItem('branchDetails'));
    if (storedBranchDetails && storedBranchDetails.length > 0) {
      setBranchDetails(storedBranchDetails[0]);
    }

    const storedLogo = localStorage.getItem('logo');
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const totalAmount = 6000;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-5xl w-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-80 fixed left-0 top-0 bottom-0">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:ml-80 p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Set Up Your Account</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />

          <h2 className="text-2xl font-bold text-center my-8">Billing Summary</h2>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4">Order Item</h3>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img src={logo} alt="Organization Registration" className="w-12 h-12 mr-4" />
                <div>
                  <p className="font-medium">Organization Registration</p>
                  <p className="text-sm text-gray-600">1 year Free License and Support, 1 Super Admin, 5 Admins, 2000 users+</p>
                </div>
              </div>
              <p className="font-medium">Rs. 6,000.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Registration Date: 25-07-2024</p>
              <p className="text-sm">License Valid up to: 24-07-2025</p>
            </div>
          </div>

        

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-2">
              <h3 className="text-xl font-semibold mb-4">Do you have a coupon code?</h3>
              <div className="flex">
                <input type="text" className="border border-gray-300 p-2 rounded-l-md w-full" placeholder="Enter coupon code here" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Apply</button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2 lg:ml-2">
              <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
              <p className="text-sm">{branchDetails.registerPersonName}</p>
              <p className="text-sm">{branchDetails.mobileNumber}</p>
              <p className="text-sm">{branchDetails.founderEmail}</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
            <h3 className="text-xl font-semibold mb-4">Customer Address</h3>
            <p className="text-sm">{branchDetails.organizationName}</p>
            <p className="text-sm">{branchDetails.addressLine1}</p>
            <p className="text-sm">{branchDetails.addressLine2}</p>
            <p className="text-sm">{branchDetails.city}, {branchDetails.state}, {branchDetails.pincode}</p>
          </div>
          <div></div>
          <div className="bg-white shadow-lg rounded-lg p-6 mt-3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <p className="text-sm">Sub Total</p>
              <p className="text-sm">Rs. 6,000.00</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-sm">Discount</p>
              <p className="text-sm">Coupon Code - Rs. 6,000.00</p>
            </div>
            <div className="flex justify-between font-bold">
              <p className="text-sm">Total</p>
              <p className="text-sm">Rs. 0</p>
            </div>
          </div>


          <div className="flex justify-center mt-8">
            <Link to="/final">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md">Continue to Pay</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;