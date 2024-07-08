import React from 'react';

const Setup_two = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full flex">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 rounded-l-lg">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:w-3/4 p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">SetUp Your Account</h1>
          <div className="flex justify-evenly mb-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-12 h-12 flex justify-center items-center text-white font-bold mb-2">1</div>
              <span>Organization </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-500 rounded-full w-12 h-12 flex justify-center items-center text-white font-bold mb-2">2</div>
              <span>Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-12 h-12 flex justify-center items-center text-white font-bold mb-2">3</div>
              <span>Finish</span>
            </div>
          </div>
          <div className="text-center text-4xl font-bold mb-4">₹ 0000/-</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="col-span-1">
              <h2 className="text-lg font-bold mb-2">Select a payment method</h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input type="radio" name="paymentMethod" className="form-radio text-blue-600" />
                  <span className="ml-2">UPI</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="paymentMethod" className="form-radio text-blue-600" />
                  <span className="ml-2">Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="paymentMethod" className="form-radio text-blue-600" />
                  <span className="ml-2">Credit Card</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="paymentMethod" className="form-radio text-blue-600" />
                  <span className="ml-2">Net Banking</span>
                </label>
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter UPI ID</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Pay</button>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup_two;