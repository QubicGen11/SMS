import React from 'react';
import {
  FaHome, FaChartBar, FaWpforms, FaMoneyBill, FaUser, FaUserGraduate,
  FaChalkboardTeacher, FaClipboardCheck, FaFileAlt, FaUsers, FaCalendarAlt,
  FaBullhorn, FaCog,
  FaTimes,
  FaBars
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidemenu = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed inset-y-0 left-0 z-30 bg-[#00274D] text-white transform ${sidebarOpen ? 'w-64' :  'w-1 md:w-20'} transition-all duration-300 ease-in-out overflow-y-auto`}>
      <div className="flex items-center justify-between h-16 p-4 bg-[#00274D]">
        {sidebarOpen && (
          <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1715348582/og_6_jqnrvf.png" alt="QubicGen Logo" className="h-14 mt-6 w-auto" />
        )}
        <button className="text-white" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4 mt-5">
        {[
          { path: "/dashboard", icon: <FaHome size={24} />, label: "Home" },
          { path: "/metrics", icon: <FaChartBar size={24} />, label: "Metrics" },
          { path: "/enrolements", icon: <FaWpforms size={24} />, label: "Enrollment/Registration" },
          { path: "/finances", icon: <FaMoneyBill size={24} />, label: "Finances" },
          { path: "/user-management", icon: <FaUser size={24} />, label: "Access Management" },
          { path: "/", icon: <FaUser size={24} />, label: "Academic Calendar" },
          { path: "/students", icon: <FaUserGraduate size={24} />, label: "Time Table" },
          { path: "/teachers", icon: <FaChalkboardTeacher size={24} />, label: "Profiles" },
          { path: "/attendance", icon: <FaClipboardCheck size={24} />, label: "Attendance" },
          { path: "/marks", icon: <FaFileAlt size={24} />, label: "Marks" },
          { path: "/staff", icon: <FaUsers size={24} />, label: "Assignments" },
          { path: "/leaves", icon: <FaCalendarAlt size={24} />, label: "Leaves" },
          { path: "/announcements", icon: <FaBullhorn size={24} />, label: "Announcements" },
          { path: "/announcements", icon: <FaBullhorn size={24} />, label: "Library" },
          { path: "/announcements", icon: <FaBullhorn size={24} />, label: "Reports" },
          { path: "/announcements", icon: <FaBullhorn size={24} />, label: "Approvals" },
          { path: "/settings", icon: <FaCog size={24} />, label: "Settings" }
        ].map((item) => (
          <Link to={item.path} className={`flex items-center p-2 rounded-md ${isActive(item.path) ? 'bg-white text-[#00274D]' : 'text-white hover:bg-blue-500'}`}>
            {item.icon}
            {sidebarOpen && <span className="ml-2">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidemenu;