import React from 'react';
import { Link } from 'react-router-dom';
import StepIndicator from './StepIndicator';

const Final = () => {
  const steps = ['Organization', 'Preview', 'Payment', 'Finish'];
  const currentStep = 4;
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
          <div className="text-center text-2xl font-bold mb-4"><p className='text-sm font-medium'>Note : Use Organization email Id and password to Login</p></div>
          <div className="text-center text-lg mb-4"><p className='text-sm font-medium'>Click on Finish button below to redirect to Login Page</p></div>
          <div className="flex justify-between w-full px-6">
            <Link to="/ordersummmary" className="bg-[#00274D] text-white px-4 py-2 rounded-md">Previous</Link>
            <Link to="/" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Finish</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;