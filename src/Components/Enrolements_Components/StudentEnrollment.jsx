import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import StudentIndicator from './StudentIndicator';
import './StudentEnrollment.css';

const StudentEnrollment = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      fatherName: '',
      motherName: '',
      fatherOccupation: '',
      motherOccupation: '',
      email: '',
      mobileNo: '',
      religion: '',
      nationality: '',
      address: ''
    });
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const steps = ['Personal Information', 'Academic Information', 'User Creation'];
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    };
  
    const validateForm = () => {
      let newErrors = {};
      // Validation logic for step 1
      if (step === 1) {
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.fatherName) newErrors.fatherName = 'Father\'s name is required';
        if (!formData.motherName) newErrors.motherName = 'Mother\'s name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.mobileNo) newErrors.mobileNo = 'Mobile number is required';
        if (!formData.religion) newErrors.religion = 'Religion is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.address) newErrors.address = 'Address is required';
      }
      // Additional validation for other steps can be added here
      return newErrors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0) {
        if (step === 3) {
          console.log("Submitting Form Data:", formData);
          navigate('/next-path-after-submission');
        } else {
          setStep(step + 1);
        }
      } else {
        setErrors(formErrors);
      }
    };
  
    const handlePrevious = () => {
      if (step > 1) setStep(step - 1);
    };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidemenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex flex-col flex-1 p-4 overflow-y-auto justify-center items-center bg-gray-100">
          <div className="w-full max-w-96xl bg-white rounded-lg shadow-xl p-8 text-gray-900 form-container">
            <StudentIndicator currentStep={step - 1} steps={steps} />

            <h1 className="text-xl font-bold text-center mb-6">Student Enrollment Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step === 1 && <>
                  <div>
                    <label htmlFor="firstName">First Name*</label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" className="input-field bg-[#eceff7] bg-[#eceff7]" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <p className="error text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name*</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="input-field bg-[#eceff7]" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <p className="error text-red-500">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth">Date of Birth*</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" className="input-field bg-[#eceff7]" value={formData.dateOfBirth} onChange={handleChange} />
                    {errors.dateOfBirth && <p className="error text-red-500">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label htmlFor="gender">Gender*</label>
                    <select id="gender" name="gender" className="input-field bg-[#eceff7]" value={formData.gender} onChange={handleChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="error text-red-500">{errors.gender}</p>}
                  </div>
                  <div>
                    <label htmlFor="fatherName">Father's Name*</label>
                    <input type="text" id="fatherName" name="fatherName" placeholder="Father's Name" className="input-field bg-[#eceff7]" value={formData.fatherName} onChange={handleChange} />
                    {errors.fatherName && <p className="error text-red-500">{errors.fatherName}</p>}
                  </div>
                  <div>
                    <label htmlFor="motherName">Mother's Name*</label>
                    <input type="text" id="motherName" name="motherName" placeholder="Mother's Name" className="input-field bg-[#eceff7]" value={formData.motherName} onChange={handleChange} />
                    {errors.motherName && <p className="error text-red-500">{errors.motherName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" name="email" placeholder="Email" className="input-field bg-[#eceff7]" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="error text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="mobileNo">Mobile No.*</label>
                    <input type="number" id="mobileNo" name="mobileNo" placeholder="Mobile No." className="input-field bg-[#eceff7]" value={formData.mobileNo} onChange={handleChange} />
                    {errors.mobileNo && <p className="error text-red-500">{errors.mobileNo}</p>}
                  </div>
                  <div>
                    <label htmlFor="religion"> Religion*</label>
                    <input type="text" id="religion" name="religion" placeholder="Religion" className="input-field bg-[#eceff7] " value={formData.religion} onChange={handleChange} />
                    {errors.religion && <p className="error text-red-500">{errors.religion}</p>}
                  </div>
                  <div>
                    <label htmlFor="nationality"> Nationality*</label>
                    <input type="text" id="nationality" name="nationality" placeholder="Nationality" className="input-field bg-[#eceff7] " value={formData.nationality} onChange={handleChange} />
                    {errors.nationality && <p className="error text-red-500">{errors.nationality}</p>}
                  </div>
                  <div>
                    <label htmlFor="mobileNo"> Address*</label>

                    <input type="text" id="address" name="address" placeholder="Address" className="input-field bg-[#eceff7] " value={formData.address} onChange={handleChange} />
                    {errors.address && <p className="error text-red-500">{errors.address}</p>}
                  </div>
                </>}
                {step === 2 && <>
                  <div>
                    <label htmlFor="class">Class*</label>
                    <input type="text" id="class" name="class" className="input-field bg-[#eceff7]" value={formData.class} onChange={handleChange} />
                    {errors.class && <p className="error text-red-500">{errors.class}</p>}
                  </div>
                  <div>
                    <label htmlFor="modeOfTransportation">Mode of Transportation*</label>
                    <input type="text" id="modeOfTransportation" name="modeOfTransportation" className="input-field bg-[#eceff7]" value={formData.modeOfTransportation} onChange={handleChange} />
                    {errors.modeOfTransportation && <p className="error text-red-500">{errors.modeOfTransportation}</p>}
                  </div>
                  <div>
                    <label htmlFor="identificationMarks1">Identification Marks 1*</label>
                    <input type="text" id="identificationMarks1" name="identificationMarks1" className="input-field bg-[#eceff7]" value={formData.identificationMarks1} onChange={handleChange} />
                    {errors.identificationMarks1 && <p className="error text-red-500">{errors.identificationMarks1}</p>}
                  </div>
                  <div>
                    <label htmlFor="identificationMarks2">Identification Marks 2</label>
                    <input type="text" id="identificationMarks2" name="identificationMarks2" className="input-field bg-[#eceff7]" value={formData.identificationMarks2} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="studyCertificate">Study/Conduct Certificate*</label>
                    <input type="file" id="studyCertificate" name="studyCertificate" className="input-field bg-[#eceff7]" onChange={handleChange} />
                    {errors.studyCertificate && <p className="error text-red-500">{errors.studyCertificate}</p>}
                  </div>
                  <div>
                    <label htmlFor="transferCertificate">Transfer Certificate*</label>
                    <input type="file" id="transferCertificate" name="transferCertificate" className="input-field bg-[#eceff7]                     " onChange={handleChange} />
                    {errors.transferCertificate && <p className="error text-red-500">{errors.transferCertificate}</p>}
                  </div>
                  <div>
                    <label htmlFor="dateOfJoining">Date of Joining*</label>
                    <input type="date" id="dateOfJoining" name="dateOfJoining" className="input-field bg-[#eceff7]" value={formData.dateOfJoining} onChange={handleChange} />
                    {errors.dateOfJoining && <p className="error text-red-500">{errors.dateOfJoining}</p>}
                  </div>
                </>}
                {step === 3 && <>
                  <div>
                    <label htmlFor="username">Username/Login ID*</label>
                    <input type="text" id="username" name="username" placeholder="Username/Login ID" className="input-field bg-[#eceff7]" value={formData.username} onChange={handleChange} />
                    {errors.username && <p className="error text-red-500">{errors.username}</p>}
                  </div>
                  <div>
                    <label htmlFor="password">Password*</label>
                    <input type="password" id="password" name="password" placeholder="Password" className="input-field bg-[#eceff7]" value={formData.password} onChange={handleChange} />
                    {errors.password && <p className="error text-red-500">{errors.password}</p>}
                  </div>
                </>}
              </div>
              {step > 1 && (
                <button type="button" onClick={handlePrevious} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2">Previous</button>
              )}
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">{step === 3 ? 'Submit' : 'Next'}</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentEnrollment;