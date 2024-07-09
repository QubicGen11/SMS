import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const Setup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    founderName: '',
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    credentialsEmail: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      validatePasswordStrength(value);
    }

    // Remove error for the field being updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validatePasswordStrength = (password) => {
    let strength = '';
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (password.length >= 8 && hasNumber && hasSpecialChar && hasUpperCase && hasLowerCase) {
      strength = 'strong';
    } else if (password.length >= 8) {
      strength = 'medium';
    } else {
      strength = 'weak';
    }
    setPasswordStrength(strength);
  };




  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.organizationName) formErrors.organizationName = "Organization Name is required";
    if (!formData.founderName) formErrors.founderName = "Founder Name is required";
    if (!formData.mobileNumber) formErrors.mobileNumber = "Mobile Number is required";
    if (!formData.email) {
      formErrors.email = "Organization Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Organization Email is invalid";
    }
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.pinCode) formErrors.pinCode = "Pin Code is required";
    if (!formData.credentialsEmail) {
      formErrors.credentialsEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.credentialsEmail)) {
      formErrors.credentialsEmail = "Email is invalid";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (passwordStrength === 'weak') {
      formErrors.password = "Password should contain one special character, one number, one uppercase letter, and must be at least 8 characters long";
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const branchDetails = {
        branchName: formData.organizationName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
      };
      localStorage.setItem('branchDetails', JSON.stringify([branchDetails]));
      navigate('/setupthree');
    } else {
      setErrors(formErrors);
      Object.values(formErrors).forEach(error => toast.error(error));
    }
  };

  const passwordRequirements = [
    { text: 'Contains at least 8 characters', valid: formData.password.length >= 8 },
    { text: 'Contains both lower (a-z) and upper case letters (A-Z)', valid: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
    { text: 'Contains at least one number (0-9)', valid: /\d/.test(formData.password) },
    { text: 'Contains at least one special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ];


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* <ToastContainer /> */}
      <div className="bg-white p-4 sm:p-10 rounded-lg shadow-lg max-w-4xl h-full w-full flex flex-col md:flex-row">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-full md:w-96 rounded-l-lg">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:w-3/4 p-4 md:p-6 h-full overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">SetUp Your Account</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                First Name <span className='text-red-600'>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Last Name<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="lastName"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Organization Name<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="organizationName"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.organizationName}
                onChange={handleChange}
              />
              {errors.organizationName && <span className="text-red-500 text-xs">{errors.organizationName}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Founder Name<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="founderName"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.founderName}
                onChange={handleChange}
              />
              {errors.founderName && <span className="text-red-500 text-xs">{errors.founderName}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Mobile Number<span className='text-red-500'>*</span></label>
              <input
                type="number"
                name="mobileNumber"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && <span className="text-red-500 text-xs">{errors.mobileNumber}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Organization Email<span className='text-red-500'>*</span></label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Address<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="address"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">City<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="city"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">State<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="state"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <span className="text-red-500 text-xs">{errors.state}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Pin Code<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="pinCode"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.pinCode}
                onChange={handleChange}
              />
              {errors.pinCode && <span className="text-red-500 text-xs">{errors.pinCode}</span>}
            </div>
            <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
              <h2 className="text-lg md:text-xl font-bold">Credentials</h2>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Email<span className='text-red-500'>*</span></label>
              <input
                type="email"
                name="credentialsEmail"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.credentialsEmail}
                onChange={handleChange}
              />
              {errors.credentialsEmail && <span className="text-red-500 text-xs">{errors.credentialsEmail}</span>}
            </div>
            <div>
            <div>
      <div>
        <label>Password</label>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md'
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="mt-2">
          {passwordRequirements.map((req, index) => (
            <div key={index} className="flex items-center">
              {req.valid ? <FaCheck className="text-green-500 mr-2" /> : <FaTimes className="text-red-500 mr-2" />}
              <span className='text-sm p-2'>{req.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setup;
