import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";
import { FaSearch, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineGroup } from 'react-icons/ai';

const ManageGroups = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [assignRolesDropdownOpen, setAssignRolesDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [groupSearchTerm, setGroupSearchTerm] = useState(""); // Separate state for group search
  const [userSearchTerm, setUserSearchTerm] = useState(""); // Separate state for user search
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [offCanvasOpen, setOffCanvasOpen] = useState(false); // Added state for off-canvas sidebar
  const [currentGroupName, setCurrentGroupName] = useState(''); // Added state for current group name
  const [userSuggestions, setUserSuggestions] = useState([]); // Added state for user suggestions
  const [selectedUsers, setSelectedUsers] = useState([]); // Added state for selected users
  const [userIds, setUserIds] = useState([]); // Added state for user IDs
  const modalRef = useRef(null);
  const headerRef = useRef(null);
  const greetingRef = useRef(null);
  const gridRef = useRef(null);
  const dbMainRef = useRef(null);
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef(null); // Ref for debounce timeout

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

    // Fetch groups from API
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/sms/allgroups');
        const data = await response.json();
        const formattedData = data.map(group => ({
          name: group.groupName,
          id: group.id,
          groupType: group.groupType
        }));
        setTableData(formattedData);
        setOriginalData(formattedData);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    // Fetch user names from API
    const fetchUserNames = async (searchTerm = '') => {
      try {
        const response = await axios.get('http://localhost:3000/sms/allusers', {
          params: { search: searchTerm }
        });
        const data = response.data;
        setUserSuggestions(data.map(user => ({ id: user.id, name: user.name })));
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    if (userSearchTerm) {
      fetchUserNames(userSearchTerm);
    } else {
      setUserSuggestions([]);
    }
  }, [userSearchTerm]);

  const handleActionClick = (index, action) => {
    if (action === 'edit') {
      setCurrentGroupName(tableData[index].name);
      setOffCanvasOpen(true);
    } else if (action === 'delete') {
      const updatedData = tableData.filter((_, i) => i !== index);
      setTableData(updatedData);
      setOriginalData(updatedData);
    }
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

  const handleGroupSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setGroupSearchTerm(value);

    const filteredData = originalData.filter(item => 
      item.name.toLowerCase().includes(value)
    );
    setTableData(filteredData);
  };

  const handleUserSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setUserSearchTerm(value);

    // Implement debounce to reduce API calls
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setUserSearchTerm(value);
    }, 300); // Adjust the delay as needed
  };
  
  const handleUserSelect = (user) => {
    if (!selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
      setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, user]);
      setUserIds(prevUserIds => [...prevUserIds, user.id]);
    }
    setUserSearchTerm(''); // Clear the input field but keep the focus
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3000/sms/assigngroup', {
        userIds: userIds,
        groupName: currentGroupName
      });
      setOffCanvasOpen(false);
      console.log('Group successfully assigned.');
    } catch (error) {
      console.error('Error assigning group:', error);
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
        <h2 className="font-bold text-3xl mt-7">Groups</h2>
        <div className="flex flex-col px-4">
          <div className="flex justify-between my-4">
            <div className='flex justify-center items-center'>
              <div className="relative group ">
                <Link to="/managemain" className="text-[#00274D] hover:bg-gray-200 px-4 py-2 rounded-md">Users</Link>
                <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 mt-1">
                  Manage user roles
                </div>
              </div>
              <div className="relative group">
                <Link to="/managegroups" className="text-[#00274D] bg-gray-200 ml-3 px-4 py-2 rounded-md">Groups</Link>
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
                <button onClick={() => setOffCanvasOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md">+ Add Group</button>
                {assignRolesDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                    <Link to="/adduser" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <AiOutlineUser className="mr-2" /> User
                    </Link>
                    <Link to="/addgroup" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <AiOutlineGroup className="mr-2" /> Group
                    </Link>
                  </div>
                )}
              </div>
              <button onClick={handleFilterDropdownToggle} className="bg-gray-300 text-black px-4 py-2 rounded-md">Filter</button>
              {filterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <button onClick={() => handleFilterChange('User')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">User</button>
                  <button onClick={() => handleFilterChange('Group')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Group</button>
                  <button onClick={handleResetFilter} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Reset</button>
                </div>
              )}
            </div>
          </div>
          <div ref={greetingRef} className="flex flex-col mt-2">
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search Groups"
                value={groupSearchTerm}
                onChange={handleGroupSearch}
                className="pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.name}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.groupType}</td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right text-sm leading-5 font-medium">
                        <div className="relative">
                          <button onClick={() => setDropdownOpen(index)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <SlOptionsVertical className="w-5 h-5" />
                          </button>
                          {dropdownOpen === index && (
                            <div ref={modalRef} className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-20">
                              <button onClick={() => handleActionClick(index, 'edit')} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <FaPencilAlt className="mr-2" /> Edit
                              </button>
                              <button onClick={() => handleActionClick(index, 'delete')} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <FaTrashAlt className="mr-2" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Off-canvas sidebar */}
        {offCanvasOpen && (
          <div className="fixed inset-0 flex justify-end z-40">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
            <div className="relative w-96 bg-white shadow-lg h-full">
              <div className="px-4 py-3 bg-gray-800 text-white text-lg font-semibold flex justify-between">
                <h2>Add Group</h2>
                <button onClick={() => setOffCanvasOpen(false)}>&times;</button>
              </div>
              <div className="p-4">
                <label className="block mb-2">Group Name</label>
                <input
                  type="text"
                  value={currentGroupName}
                  onChange={(e) => setCurrentGroupName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="relative mt-4">
                  <label className="block mb-2">Add Users</label>
                  <input
                    type="text"
                    value={userSearchTerm} // Use user search term state
                    onChange={handleUserSearch}
                    className="w-full px-3 py-2 border rounded"
                  />
                  {userSearchTerm && (
                    <ul className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg max-h-48 overflow-auto">
                      {userSuggestions.map((user, index) => (
                        <li
                          key={index}
                          onClick={() => handleUserSelect(user)}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {user.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className='text-right p-2 text-blue-600 cursor-pointer'>View all users</p>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Selected Users</h4>
                  <ul className="list-disc pl-5">
                    {selectedUsers.map((user, index) => (
                      <li key={index} className='p-2 '>{user.name}</li>
                    ))}
                  </ul>
                </div>
                <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageGroups;
