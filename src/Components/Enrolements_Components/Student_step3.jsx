import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Student_step3 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        student: '',
        class: '',
        fees: [
            { id: 1, name: 'Admission Fee', actualFee: '', discussedFee: '' },
            { id: 2, name: 'Tuition Fee', actualFee: '', discussedFee: '' },
            { id: 3, name: 'Transportation Fee', actualFee: '', discussedFee: '' },
            { id: 4, name: 'Books Fee', actualFee: '', discussedFee: '' },
            { id: 5, name: 'Uniform Fee', actualFee: '', discussedFee: '' },
        ],
        paymentType: 'single',
        terms: [
            { term: 'Term 1', amount: '', status: '', checked: false },
            { term: 'Term 2', amount: '', status: '', checked: false },
            { term: 'Term 3', amount: '', status: '', checked: false }
        ],
        showPaymentDetails: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTermChange = (index, field) => (e) => {
        const newTerms = formData.terms.map((term, idx) => {
            if (idx === index) {
                return { ...term, [field]: e.target.value };
            }
            return term;
        });
        setFormData({ ...formData, terms: newTerms });
    };

    const handleCheckboxChange = (index) => (e) => {
        const newTerms = formData.terms.map((term, idx) => {
            if (idx === index) {
                term.checked = e.target.checked;
            }
            return term;
        });
        setFormData(prev => ({ ...prev, terms: newTerms }));
    };

    const handlePaymentTypeChange = (e) => {
        const { value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            paymentType: value,
            showPaymentDetails: false,
            terms: prevData.terms.map(term => ({ ...term, checked: false }))
        }));
    };

    const shouldShowPaymentDetails = formData.terms.some(term => term.checked);

    return (
        <div className={`max-w-2xl mx-auto p-4 ${window.innerWidth >= 1280 ? 'w-full' : ''}`}>
            <h1 className="text-center text-2xl font-semibold mb-5">Student Enrollment Form</h1>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="student" className="block text-sm font-medium text-gray-700">Name of the Student</label>
                        <input type="text" id="student" name="student" value={formData.student} onChange={handleChange} className="mt-1 block bg-[#eceff7] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                        <input type="text" id="class" name="class" value={formData.class} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border bg-[#eceff7] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
                <div>
                    <table className="min-w-full divide-y divide-gray-200 mt-4 lg:w-[66vw] xl:w-[66vw] md:w-[66vw]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S. No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Fee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discussed Fee</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.fees.map((fee, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <input type="text" name={`fees[${index}].actualFee`} className="input-field bg-[#eceff7]" value={fee.actualFee} onChange={(e) => handleChange({ target: { name: `fees[${index}].actualFee`, value: e.target.value } })} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <input type="text" name={`fees[${index}].discussedFee`} className="input-field bg-[#eceff7]" value={fee.discussedFee} onChange={(e) => handleChange({ target: { name: `fees[${index}].discussedFee`, value: e.target.value } })} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className=' p-2 text-sm w-32 xl:w-auto xl:p-3 bg-blue-800 text-white mt-4'>Save Fee Details</button>
                </div>
                <div>
                    <label htmlFor="paymentType" className="block text-xl font-medium text-gray-700">Tuition Fee Payment Type</label>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="paymentType" value="single" checked={formData.paymentType === 'single'} onChange={handlePaymentTypeChange} />
                            <span className="ml-2">Single Payment</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input type="radio" className="form-radio" name="paymentType" value="termwise" checked={formData.paymentType === 'termwise'} onChange={handlePaymentTypeChange} />
                            <span className="ml-2">Term Wise Payment</span>
                        </label>
                    </div>
                </div>
                {formData.paymentType === 'termwise' && (
                    <div>
                        <table className="min-w-full divide-y divide-gray-200 mt-4 xl:w-[66vw]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S. No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terms</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {formData.terms.map((term, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{term.term}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <input type="text" className="input-field bg-[#eceff7]" value={term.amount} onChange={handleTermChange(index, 'amount')} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <input type="text" className="input-field bg-[#eceff7]" value={term.status} onChange={handleTermChange(index                                             , 'status')} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <input type="checkbox" className="form-checkbox" checked={term.checked} onChange={handleCheckboxChange(index)} />
                                        </td>
                                    </tr>
                                </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                        {shouldShowPaymentDetails && (
                            <div className="mt-4">
                                <table className="min-w-full divide-y divide-gray-200 mt-4">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S. No</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {formData.terms.map((term, index) => term.checked && (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tuition Fee {index+1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{term.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4 flex justify-end">
                                    <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-md">Collect Fee</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Student_step3;