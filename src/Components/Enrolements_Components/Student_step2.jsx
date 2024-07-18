import React from 'react';

const Student_step2 = ({ formData, handleChange, errorstwo }) => {
    return (
        <div>
            <div>
                <label htmlFor="class">Class*</label>
                <input type="text" id="class" name="class" className="input-field bg-[#eceff7]" value={formData.class} onChange={handleChange} />
                {errorstwo.class && <p className="error text-red-500">{errorstwo.class}</p>}
            </div>
            <div>
                <label htmlFor="modeOfTransportation">Mode of Transportation*</label>
                <input type="text" id="modeOfTransportation" name="modeOfTransportation" className="input-field bg-[#eceff7]" value={formData.modeOfTransportation} onChange={handleChange} />
                {errorstwo.modeOfTransportation && <p className="error text-red-500">{errorstwo.modeOfTransportation}</p>}
            </div>
            <div>
                <label htmlFor="identificationMarks1">Identification Marks 1*</label>
                <input type="text" id="identificationMarks1" name="identificationMarks1" className="input-field bg-[#eceff7]" value={formData.identificationMarks1} onChange={handleChange} />
                {errorstwo.identificationMarks1 && <p className="error text-red-500">{errorstwo.identificationMarks1}</p>}
            </div>
            <div>
                <label htmlFor="identificationMarks2">Identification Marks 2</label>
                <input type="text" id="identificationMarks2" name="identificationMarks2" className="input-field bg-[#eceff7]" value={formData.identificationMarks2} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="studyCertificate">Study/Conduct Certificate*</label>
                <input type="file" id="studyCertificate" name="studyCertificate" className="input-field bg-[#eceff7]" onChange={handleChange} />
                {errorstwo.studyCertificate && <p className="error text-red-500">{errorstwo.studyCertificate}</p>}
            </div>
            <div>
                <label htmlFor="transferCertificate">Transfer Certificate*</label>
                <input type="file" id="transferCertificate" name="transferCertificate" className="input-field bg-[#eceff7]" onChange={handleChange} />
                {errorstwo.transferCertificate && <p className="error text-red-500">{errorstwo.transferCertificate}</p>}
            </div>
            <div>
                <label htmlFor="dateOfJoining">Date of Joining*</label>
                <input type="date" id="dateOfJoining" name="dateOfJoining" className="input-field bg-[#eceff7]" value={formData.dateOfJoining} onChange={handleChange} />
                {errorstwo.dateOfJoining && <p className="error text-red-500">{errorstwo.dateOfJoining}</p>}
            </div>
        </div>
    );
};

export default Student_step2;
