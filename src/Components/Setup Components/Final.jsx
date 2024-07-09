import React from 'react';
import { Link } from 'react-router-dom';

const SetupComplete = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex md:flex-row h-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 rounded-l-lg">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:w-3/4 p-6 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4 text-center">Set Up Your Account</h1>
          <div className="flex justify-evenly mb-8 gap-10">
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">1</div>
              <span className="text-xs md:text-base">Organization</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-[#00274D] w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">2</div>
              <span className="text-xs md:text-base">Create Branch</span>
            </div>
            <div className="flex flex-col items-center">
              <div className=" bg-[#00274D] rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">3</div>
              <span className="text-xs md:text-base">Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <div className=" bg-yellow-500 rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">4</div>
              <span className="text-xs md:text-base">Finish</span>
            </div>
          </div>
          <div className="text-center text-2xl font-bold mb-4">Almost Done!</div>
          <div className="text-center text-lg mb-4">You have successfully registered your school with us.</div>
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720525171/Registration_Successful_hmvcir.gif" alt="Success" className="w-48 h-40 mb-4" />
          <div className="flex justify-between w-full px-6">
            <Link to="/ordersummmary" className="bg-[#00274D] text-white px-4 py-2 rounded-md">Previous</Link>
            <Link to="/" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Finish</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupComplete;