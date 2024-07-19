import React, { useState } from 'react';

const Students_Enroll_dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block  w-[50vw] ml-72  ">
            <div className='flex'>

                <p className='xl:w-[22vw] mt-2 '>
                    Want to change Registration Type ?
                </p>
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center xl:w-[20vw] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-800 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                >
                    Select Registration Type
                    <svg
                        className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 00-.707.293l-5 5a1 1 0 101.414 1.414L10 5.414l4.293 4.293a1 1 0 001.414-1.414l-5-5A1 1 0 0010 3z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Student
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Teacher
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Option 3
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students_Enroll_dropdown;