import React, { useState } from 'react';
import { FaBars, FaBell, FaBullhorn, FaCalendarAlt, FaChalkboardTeacher, FaClipboardCheck, FaCog, FaFileAlt, FaHome, FaTimes, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#00274D] text-white transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex items-center justify-between h-16 p-4 bg-[#00274D]">
        <img
          src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png"
          alt="QubicGen Logo"
          className="h-8 w-auto"
        />
        <button className="text-white md:hidden" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaHome />
          <span>Dashboard</span>
        </Link>
        <Link to="/students" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaUserGraduate />
          <span>Students</span>
        </Link>
        <Link to="/teachers" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaChalkboardTeacher />
          <span>Teachers</span>
        </Link>
        <Link to="/attendance" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaClipboardCheck />
          <span>Attendance</span>
        </Link>
        <Link to="/marks" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaFileAlt />
          <span>Marks</span>
        </Link>
        <Link to="/staff" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaUsers />
          <span>Staff</span>
        </Link>
        <Link to="/leaves" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaCalendarAlt />
          <span>Leaves</span>
        </Link>
        <Link to="/announcements" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaBullhorn />
          <span>Announcements</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-md">
          <FaCog />
          <span>Settings</span>
        </Link>
      </nav>
    </div>

    {/* Main content */}
    <div className="flex flex-col flex-1 w-full overflow-hidden">
      <header className="flex items-center justify-between h-16 p-4 bg-[#00274D] text-white shadow-lg">
        <button className="text-white md:hidden" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Hello, Lekan</h1>
          <span className="text-gray-300">Have a nice day</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-300" />
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-white">
              <span>Lekan Okeowo</span>
              <span className="block text-sm text-gray-300">Admin</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col flex-1 p-4 overflow-y-auto bg-gray-100">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            to="/students"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaUserGraduate className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Students</span>
          </Link>
          <Link
            to="/teachers"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaChalkboardTeacher className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Teachers</span>
          </Link>
          <Link
            to="/attendance"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaClipboardCheck className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Attendance</span>
          </Link>
          <Link
            to="/marks"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaFileAlt className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Marks</span>
          </Link>
          <Link
            to="/staff"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaUsers className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Staff</span>
          </Link>
          <Link
            to="/leaves"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaCalendarAlt className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Leaves</span>
          </Link>
          <Link
            to="/announcements"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaBullhorn className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Announcements</span>
          </Link>
          <Link
            to="/settings"
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
          >
            <FaCog className="text-4xl text-gray-500" />
            <span className="mt-2 text-lg font-semibold">Settings</span>
          </Link>
        </div>
      </main>
    </div>
  </div>
  );
};

export default Dashboard;