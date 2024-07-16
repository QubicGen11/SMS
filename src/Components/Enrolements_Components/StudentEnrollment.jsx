import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import StudentIndicator from './StudentIndicator'; // Ensure this import is correct
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
  const [step, setStep] = useState(1);
  const steps = ['Personal Information', 'Academic Information', 'User Creation'];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 3) {
      console.log("Submitting Form Data:", formData);
      navigate('/next-path-after-submission');
    } else {
      setStep(step + 1); // Navigate to next step
    }
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
                  <input type="text" name="firstName" placeholder="First Name*" className="input-field" value={formData.firstName} onChange={handleChange} />
                  <input type="text" name="lastName" placeholder="Last Name*" className="input-field" value={formData.lastName} onChange={handleChange} />
                  <input type="date" name="dateOfBirth" placeholder="Date of Birth*" className="input-field" value={formData.dateOfBirth} onChange={handleChange} />
                  <select name="gender" className="input-field" value={formData.gender} onChange={handleChange}>
                    <option value="">Gender*</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input type="text" name="fatherName" placeholder="Father Name*" className="input-field" value={formData.fatherName} onChange={handleChange} />
                  <input type="text" name="motherName" placeholder="Mother Name*" className="input-field" value={formData.motherName} onChange={handleChange} />
                  <input type="text" name="fatherOccupation" placeholder="Father Occupation*" className="input-field" value={formData.fatherOccupation} onChange={handleChange} />
                  <input type="text" name="motherOccupation" placeholder="Mother Occupation*" className="input-field" value={formData.motherOccupation} onChange={handleChange} />
                  <input type="email" name="email" placeholder="Email*" className="input-field" value={formData.email} onChange={handleChange} />
                  <input type="text" name="mobileNo" placeholder="Mobile No.*" className="input-field" value={formData.mobileNo} onChange={handleChange} />
                  <input type="text" name="religion" placeholder="Religion*" className="input-field" value={formData.religion} onChange={handleChange} />
                  <input type="text" name="nationality" placeholder="Nationality*" className="input-field" value={formData.nationality} onChange={handleChange} />
                  <textarea name="address" placeholder="Address*" rows="3" className="input-field" value={formData.address} onChange={handleChange}></textarea>
                </>}
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">{step === 3 ? 'Submit' : 'Next'}</button>
            </form>
          </div>
        </main>
      </div>    
    </div>
  );
};

export default StudentEnrollment;