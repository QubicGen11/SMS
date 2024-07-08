import React from 'react';
import { Link } from 'react-router-dom';

const Setup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full flex">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 rounded-l-lg">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:w-3/4 p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">SetUp Your Account</h1>
          <div className="flex justify-evenly mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-500 rounded-full w-12 h-12 flex justify-center items-center text-white font-bold mb-2">1</div>
              <span>Create Organization</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-12 h-12 flex justify-center items-center text-white font-bold mb-2">2</div>
              <span>Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-12 h-12 flex justify-center items-center text-white font-bold mb-2">3</div>
              <span>Finish</span>
            </div>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Name*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Founder Name*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Email*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pin Code*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="col-span-1 md:col-span-2 mt-4">
              <h2 className="text-xl font-bold">Credentials</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email*</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password*</label>
              <input type="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <Link to="/setuptwo">
              <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Next</button>

              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setup;