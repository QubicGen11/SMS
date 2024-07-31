import React, { useState, useEffect, useRef } from 'react';

import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';
import Dbmain from '../Dashboard_Components/Dbmain';
import { Link } from 'react-router-dom';

const Accessmanagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerRef = useRef(null);
  const greetingRef = useRef(null);
  const gridRef = useRef(null);
  const dbMainRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Sidebar toggled:", sidebarOpen);
  };

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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidemenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main content */}
      <div className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}
        <div ref={headerRef}>
          <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        {/* Main section */}
        <main className="flex flex-col flex-1 p-4 overflow-y-auto justify-start lg:gap-10 bg-gray-100">
          <div ref={greetingRef}>
            <h1 className="font-bold text-3xl">Access Management</h1>
            
          </div>
          <div className="grid grid-cols-2 gap-4  lg:grid-cols-3 xl:grid-cols-2  mt-52" ref={gridRef}>
          <Link
                            to="/manageroles"
                            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-3xl xl:w-5/12 xl:justify-self-end shadow-md hover:shadow-xl"
                            
                        >
                            <img src="https://res.cloudinary.com/devewerw3/image/upload/v1722256414/team_qfgxtw.png" className='w-24' alt="" />
                            <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Manage roles</span>
                        </Link>
                        <Link
                            to="/managemain"
                            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 xl:w-5/12 rounded-3xl shadow-md hover:shadow-xl"
                            
                        >
                            <img src="https://res.cloudinary.com/devewerw3/image/upload/v1722256414/stakeholder_kutujc.png" className='w-24' alt="" />
                            <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Manage Accounts / Groups</span>
                        </Link>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default Accessmanagement;