import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import StudentIndicator from './StudentIndicator';
import './StudentEnrollment.css';
import Student_step3 from './Student_step3';
import Student_step2 from './Student_step2';
import Studends_Enroll_dropdown from './Studends_Enroll_dropdown';

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
        address: '',
        pinCode: '',
        state: '',
        city: '',
        mandal: '',
        village: '',
        class: '',
        modeOfTransportation: '',
        identificationMarks1: '',
        identificationMarks2: '',
        studyCertificate: '',
        transferCertificate: '',
        dateOfJoining: '',
        username: '',
        password: '',
        student: '',
        admissionFee: '',
        tuitionFee: '',
        transportationFee: '',
        booksFee: '',
        uniformFee: '',
        discussedFee: ''
    });
    const [errorstwo, setErrorstwo] = useState({});
    const [step, setStep] = useState(1);
    const steps = ['Personal Information', 'Academic Information', 'Fee Details', 'User Creation'];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const fetchPincodeDetails = async (pincode) => {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = response.data[0];
            if (data.Status === 'Success') {
                const { State, District, Name, Block } = data.PostOffice[0];
                setFormData(prevData => ({
                    ...prevData,
                    state: State,
                    city: District,
                    mandal: Block,
                    village: Name
                }));
            } else {
                console.error('Invalid Pincode');
                setFormData(prevData => ({
                    ...prevData,
                    state: '',
                    city: '',
                    mandal: '',
                    village: ''
                }));
            }
        } catch (error) {
            console.error('Error fetching pincode data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (errorstwo[name]) {
            setErrorstwo(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
        if (name === 'pinCode' && value.length === 6) {
            fetchPincodeDetails(value);
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (step === 1) {
            const requiredFields = [
                'firstName', 'lastName', 'dateOfBirth', 'gender', 'fatherName',
                'motherName', 'fatherOccupation', 'motherOccupation', 'email',
                'mobileNo', 'religion', 'nationality', 'address', 'pinCode', 'state',
                'city', 'mandal', 'village'
            ];
            requiredFields.forEach(field => {
                if (!formData[field]) {
                    newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/[A-Z]/g, letter => ' ' + letter)} is required`;
                }
            });
        } else if (step === 2) {
            const requiredFields = [
                'class', 'modeOfTransportation', 'identificationMarks1', 'studyCertificate',
                'transferCertificate', 'dateOfJoining'
            ];
            requiredFields.forEach(field => {
                if (!formData[field]) {
                    newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/[A-Z]/g, letter => ' ' + letter)} is required`;
                }
            });
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            if (step === 4) {
                console.log("Submitting Form Data:", formData);
                navigate('/next-path-after-submission');
            } else {
                setStep(step + 1);
            }
        } else {
            setErrorstwo(formErrors);
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
                      <div className='mb-7 hidden md:hidden lg:block '>

                      <Studends_Enroll_dropdown/>
                      </div>
                        <StudentIndicator currentStep={step - 1} steps={steps} />
                        <h1 className="text-xl font-bold text-center mb-6">Student Enrollment Form</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {step === 1 && <>
                                    {/* Step 1 Form Fields */}
                                    <div>
                                        <label htmlFor="firstName">First Name*</label>
                                        <input type="text" id="firstName" name="firstName" placeholder="First Name" className="input-field bg-[#eceff7]" value={formData.firstName} onChange={handleChange} />
                                        {errorstwo.firstName && <p className="error text-red-500">{errorstwo.firstName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Last Name*</label>
                                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="input-field bg-[#eceff7]" value={formData.lastName} onChange={handleChange} />
                                        {errorstwo.lastName && <p className="error text-red-500">{errorstwo.lastName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="dateOfBirth">Date of Birth*</label>
                                        <input type="date" id="dateOfBirth" name="dateOfBirth" className="input-field bg-[#eceff7]" value={formData.dateOfBirth} onChange={handleChange} />
                                        {errorstwo.dateOfBirth && <p className="error text-red-500">{errorstwo.dateOfBirth}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="gender">Gender*</label>
                                        <select id="gender" name="gender" className="input-field bg-[#eceff7]" value={formData.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errorstwo.gender && <p className="error text-red-500">{errorstwo.gender}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="fatherName">Father's Name*</label>
                                        <input type="text" id="fatherName" name="fatherName" placeholder="Father's Name" className="input-field bg-[#eceff7]" value={formData.fatherName} onChange={handleChange} />
                                        {errorstwo.fatherName && <p className="error text-red-500">{errorstwo.fatherName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="motherName">Mother's Name*</label>
                                        <input type="text" id="motherName" name="motherName" placeholder="Mother's Name" className="input-field bg-[#eceff7]" value={formData.motherName} onChange={handleChange} />
                                        {errorstwo.motherName && <p className="error text-red-500">{errorstwo.motherName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="fatherOccupation">Father Occupation*</label>
                                        <input type="text" id="fatherOccupation" name="fatherOccupation" placeholder="Father's Occupation" className="input-field bg-[#eceff7]" value={formData.fatherOccupation} onChange={handleChange} />
                                        {errorstwo.fatherOccupation && <p className="error text-red-500">{errorstwo.fatherOccupation}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="motherOccupation">Mother Occupation*</label>
                                        <input type="text" id="motherOccupation" name="motherOccupation" placeholder="Mother's Occupation" className="input-field bg-[#eceff7]" value={formData.motherOccupation} onChange={handleChange} />
                                        {errorstwo.motherOccupation && <p className="error text-red-500">{errorstwo.motherOccupation}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email*</label>
                                        <input type="email" id="email" name="email" placeholder="Email" className="input-field bg-[#eceff7]" value={formData.email} onChange={handleChange} />
                                        {errorstwo.email && <p className="error text-red-500">{errorstwo.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="mobileNo">Mobile No.*</label>
                                        <input type="number" id="mobileNo" name="mobileNo" placeholder="Mobile No." className="input-field bg-[#eceff7]" value={formData.mobileNo} onChange={handleChange} />
                                        {errorstwo.mobileNo && <p className="error text-red-500">{errorstwo.mobileNo}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="religion">Religion*</label>
                                        <input type="text" id="religion" name="religion" placeholder="Religion" className="input-field bg-[#eceff7]" value={formData.religion} onChange={handleChange} />
                                        {errorstwo.religion && <p className="error text-red-500">{errorstwo.religion}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="nationality">Nationality*</label>
                                        <input type="text" id="nationality" name="nationality" placeholder="Nationality" className="input-field bg-[#eceff7]" value={formData.nationality} onChange={handleChange} />
                                        {errorstwo.nationality && <p className="error text-red-500">{errorstwo.nationality}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="address">Address*</label>
                                        <input type="text" id="address" name="address" placeholder="Address" className="input-field bg-[#eceff7]" value={formData.address} onChange={handleChange} />
                                        {errorstwo.address && <p className="error text-red-500">{errorstwo.address}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="pinCode">Pin Code*</label>
                                        <input type="text" id="pinCode" name="pinCode" placeholder="Pin Code" className="input-field bg-[#eceff7]" value={formData.pinCode} onChange={handleChange} />
                                        {errorstwo.pinCode && <p className="error text-red-500">{errorstwo.pinCode}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="state">State*</label>
                                        <input type="text" id="state" name="state" placeholder="State" className="input-field bg-[#eceff7]" value={formData.state} onChange={handleChange} />
                                        {errorstwo.state && <p className="error text-red-500">{errorstwo.state}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="city">City/District*</label>
                                        <input type="text" id="city" name="city" placeholder="City/District" className="input-field bg-[#eceff7]" value={formData.city} onChange={handleChange} />
                                        {errorstwo.city && <p className="error text-red-500">{errorstwo.city}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="mandal">Mandal*</label>
                                        <input type="text" id="mandal" name="mandal" placeholder="Mandal" className="input-field bg-[#eceff7]" value={formData.mandal} onChange={handleChange} />
                                        {errorstwo.mandal && <p className="error text-red-500">{errorstwo.mandal}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="village">Village*</label>
                                        <input type="text" id="village" name="village" placeholder="Village" className="input-field bg-[#eceff7]" value={formData.village} onChange={handleChange} />
                                        {errorstwo.village && <p className="error text-red-500">{errorstwo.village}</p>}
                                    </div>
                                </>}
                                {step === 2 && <>
                                <div className='max-w-96xl'>

                                    <Student_step2 formData={formData} handleChange={handleChange} errorstwo={errorstwo} />
                                </div>
                                </>}
                                {step === 3 && <>
                                    <Student_step3 />
                                </>}
                                {step === 4 && <>
                                    <div>
                                        <label htmlFor="username">Username/Login ID*</label>
                                        <input type="text" id="username" name="username" placeholder="Username/Login ID" className="input-field bg-[#eceff7]" value={formData.username} onChange={handleChange} />
                                        {errorstwo.username && <p className="error text-red-500">{errorstwo.username}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password*</label>
                                        <input type="password" id="password" name="password" placeholder="Password" className="input-field bg-[#eceff7]" value={formData.password} onChange={handleChange} />
                                        {errorstwo.password && <p className="error text-red-500">{errorstwo.password}</p>}
                                    </div>
                                </>}
                            </div>
                            {step > 1 && (
                                <button type="button" onClick={handlePrevious} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2">Previous</button>
                            )}
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">{step === 4 ? 'Submit' : 'Next'}</button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentEnrollment;
