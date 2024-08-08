import React, { useState, useEffect, useRef } from 'react';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineGroup } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import axios from 'axios';

const Managemain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [assignRolesDropdownOpen, setAssignRolesDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupSearchTerm, setGroupSearchTerm] = useState("");
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState(""); // State to hold selected group name
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [offCanvasOpen, setOffCanvasOpen] = useState(false); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    groupId: '',
    groupName: ''
  });

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

    tl.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      stagger: 0.2,
      ease: 'ease-in-out'
    });

    tl.from(greetingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3');

    tl.from(gridRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3');

    tl.from(dbMainRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.2
    }, '-=0.3');

    const initialData = [
      { name: "Admin Admin", username: "admin", email: "admin@example.com", designation: "Manager", roles: "Administrator", roleAssignment: "Direct assignment", branchesList: "Disabled", status: "Disabled" },
      { name: "User User", username: "user", email: "user@example.com", designation: "Developer", roles: "User", roleAssignment: "Direct assignment", branchesList: "Enabled", status: "Enabled" },
      { name: "Guest Guest", username: "guest", email: "guest@example.com", designation: "Visitor", roles: "Guest", roleAssignment: "Direct assignment", branchesList: "Disabled", status: "Disabled" }
    ];

    setOriginalData(initialData);
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:3000/sms/allusers')
      .then(response => response.json())
      .then(data => {
        const first20Users = data.slice(0, 20);
        setTableData(first20Users);
        setOriginalData(first20Users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const fetchGroupSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sms/allgroups', {
          params: { search: groupSearchTerm }
        });
        const data = response.data;
        setGroupSuggestions(data.map(group => ({ id: group.id, groupName: group.groupName })));
      } catch (error) {
        console.error('Error fetching group names:', error);
      }
    };

    if (groupSearchTerm) {
      fetchGroupSuggestions();
    } else {
      setGroupSuggestions([]);
    }
  }, [groupSearchTerm]);

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

  const handleGroupSearch = (event) => {
    setGroupSearchTerm(event.target.value);
  };

  const handleUserSelect = (group) => {
    setSelectedGroupName(group.groupName); // Set selected group name
    setFormData({ ...formData, groupId: group.id, groupName: group.groupName }); // Update form data with group info
    setGroupSearchTerm(''); // Clear the input field
    setGroupSuggestions([]); // Hide suggestions after selection
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/sms/admininvite', formData);
      console.log('User invited:', response.data);
      // Handle success (e.g., show success message, reset form, etc.)
    } catch (error) {
      console.error('Error inviting user:', error);
      // Handle error (e.g., show error message)
    }
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
                <Link to="" className="text-[#00274D] bg-gray-200 px-4 py-2 rounded-md">Users</Link>
                <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 mt-1">
                  Manage user roles
                </div>
              </div>
              <div className="relative group">
                <Link to="/managegroups" className="text-[#00274D] hover:bg-gray-200 ml-3 px-4 py-2 rounded-md">Groups</Link>
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
                  {["All", "Active", "Disabled"].map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleFilterChange(option)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                  <div
                    onClick={handleResetFilter}
                    className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    Reset Filter
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
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
      {/* Off-canvas sidebar */}
      <div className={`fixed top-0 right-0 w-64 mt-28 h-full bg-white shadow-lg transform ${offCanvasOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Add User</h3>
          <button onClick={() => setOffCanvasOpen(false)} className="text-gray-600">
            Close
          </button>
        </div>
        <div className="p-4 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleInputChange} 
                className="mt-1 p-2 block w-full border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Group Membership</label>
              <input
                type="text"
                value={groupSearchTerm}
                onChange={handleGroupSearch}
                className="mt-1 p-2 block w-full border rounded-md"
              />
              {groupSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg max-h-48 overflow-auto">
                  {groupSuggestions.map((group, index) => (
                    <li
                      key={index}
                      onClick={() => handleUserSelect(group)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {group.groupName}
                    </li>
                  ))}
                </ul>
              )}
              {selectedGroupName && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected Group: <span className="font-medium">{selectedGroupName}</span>
                </div>
              )}
            </div>
            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Managemain;
