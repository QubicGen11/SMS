import React, { useState, useEffect, useRef } from 'react';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { MdModeEdit, MdDelete } from "react-icons/md";
import axios from 'axios'; // Make sure axios is installed

const Roles = () => {
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

  const handleEditRole = (role) => {
    localStorage.setItem('editRole', JSON.stringify(role));
    navigate('/newroles', { state: { from: '/roles' } }); // Redirect to NewRole page for editing
  };

  const handleDeleteRole = (roleId) => {
    const updatedRoles = roles.filter(role => role.id !== roleId);
    setRoles(updatedRoles);
    localStorage.setItem('rolesData', JSON.stringify(updatedRoles));
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sms/allroles');
      const fetchedRoles = response.data;
      setRoles(fetchedRoles);
      localStorage.setItem('rolesData', JSON.stringify(fetchedRoles));
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();

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
            <h1 className="font-bold text-3xl">Roles Management</h1>
          </div>
          <div className="flex justify-between my-4">
            <Link to="/Manageroles" className="bg-blue-600 text-white px-4 py-2 rounded-md">Assign roles</Link>
            <Link to="/newroles" className="bg-blue-600 text-white ml-3 px-4 py-2 rounded-md">Create New Role</Link>
          </div>
          <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <MdModeEdit className="mr-2 cursor-pointer" onClick={() => handleEditRole(role)} />
                      <MdDelete className="cursor-pointer" onClick={() => handleDeleteRole(role.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Roles;
