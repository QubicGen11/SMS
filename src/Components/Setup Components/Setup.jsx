import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import StepIndicator from './StepIndicator';
import axios from 'axios';
import './Setup.css';
import LogoUpload from './LogoUpload'; // Import the LogoUpload component

const Setup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    registerPersonName: '',
    founderFirstName: '',
    founderLastName: '',
    mobileNumber: '',
    typeOfSchool: '',
    syllubusType: '',
    addressLine1: '',
    addressLine2: '',
    email: '',
    city: '',
    state: '',
    pincode: '',
    mandal: '',
    village: '',
    founderEmail: '',
    founderPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const steps = ['Organization', 'Preview', 'Payment', 'Finish'];
  const currentStep = 0; // Set this dynamically as per your logic

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'founderPassword') {
      validatePasswordStrength(value);
    }

    if (name === 'pincode' && value.length === 6) {
      fetchPincodeDetails(value);
    }

    // Remove error for the field being updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const fetchPincodeDetails = async (pincode) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data[0];
      if (data.Status === 'Success') {
        const { State, District, Block, Name } = data.PostOffice[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          state: State,
          city: District,
          mandal: Block,
          village: Name,
          pincode: pincode,
        }));
      } else {
        toast.error('Invalid Pincode');
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      toast.error('Error fetching pincode data. Please try again.');
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
    if (!formData.organizationName) formErrors.organizationName = "Organization Name is required";
    if (!formData.registerPersonName) formErrors.registerPersonName = "Register Person Name is required";
    if (!formData.founderFirstName) formErrors.founderFirstName = "Founder First Name is required";
    if (!formData.founderLastName) formErrors.founderLastName = "Founder Last Name is required";
    if (!formData.mobileNumber) formErrors.mobileNumber = "Mobile Number is required";
    if (!formData.typeOfSchool) formErrors.typeOfSchool = "Select Type of School";
    if (!formData.syllubusType) formErrors.syllubusType = "Select Syllabus";

    // syllubusType: '',

    // if (!formData.email) {
    //   formErrors.email = "Organization Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   formErrors.email = "Organization Email is invalid";
    // }
    if (!formData.addressLine1) formErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.pincode) formErrors.pincode = "Pin Code is required";
    if (!formData.founderEmail) {
      formErrors.founderEmail = "Founder Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.founderEmail)) {
      formErrors.founderEmail = "Founder Email is invalid";
    }
    if (!formData.founderPassword) {
      formErrors.founderPassword = "Password is required";
    } else if (passwordStrength === 'weak') {
      formErrors.founderPassword = "Password should contain one special character, one number, one uppercase letter, and must be at least 8 characters long";
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      localStorage.setItem('branchDetails', JSON.stringify([formData]));
      navigate('/setupconfirmation');
    } else {
      setErrors(formErrors);
      Object.values(formErrors).forEach(error => toast.error(error));
    }
  };

  const passwordRequirements = [
    { text: 'Contains at least 8 characters', valid: formData.founderPassword.length >= 8 },
    { text: 'Contains both lower (a-z) and upper case letters (A-Z)', valid: /[a-z]/.test(formData.founderPassword) && /[A-Z]/.test(formData.founderPassword) },
    { text: 'Contains at least one number (0-9)', valid: /\d/.test(formData.founderPassword) },
    { text: 'Contains at least one special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.founderPassword) },
  ];

  const unsatisfiedRequirements = passwordRequirements.filter(req => !req.valid);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex max-w-964xl w-full h-full">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 rounded-l-lg fixed top-0 bottom-0 left-0">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png"
            alt="QubicGen Logo"
            className="mb-8 logo transition-transform duration-300 ease-in-out transform hover:scale-110 animate-logoInitial"
          />
          <h1 className='text-2xl font-normal'>Unlock Your Thoughts</h1>
        </div>
        <div className="w-full md:ml-96 p-4 md:p-6 h-full overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">SetUp Your Account</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <h1 className='text-2xl font-bold text-left'>Tell us a bit about you</h1>
            <div className="col-span-1 md:col-span-2">
              <LogoUpload />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Organization Name<span className="text-red-500">*</span>
              </label>
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
              <label className="block text-xs md:text-sm font-medium text-gray-700">Registering Person Name<span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="registerPersonName"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.registerPersonName}
                onChange={handleChange}
              />
              {errors.registerPersonName && <span className="text-red-500 text-xs">{errors.registerPersonName}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Founder First Name <span className='text-red-600'>*</span>
              </label>
             <input type='text' name="founderFirstName" className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.founderFirstName}
                onChange={handleChange}
              />
              {errors.founderFirstName && <span className="text-red-500 text-xs">{errors.founderFirstName}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Founder Last Name <span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="founderLastName"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.founderLastName}
                onChange={handleChange}
              />
              {errors.founderLastName && <span className="text-red-500 text-xs">{errors.founderLastName}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Mobile Number <span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="mobileNumber"
                placeholder='Organization Mobile Number'
                className="mt-1 block w-full p-1 md:p-2 border placeholder:text-xs border-gray-300 rounded-md"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && <span className="text-red-500 text-xs">{errors.mobileNumber}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Founder Email<span className='text-red-500'>*</span>
              </label>
              <input
                type="email"
                name="founderEmail"
                placeholder='Organization email'
                className="mt-1 block w-full p-1 placeholder:text-xs md:p-2 border border-gray-300 rounded-md"
                value={formData.founderEmail}
                onChange={handleChange}
              />
              {errors.founderEmail && <span className="text-red-500 text-xs">{errors.founderEmail}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Type of School<span className="text-red-500">*</span>
              </label>
              <select
                name="typeOfSchool"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.typeOfSchool}
                onChange={handleChange}
              >
                <option value="">Select School Type</option>
                <option value="residential">Residential</option>
                <option value="non-residential">Non Residential</option>
              </select>
              {errors.typeOfSchool && <span className="text-red-500 text-xs">{errors.typeOfSchool}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Syllabus Type<span className="text-red-500">*</span>
              </label>
              <select
                name="syllubusType"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.syllubusType}
                onChange={handleChange}
              >
                <option value="">Select Syllabus Type</option>
                <option value="cbse">CBSE</option>
                <option value="state-board">State Board</option>
                <option value="icsc">ICSC</option>
              </select>
              {errors.syllubusType && <span className="text-red-500 text-xs">{errors.syllubusType}</span>}
            </div>
            <h1 className='text-2xl font-bold'>Head Office Address</h1>
            <div></div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Address Line 1<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md placeholder:text-xs"
                placeholder='Door No / Building No and Street Name'
                value={formData.addressLine1}
                onChange={handleChange}
              />
              {errors.addressLine1 && <span className="text-red-500 text-xs">{errors.addressLine1}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                placeholder='Landmark'
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md placeholder:text-xs"
                value={formData.addressLine2}
                onChange={handleChange}
              />
              {errors.addressLine2 && <span className="text-red-500 text-xs">{errors.addressLine2}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Pin Code<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="pincode"
                placeholder='Postal ZIP Code'
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md placeholder:text-xs"
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <span className="text-red-500 text-xs">{errors.pincode}</span>}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                City/Village<span className='text-red-500'>*</span>
              </label>
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
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                State<span className='text-red-500'>*</span>
              </label>
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
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Mandal<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="mandal"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.mandal}
                onChange={handleChange}
              />
              {errors.mandal && <span className="text-red-500 text-xs">{errors.mandal}</span>}
            </div>
            {/* <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Village<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="village"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.village}
                onChange={handleChange}
              />
              {errors.village && <span className="text-red-500 text-xs">{errors.village}</span>}
            </div> */}
            <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
              <h2 className="text-lg md:text-xl font-bold">Credentials</h2>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">
                Founder Email<span className='text-red-500'>*</span>
              </label>
              <input
                type="email"
                name="founderEmail"
                className="mt-1 block w-full p-1 md:p-2 border border-gray-300 rounded-md"
                value={formData.founderEmail}
                onChange={handleChange}
              />
              {errors.founderEmail && <span className="text-red-500 text-xs">{errors.founderEmail}</span>}
            </div>
            <div>
              <label>Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="founderPassword"
                  value={formData.founderPassword}
                  onChange={handleChange}
                  className='block w-full p-1 md:p-2 border border-gray-300 rounded-md'
                />
                                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="mt-2">
                {unsatisfiedRequirements.map((req, index) => (
                  <div key={index} className="flex items-center">
                    {req.valid ? <FaCheck className="text-green-500 mr-2" /> : <FaTimes className="text-red-500 mr-2" />}
                    <span className='text-sm p-2'>{req.text}</span>
                  </div>
                ))}
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