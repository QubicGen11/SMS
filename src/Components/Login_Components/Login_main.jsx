import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login_main = () => {
  return (
    <div className="Careersmain flex justify-center items-center min-h-screen" style={{ backgroundPosition: 'center center' }}>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-50 flex flex-col md:flex-row justify-center items-center text-2xl text-white sm:mx-6 md:text-4xl lg:text-5xl rounded-xl blur-bg p-4 max-w-screen-md">
        <div className="text-black w-full md:w-1/2 h-auto md:h-[70vh] rounded-2xl flex justify-center items-center p-4">
          <h1 className="text-2xl text-center text-white">Welcome! to the School Management System</h1>
        </div>
        <div className="text-black w-full md:w-1/2 h-auto md:h-[70vh] rounded-2xl flex justify-center items-center flex-col gap-5 p-4">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" className="h-24" alt="QubicGen Logo" />
          <div className="relative w-full md:w-64 flex justify-center">
            <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720430246/user_blfrle.png" alt="User Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6" />
            <input type="text" className="w-full pl-10 rounded-2xl text-lg p-2 h-12" placeholder="user id" />
          </div>
          <div className="relative w-full md:w-64 flex justify-center">
            <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720430245/padlock_lvmzv2.png" alt="Padlock Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6" />
            <input type="password" className="w-full pl-10 rounded-2xl text-lg p-2 h-12" placeholder="password" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <a href="#" className="text-sm text-white">Register / Sign Up</a>
            <a href="#" className="text-sm text-white">Forgot Password ?</a>
          </div>

          <Link to="/setup">
            <button className="bg-blue-500 hover:bg-yellow-600 text-white text-base font-bold px-16 py-2 rounded-2xl">LOG IN</button>
          </Link>


          
        </div>
      </div>
    </div>
  );
};

export default Login_main;