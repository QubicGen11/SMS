import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal Components/Modal'; // Adjust the path if necessary

const SetupThree = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [branchDetails, setBranchDetails] = useState([]);
  const [formData, setFormData] = useState({
    branchName: '',
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    organizationName:'',
  });

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem('branchDetails'));
    if (storedDetails) {
      setBranchDetails(storedDetails);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updatedDetails;
    if (isEditMode) {
      updatedDetails = branchDetails.map((branch, index) => 
        index === editIndex ? formData : branch
      );
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      updatedDetails = [...branchDetails, formData];
    }
    setBranchDetails(updatedDetails);
    localStorage.setItem('branchDetails', JSON.stringify(updatedDetails));
    setFormData({
      branchName: '',
      mobileNumber: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pinCode: '',
    });
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setFormData(branchDetails[index]);
    setIsEditMode(true);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedDetails = branchDetails.filter((_, i) => i !== index);
    setBranchDetails(updatedDetails);
    localStorage.setItem('branchDetails', JSON.stringify(updatedDetails));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex md:flex-row h-[90vh]">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#00274D] text-white p-8 w-96 rounded-l-lg">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" alt="QubicGen Logo" className="mb-8" />
        </div>
        <div className="w-full md:w-3/4 p-4 md:p-6 h-full overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Set Up Your Account</h1>
          <div className="flex justify-evenly mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">1</div>
              <span className="text-xs md:text-base">Organization</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-500 rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">2</div>
              <span className="text-xs md:text-base">Create Branch</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">3</div>
              <span className="text-xs md:text-base">Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#00274D] rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2">4</div>
              <span className="text-xs md:text-base">Finish</span>
            </div>
          </div>
          <div className="text-center text-lg md:text-xl font-bold mb-4">Total No. Of Branches: {branchDetails.length}</div>
          <div className="text-center mb-8">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2" onClick={() => setShowModal(true)}>+</button>
            <div>Add Branch</div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Branch List</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b ">Branch Name</th>
                  <th className="py-2 px-10 border-b">City</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {branchDetails.map((branch, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">{branch.branchName}</td>
                    <td className="py-2 px-4 border-b text-center">{branch.city}</td>
                    <td className="py-2 px-4 border-b text-center">
                    <button className="text-blue-500 mr-4" onClick={() => handleEdit(index)}>
  <i className="fas fa-pencil-alt"></i>
</button>
<button className="text-red-500" onClick={() => handleDelete(index)}>
  <i className="fas fa-trash-alt"></i>
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-8">
            <Link to="/setup">
              <button className="bg-[#00274D] text-white px-4 py-2 rounded-md">Previous</button>
            </Link>
           
            <Link to="/ordersummmary">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Next</button>
            </Link>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Branch" : "Add Branch"}</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input
              type="text"
              name="branchName"
              placeholder="Branch Name"
              value={formData.branchName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Organization Email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              placeholder="Enter Pin Code"
              value={formData.pinCode}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-blue-100"
            />
          </div>
        </form>
        <div className="text-right mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
            {isEditMode ? 'Update' : 'Save'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SetupThree;