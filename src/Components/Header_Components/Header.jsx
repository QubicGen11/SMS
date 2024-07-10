import React, { useState } from 'react'
import {
    FaBars, FaBell
  } from 'react-icons/fa';
  import { Link, } from 'react-router-dom';

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        
        setSidebarOpen(!sidebarOpen);
      };

  return (
    <header className="flex items-center justify-between h-16 p-4 bg-[#00274D] text-white shadow-lg">
    <button className="text-white md:hidden" onClick={toggleSidebar}>
      <FaBars />
    </button>
    <nav className="hidden md:flex space-x-4">
<div className='flex bg-white hover:bg-blue-600 items-center gap-2 px-4 rounded-md xl:h-9'>
<img src="https://res.cloudinary.com/devewerw3/image/upload/v1720621562/registration_1_fhn9in.png" className='w-7 lg:hidden xl:block 2xl:block' alt="" />
<Link to="/enrollment" className="text-black hidden lg:block lg:text-base xl:text-base">Enrollment/Registration</Link>
</div>
<div className='flex bg-white hover:bg-blue-600 items-center gap-2 px-4 rounded-md'>
<img src="https://res.cloudinary.com/devewerw3/image/upload/v1720621544/Dashboard-Gold_pvju51.png" className='w-7 lg:hidden xl:block 2xl:block' alt="" />
<Link to="/enrollment" className="text-black hidden lg:block lg:text-base xl:text-base">Dashboard</Link>
</div>
<div className='flex bg-white hover:bg-blue-600 items-center gap-2 px-4 rounded-md'>
<img src="https://res.cloudinary.com/devewerw3/image/upload/v1720621525/User_Managemnt_z67xge.png" className='w-7 lg:hidden xl:block 2xl:block' alt="" />
<Link to="/enrollment" className="text-black hidden lg:block lg:text-base xl:text-base">User Management</Link>
</div>
<div className='flex bg-white hover:bg-blue-600 items-center gap-2 px-4 rounded-md'>
<img src="https://res.cloudinary.com/devewerw3/image/upload/v1720621516/budget_ewo8gi.png" className='w-7 lg:hidden xl:block 2xl:block' alt="" />
<Link to="/enrollment" className="text-black hidden lg:block lg:text-base xl:text-base">Finances</Link>
</div>
<div className='flex bg-white hover:bg-blue-600 items-center gap-2 px-4 rounded-md'>
<img src="https://res.cloudinary.com/devewerw3/image/upload/v1720621495/icons8-laptop-metrics-100_s21zgl.png" className='w-7 lg:hidden xl:block 2xl:block' alt="" />
<Link to="/enrollment" className="text-black hidden lg:block lg:text-base xl:text-base">Metrics</Link>
</div>
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
  )
}

export default Header