import React, { useState, useEffect, useRef } from 'react';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineGroup } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';

const Manageroles = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [assignRolesDropdownOpen, setAssignRolesDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const modalRef = useRef(null);
  const headerRef = useRef(null);
  const greetingRef = useRef(null);
  const gridRef = useRef(null);
  const dbMainRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Sidebar toggled:", sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDropdownOpen(null);
        setAssignRolesDropdownOpen(false);
        setFilterDropdownOpen(false);
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

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:3000/sms/allusers')
      .then(response => response.json())
      .then(data => {
        // Set the table data to the first 20 users
        const first20Users = data.slice(0, 20);
        setTableData(first20Users);
        setOriginalData(first20Users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleActionClick = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleAssignRolesDropdownToggle = () => {
    setAssignRolesDropdownOpen(!assignRolesDropdownOpen);
  };

  const handleFilterDropdownToggle = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setFilterDropdownOpen(false);
  };

  const handleResetFilter = () => {
    setFilter(null);
    setTableData(originalData);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = originalData.filter(item => 
      item.name.toLowerCase().includes(value) || 
      item.email.toLowerCase().includes(value)
    );
    setTableData(filteredData);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidemenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main content */}
      <div className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}
        <div ref={headerRef} className="sticky top-0 bg-white z-10">
          <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <h2 className="font-bold text-3xl mt-7">Assign Roles</h2>
        <div className="flex flex-col px-4">
          <div className="flex justify-between my-4 ">
            <div className='flex justify-center items-center'>
              <div className="relative group ">
                <Link to="/manageroles" className="text-[#00274D] bg-gray-200 px-4 py-2 rounded-md">Assign roles</Link>
                <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 mt-1">
                  Manage user roles
                </div>
              </div>
              <div className="relative group">
                <Link to="/roles" className="text-[#00274D] hover:bg-gray-200 ml-3 px-4 py-2 rounded-md">Roles</Link>
                <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 mt-1">
                  View roles list
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/managemain" className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2">Manage Accounts & Groups</Link>
              <Link to="/checkroles" className="bg-gray-300 text-black px-4 py-2 rounded-md">Check roles & permissions</Link>
              <div className="relative">
                <button onClick={handleAssignRolesDropdownToggle} className="bg-blue-600 text-white px-4 py-2 rounded-md">Assign roles</button>
                {assignRolesDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                    <Link to="/adduser" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <AiOutlineUser className="mr-2" /> User
                    </Link>
                    <Link to="/addgroup" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <AiOutlineGroup className="mr-2" /> Group
                    </Link>
                    <Link to="/addrobot" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <AiOutlineUser className="mr-2" /> Robot account
                    </Link>
                    <Link to="/addexternalapp" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FiExternalLink className="mr-2" /> External app
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name or Email"
                className="pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
            <div className="relative">
              <button onClick={handleFilterDropdownToggle} className="bg-gray-300 text-black px-4 py-2 rounded-md">Filters</button>
              {filterDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  {["Name", "Username", "Email", "Designation", "Roles", "RoleAssignment", "BranchesList", "Status"].map((filterOption, index) => (
                    <button key={index} onClick={() => handleFilterChange(filterOption)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      {filterOption}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={handleResetFilter} className="bg-gray-300 text-black px-4 py-2 rounded-md">Reset Filters</button>
          </div>
          <div ref={gridRef} className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="w-full bg-gray-300 text-black border">
                  <th className="py-2 px-4 border">Name</th>
                   <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Designation</th>
                  <th className="py-2 px-4 border">Roles</th>
                   <th className="py-2 px-4 border">Branches Name</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="w-full">
                    <td className="py-2 px-4 border">{row.name}</td>
                     <td className="py-2 px-4 border">{row.email}</td>
                    <td className="py-2 px-4 border">{row.designation}</td>
                    <td className="py-2 px-4 border">{row.roles}</td>
                    <td className="py-2 px-4 border">{row.branchesList}</td>
                    <td className="py-2 px-4 border">{row.status}</td>
                    <td className="py-2 px-4 border relative">
                      <button onClick={() => handleActionClick(index)} className="p-2"><SlOptionsVertical /></button>
                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                          <Link to={`/edit/${row.id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</Link>
                          <Link to={`/delete/${row.id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Delete</Link>
                          <Link to={`/delete/${row.id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Disable</Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manageroles;
