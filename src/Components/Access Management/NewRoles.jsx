import React, { useState, useEffect, useRef } from 'react';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';

const NewRoles = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [roleName, setRoleName] = useState("");
  const [originalRoleName, setOriginalRoleName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const headerRef = useRef(null);
  const greetingRef = useRef(null);
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Sidebar toggled:", sidebarOpen);
  };

  const handleCheckboxChange = (feature, permissionType) => {
    setPermissions((prevPermissions) => {
      const updatedPermissions = {
        ...prevPermissions,
        [feature]: {
          ...prevPermissions[feature],
          [permissionType]: !prevPermissions[feature]?.[permissionType],
        },
      };
      return updatedPermissions;
    });
  };

  const handleSaveRole = () => {
    if (!roleName) {
      alert('Role Name is required.');
      return;
    }

    const rolesData = JSON.parse(localStorage.getItem('rolesData')) || [];
    const newRole = {
      name: roleName,
      permissions: permissions
    };

    if (isEditMode) {
      const updatedRoles = rolesData.map(role =>
        role.name === originalRoleName ? newRole : role
      );
      localStorage.setItem('rolesData', JSON.stringify(updatedRoles));
    } else {
      rolesData.push(newRole);
      localStorage.setItem('rolesData', JSON.stringify(rolesData));
    }

    console.log("Role saved:", newRole);
    alert('Form submitted successfully!');
    navigate(location.state?.from || '/roles'); // Redirect to previous page or Roles page
  };

  useEffect(() => {
    const editRole = JSON.parse(localStorage.getItem('editRole'));
    if (editRole) {
      setRoleName(editRole.name);
      setOriginalRoleName(editRole.name); // Store original role name to identify the role in the list
      setPermissions(editRole.permissions);
      setIsEditMode(true);
      localStorage.removeItem('editRole');
    }

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

  const features = [
    'Timetable', 'Attendance', 'View Marks', 'Assignments', 'Announcements',
    'Student Profiles', 'Teacher Profiles', 'Library', 'Online Exams', 'Exam Schedule',
    'Academic Calendar', 'Payments', 'Teacher Salaries', 'Financial Reports',
    'School Analytics', 'Events Calendar', 'Enter Marks', 'Capture Attendance',
    'Edit Student Academic Profile', 'Create Announcements', 'Edit Timetable',
    'Create Assignments', 'Edit Attendance Records', 'Create Online Exams',
    'Edit Exam Schedule', 'Edit Academic Calendar', 'Manage Library Inventory',
    'Process Payments', 'Generate Financial Reports', 'Edit Teacher Salaries',
    'Generate School Analytics Reports', 'Create Events', 'Edit Announcements',
    'Manage User Roles', 'Access Student Attendance History', 'Manage Teacher Assignments'
  ];

  const permissionTypes = ['View', 'Create', 'Edit', 'Delete'];

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
            <h1 className="font-bold text-3xl">{isEditMode ? "Edit Role" : "Add New Role"}</h1>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700"> Role Name <span className='text-red-600'>*</span> </label>
              <input 
                type="text" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature Name</th>
                  {permissionTypes.map((type) => (
                    <th key={type} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{type}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {features.map((feature) => (
                  <tr key={feature}>
                    <td className="px-6 py-4 whitespace-nowrap">{feature}</td>
                    {permissionTypes.map((type) => (
                      <td key={type} className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={permissions[feature]?.[type] || false}
                          onChange={() => handleCheckboxChange(feature, type)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-end">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2" onClick={() => navigate(location.state?.from || '/roles')}>Cancel</button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleSaveRole}
              >
                {isEditMode ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewRoles;
