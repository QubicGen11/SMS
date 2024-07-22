import React, { useState, useEffect, useRef } from 'react';
import Dbmain from './Dbmain'; // Assuming path is correct
import Sidemenu from '../Sidemanu_Components/Sidemenu';
import Header from '../Header_Components/Header';
import { gsap } from 'gsap';

const Dashboard = () => {
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
            <h1 className="font-bold text-base">Hello, QubicGen</h1>
            <h1 className="font-light text-xs">Have a nice day</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" ref={gridRef}>
              <Dbmain />
            <div >
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;