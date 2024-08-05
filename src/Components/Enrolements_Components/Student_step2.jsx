import React, { useState } from 'react';

const Student_step2 = ({ formData, handleChange, errorstwo }) => {
    const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
    const [showAcademicDropdown, setShowAcademicDropdown] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'personalDocuments') {
            setShowPersonalDropdown(checked);
        } else if (name === 'academicDocuments') {
            setShowAcademicDropdown(checked);
        }

        if (!checked) {
            setSelectedDocuments(selectedDocuments.filter((doc) => doc !== name));
            setUploadedFiles(uploadedFiles.filter((file) => file.document !== name));
        }
    };

    const handleDocumentSelect = (e) => {
        const { value } = e.target;
        if (value && !selectedDocuments.includes(value)) {
            setSelectedDocuments([...selectedDocuments, value]);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const selectedDoc = selectedDocuments[selectedDocuments.length - 1];
        if (file && selectedDoc) {
            const fileURL = URL.createObjectURL(file);
            setUploadedFiles([...uploadedFiles, { document: selectedDoc, fileName: file.name, fileURL }]);
        }
    };

    const handleDocumentRemove = (doc) => {
        setSelectedDocuments(selectedDocuments.filter((document) => document !== doc));
        setUploadedFiles(uploadedFiles.filter((file) => file.document !== doc));
    };

    const handleDocumentView = (fileURL) => {
        window.open(fileURL, '_blank');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
                <label htmlFor="dateOfJoining">Date of Joining*</label>
                <input
                    type="date"
                    id="dateOfJoining"
                    name="dateOfJoining"
                    placeholder="DD/MM/YYYY"
                    className="input-field bg-[#eceff7]"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                />
                {errorstwo.dateOfJoining && <p className="error text-red-500">{errorstwo.dateOfJoining}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="branch">Branch*</label>
                <input
                    type="text"
                    id="branch"
                    name="branch"
                    placeholder="Branch"
                    className="input-field bg-[#eceff7]"
                    value={formData.branch}
                    onChange={handleChange}
                />
                {errorstwo.branch && <p className="error text-red-500">{errorstwo.branch}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="class">Class*</label>
                <input
                    type="text"
                    id="class"
                    name="class"
                    placeholder="Class"
                    className="input-field bg-[#eceff7]"
                    value={formData.class}
                    onChange={handleChange}
                />
                {errorstwo.class && <p className="error text-red-500">{errorstwo.class}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="modeOfTransportation">Mode of Transportation*</label>
                <input
                    type="text"
                    id="modeOfTransportation"
                    name="modeOfTransportation"
                    placeholder="Mode of Transportation"
                    className="input-field bg-[#eceff7]"
                    value={formData.modeOfTransportation}
                    onChange={handleChange}
                />
                {errorstwo.modeOfTransportation && <p className="error text-red-500">{errorstwo.modeOfTransportation}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="identificationMarks1">Identification Marks*</label>
                <input
                    type="text"
                    id="identificationMarks1"
                    name="identificationMarks1"
                    placeholder="Identification Marks 1"
                    className="input-field bg-[#eceff7]"
                    value={formData.identificationMarks1}
                    onChange={handleChange}
                />
                {errorstwo.identificationMarks1 && <p className="error text-red-500">{errorstwo.identificationMarks1}</p>}
            </div>
            <div className="w-full">
                <input
                    type="text"
                    id="identificationMarks2"
                    name="identificationMarks2"
                    placeholder="Identification Marks 2"
                    className="input-field bg-[#eceff7]"
                    value={formData.identificationMarks2}
                    onChange={handleChange}
                />
            </div>

            <div className="col-span-2">
                <h2 className="font-bold text-lg">Previous School Details</h2>
            </div>

            <div className="w-full">
                <label htmlFor="schoolName">School Name*</label>
                <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    placeholder="School Name"
                    className="input-field bg-[#eceff7]"
                    value={formData.schoolName}
                    onChange={handleChange}
                />
                {errorstwo.schoolName && <p className="error text-red-500">{errorstwo.schoolName}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="schoolContactNumber">School Contact Number</label>
                <input
                    type="text"
                    id="schoolContactNumber"
                    name="schoolContactNumber"
                    placeholder="School Contact Number"
                    className="input-field bg-[#eceff7]"
                    value={formData.schoolContactNumber}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full">
                <label htmlFor="cityVillage">City/Village*</label>
                <input
                    type="text"
                    id="cityVillage"
                    name="cityVillage"
                    placeholder="City/Village"
                    className="input-field bg-[#eceff7]"
                    value={formData.cityVillage}
                    onChange={handleChange}
                />
                {errorstwo.cityVillage && <p className="error text-red-500">{errorstwo.cityVillage}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="lastGradeCompleted">Last Grade Completed*</label>
                <input
                    type="text"
                    id="lastGradeCompleted"
                    name="lastGradeCompleted"
                    placeholder="Last Grade Completed"
                    className="input-field bg-[#eceff7]"
                    value={formData.lastGradeCompleted}
                    onChange={handleChange}
                />
                {errorstwo.lastGradeCompleted && <p className="error text-red-500">{errorstwo.lastGradeCompleted}</p>}
            </div>

            <div className="col-span-2">
                <h2 className="font-bold text-lg">Documents</h2>
            </div>

            <div className="col-span-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="personalDocuments"
                        name="personalDocuments"
                        className="mr-2"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="personalDocuments">Personal Documents</label>
                </div>
                {showPersonalDropdown && (
                    <div className="col-span-2">
                        <label htmlFor="selectDocuments">Select Personal Document</label>
                        <select
                            id="selectDocuments"
                            name="selectDocuments"
                            className="input-field bg-[#eceff7]"
                            onChange={handleDocumentSelect}
                        >
                            <option value="">Select Documents</option>
                            <option value="Student AADHAAR Card">Student AADHAAR Card</option>
                            <option value="Father AADHAAR Card">Father AADHAAR Card</option>
                            <option value="Mother AADHAAR Card">Mother AADHAAR Card</option>
                            <option value="Mother Bank Passbook Front Page">Mother Bank Passbook Front Page</option>
                            <option value="Ration Card">Ration Card</option>
                        </select>
                    </div>
                )}
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="academicDocuments"
                        name="academicDocuments"
                        className="mr-2"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="academicDocuments">Academic Documents</label>
                </div>
                {showAcademicDropdown && (
                    <div className="col-span-2">
                        <label htmlFor="selectDocuments">Select Academic Document</label>
                        <select
                            id="selectDocuments"
                            name="selectDocuments"
                            className="input-field bg-[#eceff7]"
                            onChange={handleDocumentSelect}
                        >
                            <option value="">Select Documents</option>
                            <option value="Study/Conduct Certificate">Study/Conduct Certificate</option>
                            <option value="Transfer Certificate">Transfer Certificate</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="col-span-2">
                <label htmlFor="uploadDocument">Upload Document</label>
                <input
                    type="file"
                    id="uploadDocument"
                    name="uploadDocument"
                    className="input-field bg-[#eceff7]"
                    onChange={handleFileUpload}
                />
                <p className="text-sm text-gray-600">Allowed File Types: .pdf, .doc, .jpeg, .jpg</p>
                <p className="text-sm text-gray-600">Maximum File Size Allowed: 20 MB</p>
            </div>

            <div className="lg:col-span-1 bg-white shadow-lg rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2 border-b pb-2">Uploaded Documents</h3>
                <ul className="list-disc pl-5">
                    {uploadedFiles.map((file, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{file.document}: {file.fileName}</span>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => handleDocumentView(file.fileURL)}
                                    className="text-blue-500 hover:text-blue-700 mr-4"
                                >
                                    View
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDocumentRemove(file.document)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Student_step2;
