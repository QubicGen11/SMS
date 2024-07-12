import React from 'react';
import {
  FaBars, FaBell, FaBullhorn, FaCalendarAlt, FaChalkboardTeacher,
  FaClipboardCheck, FaCog, FaFileAlt, FaHome, FaTimes, FaUserGraduate, FaUsers
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidemenu = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-[#00274D] text-white transform ${
        sidebarOpen ? 'w-64' : 'w-1 md:w-20'
      } transition-all duration-300 ease-in-out md:block  overflow-y-auto`}
    >
      <div className="flex items-center justify-between h-16 p-4 bg-[#00274D]">
        {sidebarOpen && (
          <img
            src="https://res.cloudinary.com/defsu5bfc/image/upload/v1715348582/og_6_jqnrvf.png"
            alt="QubicGen Logo"
            className="h-14 mt-6 w-auto"
          />
        )}
        <button className="text-white" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4 mt-5">
        <Link to="/dashboard" className={`flex items-center p-2 rounded-md ${isActive('/dashboard') ? 'bg-blue-700 text-black' : 'hover:bg-blue-600'}`}>
          <FaHome size={24} />
          {sidebarOpen && <span className="ml-2">Dashboard</span>}
        </Link>
        <Link to="/students" className={`flex items-center p-2 rounded-md ${isActive('/students') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaUserGraduate size={24} />
          {sidebarOpen && <span className="ml-2">Students</span>}
        </Link>
        <Link to="/teachers" className={`flex items-center p-2 rounded-md ${isActive('/teachers') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaChalkboardTeacher size={24} />
          {sidebarOpen && <span className="ml-2">Teachers</span>}
        </Link>
        <Link to="/attendance" className={`flex items-center p-2 rounded-md ${isActive('/attendance') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaClipboardCheck size={24} />
          {sidebarOpen && <span className="ml-2">Attendance</span>}
        </Link>
        <Link to="/marks" className={`flex items-center p-2 rounded-md ${isActive('/marks') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaFileAlt size={24} />
          {sidebarOpen && <span className="ml-2">Marks</span>}
        </Link>
        <Link to="/staff" className={`flex items-center p-2 rounded-md ${isActive('/staff') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaUsers size={24} />
          {sidebarOpen && <span className="ml-2">Staff</span>}
        </Link>
        <Link to="/leaves" className={`flex items-center p-2 rounded-md ${isActive('/leaves') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaCalendarAlt size={24} />
          {sidebarOpen && <span className="ml-2">Leaves</span>}
        </Link>
        <Link to="/announcements" className={`flex items-center p-2 rounded-md ${isActive('/announcements') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaBullhorn size={24} />
          {sidebarOpen && <span className="ml-2">Announcements</span>}
        </Link>
        <Link to="/settings" className={`flex items-center p-2 rounded-md ${isActive('/settings') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaCog size={24} />
          {sidebarOpen && <span className="ml-2">Settings</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidemenu;