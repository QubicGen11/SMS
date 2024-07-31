import React, { useState, useEffect, useRef } from 'react';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineGroup } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';

const ManageGroups = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [assignRolesDropdownOpen, setAssignRolesDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [offCanvasOpen, setOffCanvasOpen] = useState(false); // Added state for off-canvas sidebar
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

    // Set initial table data
    const initialData = [
      { name: "Admin Admin", username: "admin", email: "admin@example.com", designation: "Manager", roles: "Administrator", roleAssignment: "Direct assignment", branchesList: "Disabled", status: "Disabled" },
      { name: "User User", username: "user", email: "user@example.com", designation: "Developer", roles: "User", roleAssignment: "Direct assignment", branchesList: "Enabled", status: "Enabled" },
      { name: "Guest Guest", username: "guest", email: "guest@example.com", designation: "Visitor", roles: "Guest", roleAssignment: "Direct assignment", branchesList: "Disabled", status: "Disabled" }
    ];
    setTableData(initialData);
    setOriginalData(initialData);
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
        <h2 className="font-bold text-3xl mt-7">Users</h2>
        <div className="flex flex-col px-4">
          <div className="flex justify-between my-4 ">
            <div className='flex justify-center items-center'>
              <div className="relative group ">
                <Link to="" className="text-[#00274D] hover:bg-gray-200 px-4 py-2 rounded-md">Users</Link>
                <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 mt-1">
                  Manage user roles
                </div>
              </div>
              <div className="relative group">
                <Link to="/roles" className="text-[#00274D] hover:bg-gray-200 ml-3 px-4 py-2 rounded-md">Groups</Link>
                <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 mt-1">
                  View roles list
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
            <div className="relative">
                <a href="/manageroles">

                <button onClick={handleAssignRolesDropdownToggle} className="bg-blue-600 text-white px-4 py-2 rounded-md">Assign roles</button>
                
                
                
                </a>
                
              </div>
              <Link to="/checkroles" className="bg-gray-300 text-black px-4 py-2 rounded-md">Check roles & permissions</Link>
              <div className="relative">
                <button onClick={() => setOffCanvasOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md">+ Add User</button>
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
            <button onClick={handleResetFilter} className="bg-gray-300 text-black px-4 py-2 rounded-md">Reset to Default</button>
          </div>
        </div>
        {/* Main section */}
        <main className="flex flex-col flex-1 p-4 overflow-y-auto bg-gray-100">
          <div>
            <div ref={gridRef} >
              <div className="relative bottom-8 shadow rounded-lg p-4 overflow-x-auto h-[70vh]">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${filter && filter !== "Name" ? "hidden" : ""}`}>Group Name</th>
                   
                     
                      <th className={`px-6 py-3  relative left-80  text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${filter ? "hidden" : ""}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y ">
                    {tableData.map((row, index) => (
                      <tr key={index} className=''>
                        <td className={`px-6 py-4 whitespace-nowrap ${filter && filter !== "Name" ? "hidden" : ""}`}>{row.name}</td>
                  
                        
                        <td className={`relative px-6 py-4 whitespace-nowrap left-80 cursor-pointer ${filter ? "hidden" : ""}`} onClick={() => handleActionClick(index)}>
                          <SlOptionsVertical />
                          {dropdownOpen === index && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                              <a href="/editactions" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</a>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => console.log('Check roles & permissions clicked')}>Check roles & permissions</button>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => console.log('View profile clicked')}>View profile</button>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => console.log('Activate clicked')}>Activate</button>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => console.log('Deactivate clicked')}>Deactivate</button>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => console.log('Remove clicked')}>Remove</button>
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
        </main>
      </div>
      {/* Off-canvas sidebar */}
      <div className={`fixed top-0 right-0 w-64 mt-28 h-full bg-white shadow-lg transform ${offCanvasOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Add User</h3>
          <button onClick={() => setOffCanvasOpen(false)} className="text-gray-600">
            Close
          </button>
        </div>
        <div className="p-4 ">
          {/* Form contents go here */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="mt-1 p-2 block w-full border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="mt-1 p-2 block w-full border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 p-2 block w-full border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="email" className="mt-1 p-2 block w-full border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="email" className="mt-1 p-2 block w-full border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Confirm Password</label>
              <input type="email" className="mt-1 p-2 block w-full border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700"> Group Membership</label>
              <input type="checkbox" className="mt-1 p-2 block w-full border rounded-md" />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageGroups;
