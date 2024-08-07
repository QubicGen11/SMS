import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Addgroup = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGroupRecommendations, setShowGroupRecommendations] = useState(false);
  const headerRef = useRef(null);
  const greetingRef = useRef(null);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

    // Fetch roles data from API
    axios.get('http://localhost:3000/sms/allroles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });

    // Fetch groups data from API
    axios.get('http://localhost:3000/sms/allgroups')
      .then(response => {
        setGroups(response.data);
        setFilteredGroups(response.data);
      })
      .catch(error => {
        console.error('Error fetching groups data:', error);
      });
  }, []);

  useEffect(() => {
    // Filter groups based on search query
    if (searchQuery) {
      setFilteredGroups(groups.filter(group =>
        group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredGroups(groups);
    }
  }, [searchQuery, groups]);

  const handleRemoveRole = (roleToRemove) => {
    const updatedRoles = selectedRoles.filter(role => role !== roleToRemove);
    setSelectedRoles(updatedRoles);
  };

  const handleNewRole = () => {
    navigate('/newroles', { state: { from: '/addgroup' } });
  };

  const handleRoleLabelClick = () => {
    setShowRolesDropdown(!showRolesDropdown);
  };

  const handleRoleCheckboxChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(selectedRole => selectedRole !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleGroupInputFocus = () => {
    setShowGroupRecommendations(true);
  };

  const handleGroupInputBlur = () => {
    // Delay hiding recommendations to allow clicks
    setTimeout(() => setShowGroupRecommendations(false), 200);
  };

  const handleGroupSelect = (group) => {
    setSearchQuery(group.groupName);
    setShowGroupRecommendations(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Your form submission logic goes here
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
          <div className="bg-white p-8 rounded-lg shadow-md relative">
            <h2 className="text-xl font-semibold mb-4">Add Group</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Domain name *</label>
                  <input type="text" className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md" defaultValue="tp1" />
                </div>
                <div className='flex items-end w-[30vw] relative'>
                  <div className='flex-grow'>
                    <label className="block text-sm font-medium text-gray-700">Search for a group *</label>
                    <input
                      type="search"
                      placeholder='Search for a group'
                      className='mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleGroupInputFocus}
                      onBlur={handleGroupInputBlur}
                    />
                    {showGroupRecommendations && (
                      <div className="mt-2 flex flex-col gap-2 p-2 w-full border border-gray-300 rounded-md absolute bg-white z-10">
                        {filteredGroups.length > 0 ? (
                          filteredGroups.map((group) => (
                            <div key={group.id} className="flex items-center cursor-pointer p-2 hover:bg-gray-100" onClick={() => handleGroupSelect(group)}>
                              {group.groupName}
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-gray-500">No groups found</div>
                        )}
                      </div>
                    )}
                  </div>
                  <button className="ml-2 bg-blue-500 text-white p-2 w-36 text-xs rounded self-end" onClick={() => {/* Manage accounts functionality */}}>Manage Accounts</button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Roles</label>
                  <div onClick={handleRoleLabelClick} className="flex items-center flex-wrap gap-2 p-2 w-full border border-gray-300 rounded-md cursor-pointer">
                    {selectedRoles.length === 0 ? (
                      <span className="text-gray-500">Select roles</span>
                    ) : (
                      selectedRoles.map((role, index) => (
                        <div key={index} className="flex items-center">
                          <span className="inline-flex items-center rounded-full text-xs font-medium bg-blue-100 text-blue-800 p-2">
                            {role}
                            <button className="ml-1 text-red-500" onClick={(e) => { e.stopPropagation(); handleRemoveRole(role); }}>x</button>
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  {showRolesDropdown && (
                    <div className="mt-2 flex flex-col gap-2 p-2 w-full border border-gray-300 rounded-md">
                      {roles.map((role, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`role-${index}`}
                            className="mr-2"
                            checked={selectedRoles.includes(role.name)}
                            onChange={() => handleRoleCheckboxChange(role.name)}
                          />
                          <label htmlFor={`role-${index}`} className="inline-flex items-center text-sm">
                            {role.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="mt-2 bg-gray-200 text-sm p-2 rounded" onClick={handleNewRole}>+ New role</button>
                </div>
              </div>
              <hr />
              <div className="flex p-2">
                <button className="text-white p-2 rounded bg-blue-500 text-center mx-1" type="submit">Add</button>
                <button className="text-white p-2 rounded bg-red-500 text-center mx-1">Cancel</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Addgroup;
