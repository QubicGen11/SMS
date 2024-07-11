import React, { useState } from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Header = ({toggleSidebar}) => {
  const navItems = [
    { label: "Enrollment/Registration", path: "/enrolements", icon: "https://res.cloudinary.com/devewerw3/image/upload/v1720621562/registration_1_fhn9in.png" },
    { label: "Dashboard", path: "/dashboard", icon: "https://res.cloudinary.com/devewerw3/image/upload/v1720621544/Dashboard-Gold_pvju51.png" },
    { label: "User Management", path: "/user-management", icon: "https://res.cloudinary.com/devewerw3/image/upload/v1720621525/User_Managemnt_z67xge.png" },
    { label: "Finances", path: "/finances", icon: "https://res.cloudinary.com/devewerw3/image/upload/v1720621516/budget_ewo8gi.png" },
    { label: "Metrics", path: "/metrics", icon: "https://res.cloudinary.com/devewerw3/image/upload/v1720621495/icons8-laptop-metrics-100_s21zgl.png" }
];
    const location = useLocation(); // Hook to get location object

 

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="flex items-center justify-between h-16 p-4 bg-[#00274D] text-white shadow-lg">
            <button className="text-white md:hidden" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <nav className="hidden md:flex space-x-4">
                {/* Iterate over nav items */}
                {navItems.map(item => (
    <Link to={item.path} key={item.path} className={`flex ${isActive(item.path) ? 'bg-blue-600' : 'hover:bg-blue-600'} bg-white items-center gap-2 px-4 rounded-md xl:h-9`}>
        <img src={item.icon} className='w-7 lg:hidden xl:block 2xl:block' alt={item.label} />
        <span className={`text-black hidden lg:block lg:text-base xl:text-base ${isActive(item.path) ? 'text-white' : ''}`}>{item.label}</span>
    </Link>
))}
            </nav>
            <div className="flex items-center space-x-4">
                <FaBell className="text-gray-300" />
                <div className="flex items-center space-x-2">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="text-white">
                        <span>QubicGen</span>
                        <span className="block text-sm text-gray-300">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;