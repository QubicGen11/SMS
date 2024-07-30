import React, { useState, useEffect, useRef } from 'react';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";

const Manageroles = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const headerRef = useRef(null);
  const greetingRef = useRef(null);
  const gridRef = useRef(null);
  const dbMainRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Sidebar toggled:", sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      stagger: 0.2,
      ease: 'ease-in-out'
    });
    // Greeting animation
    tl.from(greetingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3');

    // Grid animation
    tl.from(gridRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3');

    // Dbmain animation
    tl.from(dbMainRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.2
    }, '-=0.3');
  }, []);

  const handleActionClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidemenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main content */}
      <div className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}
        <div ref={headerRef}>
          <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        {/* Main section */}
        <main className="flex flex-col flex-1 p-4 overflow-y-auto justify-start lg:gap-10 bg-gray-100">
          <div ref={greetingRef}>
            <h1 className="font-bold text-3xl">User Management</h1>
          </div>
          <div className="flex justify-between my-4">
            <div>
              <Link to="/assignroles" className=" text-[#00274D] hover:bg-gray-200 px-4 py-2 rounded-md">Assign roles</Link>
              <Link to="/roles" className=" text-[#00274D] hover:bg-gray-200 ml-3 px-4 py-2 rounded-md">Roles</Link>
            </div>
            <div>
              <Link to="/manageaccounts" className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2">Manage Accounts & Groups</Link>
              <Link to="/checkroles" className="bg-gray-300 text-black px-4 py-2 rounded-md">Check roles & permissions</Link>
            </div>
          </div>
          <div className="relative bottom-8 shadow rounded-lg p-4 overflow-x-auto h-[100vh]">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><input type="checkbox" name="" id="" /></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branches List</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Example row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" name="" id="" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">Administrator</td>
                  <td className="px-6 py-4 whitespace-nowrap">Direct assignment</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={handleActionClick}>{<SlOptionsVertical />}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" name="" id="" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">Administrator</td>
                  <td className="px-6 py-4 whitespace-nowrap">Direct assignment</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={handleActionClick}>{<SlOptionsVertical />}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" name="" id="" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">Administrator</td>
                  <td className="px-6 py-4 whitespace-nowrap">Direct assignment</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={handleActionClick}>{<SlOptionsVertical />}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" name="" id="" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">Administrator</td>
                  <td className="px-6 py-4 whitespace-nowrap">Direct assignment</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={handleActionClick}>{<SlOptionsVertical />}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" name="" id="" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">Manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">Administrator</td>
                  <td className="px-6 py-4 whitespace-nowrap">Direct assignment</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap">Disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={handleActionClick}>{<SlOptionsVertical />}</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
            {showModal && (
              <div ref={modalRef} className="absolute bg-white p-6 shadow-md rounded-md" style={{ top: '130px', right: '20px' }}>
                <ul>
                 <a href="/editactions"> <li className="cursor-pointer" onClick={() => console.log('Edit clicked')}> Edit</li> </a> 
                  <li className="cursor-pointer" onClick={() => console.log('Check roles & permissions clicked')}>Check roles & permissions</li>
                  <li className="cursor-pointer" onClick={() => console.log('View profile clicked')}>View profile</li>
                  <li className="cursor-pointer" onClick={() => console.log('Activate clicked')}>Activate</li>
                  <li className="cursor-pointer" onClick={() => console.log('Deactivate clicked')}>Deactivate</li>
                  <li className="cursor-pointer" onClick={() => console.log('Remove clicked')}>Remove</li>
                </ul>
              
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Manageroles;
