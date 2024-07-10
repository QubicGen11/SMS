import React, { useState } from 'react';
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
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#00274D] text-white transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex items-center justify-between h-16 p-4 bg-[#00274D]">
        <img
          src="https://res.cloudinary.com/defsu5bfc/image/upload/v1715348582/og_6_jqnrvf.png"
          alt="QubicGen Logo"
          className="h-14 mt-6 w-auto"
        />
        <button className="text-white md:hidden" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4 mt-5">
        <Link to="/dashboard" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/dashboard') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaHome />
          <span>Dashboard</span>
        </Link>
        <Link to="/students" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/students') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaUserGraduate />
          <span>Students</span>
        </Link>
        <Link to="/teachers" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/teachers') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaChalkboardTeacher />
          <span>Teachers</span>
        </Link>
        <Link to="/attendance" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/attendance') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaClipboardCheck />
          <span>Attendance</span>
        </Link>
        <Link to="/marks" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/marks') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaFileAlt />
          <span>Marks</span>
        </Link>
        <Link to="/staff" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/staff') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaUsers />
          <span>Staff</span>
        </Link>
        <Link to="/leaves" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/leaves') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaCalendarAlt />
          <span>Leaves</span>
        </Link>
        <Link to="/announcements" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/announcements') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaBullhorn />
          <span>Announcements</span>
        </Link>
        <Link to="/settings" className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/settings') ? 'bg-white text-[#00274D]' : 'hover:bg-blue-600'}`}>
          <FaCog />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidemenu;