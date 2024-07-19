import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidemenu from "../Sidemanu_Components/Sidemenu";
import Header from "../Header_Components/Header";
import TeacherIndicator from "./TeacherIndicator"; // Assuming you have a similar indicator for teachers
import PhotoUpload from "./PhotoUpload";

const TeacherEnrollment = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobileNo: "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    religion: "",
    nationality: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    bloodGroup: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const steps = [
    "Personal Information",
    "Employment Information",
    "User Creation",
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchPincodeDetails = async (pincode) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];
      if (data.Status === "Success") {
        const { State, District } = data.PostOffice[0];
        setFormData((prevData) => ({
          ...prevData,
          state: State,
          city: District,
        }));
      } else {
        console.error("Invalid Pincode");
        setFormData((prevData) => ({
          ...prevData,
          state: "",
          city: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    if (name === "pinCode" && value.length === 6) {
      fetchPincodeDetails(value);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "email",
      "mobileNo",
      "address",
      "city",
      "state",
      "pinCode",
      "religion",
      "nationality",
      "fatherName",
      "motherName",
      "fatherOccupation",
      "motherOccupation",
      "bloodGroup",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/[A-Z]/g, (letter) => " " + letter)
        } is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (step === 3) {
        console.log("Submitting Form Data:", formData);
        navigate("/next-path-after-submission");
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
      <div
        className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex flex-col flex-1 p-4 overflow-y-auto justify-center items-center bg-gray-100">
          <div className="w-full max-w-96xl bg-white rounded-lg shadow-xl p-8 text-gray-900 form-container">
            <TeacherIndicator currentStep={step - 1} steps={steps} />
            <h1 className="text-xl font-bold text-center mb-6">
              Teacher Registration Form
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step === 1 && (
                  <>
                    <div className="col-span-1 md:col-span-2">
                      <PhotoUpload />
                    </div>

                    <div>
                      <label htmlFor="firstName">
                        First Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        className="input-field bg-[#eceff7]"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <p className="error text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName">
                        Last Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        className="input-field bg-[#eceff7]"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <p className="error text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth">
                        Date of Birth<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="input-field bg-[#eceff7]"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                      {errors.dateOfBirth && (
                        <p className="error text-red-500">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="gender">
                        Gender<span className="text-red-600">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className="input-field bg-[#eceff7]"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="error text-red-500">{errors.gender}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email">
                        Email{" "}
                        <span className="text-red-600">
                          <span className="text-red-600">*</span>
                        </span>
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="input-field bg-[#eceff7]"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="error text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="mobileNo">
                        Mobile No.<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        id="mobileNo"
                        name="mobileNo"
                        placeholder="Mobile No."
                        className="input-field bg-[#eceff7]"
                        value={formData.mobileNo}
                        onChange={handleChange}
                      />
                      {errors.mobileNo && (
                        <p className="error text-red-500">{errors.mobileNo}</p>
                      )}
                    </div>
                    <p className="text-xl font-bold">Address</p>
                    <div></div>
                    <div>
                      <label htmlFor="address">
                        Address Line 1<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder=" House No / Flat No & Street Name"
                        className="input-field bg-[#eceff7]"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <p className="error text-red-500">{errors.address}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="addressLine2">Address Line 2</label>
                      <input
                        type="text"
                        id="addressLine2"
                        name="addressLine2"
                        placeholder="Landmark"
                        className="input-field bg-[#eceff7]"
                        value={formData.addressLine2}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="pinCode">
                        Pin Code<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        placeholder="Pin Code"
                        className="input-field bg-[#eceff7]"
                        value={formData.pinCode}
                        onChange={handleChange}
                      />
                      {errors.pinCode && (
                        <p className="error text-red-500">{errors.pinCode}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="city">
                        City<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        className="input-field bg-[#eceff7]"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      {errors.city && (
                        <p className="error text-red-500">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state">
                        State<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="State"
                        className="input-field bg-[#eceff7]"
                        value={formData.state}
                        onChange={handleChange}
                      />
                      {errors.state && (
                        <p className="error text-red-500">{errors.state}</p>
                      )}
                    </div>

                    <div></div>


                    <div>
                      <label htmlFor="religion">
                        Religion<span className="text-red-600">*</span>
                      </label>

                      <input
                        type="text"
                        id="religion"
                        name="religion"
                        placeholder="Religion"
                        className="input-field bg-[#eceff7]"
                        value={formData.religion}
                        onChange={handleChange}
                      />
                      {errors.religion && (
                        <p className="error text-red-500">{errors.religion}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="nationality">
                        Nationality<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        placeholder="Nationality"
                        className="input-field bg-[#eceff7]"
                        value={formData.nationality}
                        onChange={handleChange}
                      />
                      {errors.nationality && (
                        <p className="error text-red-500">
                          {errors.nationality}
                        </p>
                      )}
                    </div>
                   
                    <div>
                      <label htmlFor="fatherName">
                        Father's Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        placeholder="Father's Name"
                        className="input-field bg-[#eceff7]"
                        value={formData.fatherName}
                        onChange={handleChange}
                      />
                      {errors.fatherName && (
                        <p className="error text-red-500">
                          {errors.fatherName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="motherName">
                        Mother's Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        placeholder="Mother's Name"
                        className="input-field bg-[#eceff7]"
                        value={formData.motherName}
                        onChange={handleChange}
                      />
                      {errors.motherName && (
                        <p className="error text-red-500">
                          {errors.motherName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="fatherOccupation">
                        Father Occupation<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="fatherOccupation"
                        name="fatherOccupation"
                        placeholder="Father's Occupation"
                        className="input-field bg-[#eceff7]"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                      />
                      {errors.fatherOccupation && (
                        <p className="error text-red-500">
                          {errors.fatherOccupation}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="motherOccupation">
                        Mother Occupation<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="motherOccupation"
                        name="motherOccupation"
                        placeholder="Mother's Occupation"
                        className="input-field bg-[#eceff7]"
                        value={formData.motherOccupation}
                        onChange={handleChange}
                      />
                      {errors.motherOccupation && (
                        <p className="error text-red-500">
                          {errors.motherOccupation}
                        </p>
                      )}
                    </div>

                    <div>
  <label htmlFor="bloodGroup">
    Blood Group<span className="text-red-600">*</span>
  </label>
  <select
    id="bloodGroup"
    name="bloodGroup"
    className="input-field bg-[#eceff7]"
    value={formData.bloodGroup}
    onChange={handleChange}
  >
    <option value="">Select Blood Group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
  {errors.bloodGroup && (
    <p className="error text-red-500">{errors.bloodGroup}</p>
  )}
</div>
                   
                  </>
                )}
              </div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                {step === 3 ? "Submit" : "Next"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherEnrollment;
