import React, { useEffect, useState } from 'react';
import StepIndicator from './StepIndicator';

const Setup_two = () => {
  const steps = ['Organization', 'Create Branch', 'Payment', 'Finish'];
  const currentStep = 2; // Set this dynamically as per your logic
  const [branchCount, setBranchCount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(3); // Default to 3 months
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [showBranchDetails, setShowBranchDetails] = useState(false);
  const amountPerBranch = 6000;

  useEffect(() => {
    const storedBranchDetails = JSON.parse(localStorage.getItem('branchDetails')) || [];
    setBranchCount(storedBranchDetails.length);
  }, []);

  const totalAmount = branchCount * amountPerBranch;

  const calculateNextChargeDate = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + selectedPlan);
    return currentDate.toDateString();
  };

  const handlePlanChange = (e) => {
    setSelectedPlan(parseInt(e.target.value, 10));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex max-w-4xl w-full h-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 h-full fixed left-0 top-0 bottom-0">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:w-3/4 p-6 ml-auto md:ml-[24rem] lg:ml-auto" >
          <h1 className="text-3xl font-bold mb-4 text-center">SetUp Your Account</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="border-t border-b py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{branchCount} item(s)</span>
              <span className="text-sm font-medium text-gray-700">INR</span>
            </div>
            <div className="mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Branch Subscription</h2>
              <p className="text-sm text-gray-600">{branchCount} Branch(es)</p>
              <p className="text-sm text-gray-600">Subscription Plan</p>
              <p>
                <a href='/setupthree' className="text-sm text-blue-500">Edit Branch Details</a>
              </p>

              <button onClick={() => setShowBranchDetails(true)} className="text-sm text-blue-500">View Branch Details</button>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-500">Add Coupon Code</span>
            </div>
          </div>
          <div className="border-t border-b py-4 mb-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">₹{totalAmount}</span>
            </div>
          </div>
          <div className="py-4">
            <div className="text-lg font-semibold text-gray-900 mb-1">Select Subscription Plan</div>
            <select 
              className="block w-full p-2 border border-gray-300 rounded-md mb-4"
              value={selectedPlan}
              onChange={handlePlanChange}
            >
              <option value={3}>3 months</option>
              <option value={9}>9 months</option>
              <option value={12}>12 months</option>
            </select>
            <div className="text-lg font-semibold text-gray-900 mb-1">Total Billed Monthly</div>
            <div className="text-sm text-gray-600">Next charge date: {calculateNextChargeDate()}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="col-span-1">
              <h2 className="text-lg font-bold mb-2">Select a payment method</h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    className="form-radio text-blue-600"
                    checked={paymentMethod === 'UPI'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span className="ml-2">UPI</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Debit Card"
                    className="form-radio text-blue-600"
                    checked={paymentMethod === 'Debit Card'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span className="ml-2">Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit Card"
                    className="form-radio text-blue-600"
                    checked={paymentMethod === 'Credit Card'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span className="ml-2">Credit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Net Banking"
                    className="form-radio text-blue-600"
                    checked={paymentMethod === 'Net Banking'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span className="ml-2">Net Banking</span>
                </label>
              </div>
            </div>
            {paymentMethod === 'UPI' ? (
              <div className="col-span-1 flex flex-col justify-center items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter UPI ID</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Pay</button>
              </div>
            ) : (paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && (
              <div className="col-span-1 flex flex-col justify-center items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <div className="flex w-full justify-between">
                  <div className="w-1/2 pr-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-1/3 pl-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input type="text" placeholder='CVV' className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Pay</button>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <a href="/final">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Next</button>
            </a>
          </div>
        </div>
      </div>
      {showBranchDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Branch Details</h2>
            <ul>
              {Array.from({ length: branchCount }, (_, i) => (
                <li key={i} className="flex justify-between py-2 border-b">
                  <span>Branch {i + 1}</span>
                  <span>₹{amountPerBranch}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">₹{totalAmount}</span>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowBranchDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setup_two;
                 