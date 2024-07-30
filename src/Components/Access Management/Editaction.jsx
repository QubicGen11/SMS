import React, { useState, useEffect, useRef } from 'react';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Editaction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const headerRef = useRef(null);
  const greetingRef = useRef(null);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Sidebar toggled:", sidebarOpen);
  };

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('rolesData')) || [];
    setRoles(storedRoles);

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
  }, []);

  const handleRemoveRole = (roleToRemove) => {
    const updatedRoles = roles.filter(role => role.name !== roleToRemove);
    setRoles(updatedRoles);
    localStorage.setItem('rolesData', JSON.stringify(updatedRoles));
  };

  const handleNewRole = () => {
    navigate('/newroles', { state: { from: '/editactions' } });
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
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User & Roles</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username *</label>
                <p className="text-gray-900">admin</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <p className="text-gray-900">admin</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <p className="text-gray-900">admin</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <p className="text-gray-900">dlichatlitiadmins@tetrapak.com</p>
              </div>
              <label className="block text-sm font-medium text-gray-700">Roles</label>
              <div className="flex items-center flex-wrap gap-2 p-2 w-96" style={{ border: 'solid 1px black' }}>
                {roles.map((role, index) => (
                  <div key={index} className="flex items-center">
                    <span className="inline-flex items-center rounded-full text-xs font-medium bg-blue-100 text-blue-800 p-2" >
                      {role.name}
                      <button className="ml-1 text-red-500" onClick={() => handleRemoveRole(role.name)}>x</button>
                    </span>
                  </div>
                ))}
              </div>
              <button className="ml-2 bg-gray-200 text-sm p-2 rounded w-64" onClick={handleNewRole}>+ New role</button>
            </div>
            <hr />
            <div className="flex p-2">
              <button className="text-white p-2  rounded-full bg-[#00274D]" style={{ border: 'solid 1px black' }}>
               
                <a href="/manageroles">  Cancel</a> 
                
                </button>
              <button className="text-white p-2 ml-4 rounded-full bg-[#00274D]" style={{ border: 'solid 1px black' }}>
               
                <a href="/manageroles">  Update</a> 
                
                </button>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Editaction;
