import React from 'react';
import { Link } from 'react-router-dom';

const Setup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 sm:p-10 rounded-lg shadow-lg max-w-4xl h-full w-full flex flex-col md:flex-row">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-full md:w-96 rounded-l-lg">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:w-3/4 p-4 md:p-6 h-full overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">SetUp Your Account</h1>
          <div className="flex justify-evenly mb-4 md:mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-500 rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">1</div>
              <span className="text-xs md:text-base">Organization</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">2</div>
              <span className="text-xs md:text-base">Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">3</div>
              <span className="text-xs md:text-base">Finish</span>
            </div>
          </div>
          <div className="h-[55vh] overflow-y-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">First Name <span className='text-red-600'><span className='text-red-500'>*</span></span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Last Name<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Organization Name<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Founder Name<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Mobile Number<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Organization Email<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Address<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">City<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">State<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Pin Code<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
                <h2 className="text-lg md:text-xl font-bold">Credentials</h2>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Email<span className='text-red-500'>*</span></label>
                <input type="text" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Password<span className='text-red-500'>*</span></label>
                <input type="password" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md" />
              </div>
              
            </form>
            
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end ">
                <div className="relative top-5">
                  <Link to="/setuptwo">
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Next</button>
                  </Link>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;