import React, { useState } from 'react'
import Sidemenu from '../Sidemanu_Components/Sidemenu'
import Header from '../Header_Components/Header';
import Dbmain from '../Dashboard_Components/Dbmain';
import { Link } from 'react-router-dom';

const Enrolements = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      console.log("Toggling sidebar");
    };
  return (
    <>

<div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <Sidemenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />      {/* Main content */}
      <div className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}

        <Header toggleSidebar={toggleSidebar} />
        {/* Main section */}
        <main className="flex flex-col flex-1 p-4 overflow-y-auto justify-start lg:gap-10  bg-gray-100">
         

            <p className='xl:text-xl xl:ml-36 xl:relative xl:top-5 font-bold '>Select the type of user who you want to Enroll/Register.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-8  xl:mt-14 " >
          <Link
    to="/studentenrollment"
    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-3xl  xl:w-5/12 xl:justify-self-end shadow-md hover:shadow-xl "
  >
    <img src="https://res.cloudinary.com/devewerw3/image/upload/v1721124848/students_hynobo.png" className='w-24' alt="" />
    <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg  font-semibold">Students</span>
  </Link>
  <Link
    to="/teachers"
    className="flex flex-col items-center justify-center p-4 bg-white  border border-gray-200  xl:w-5/12  rounded-3xl shadow-md hover:shadow-xl"
  >
    <img src="https://res.cloudinary.com/devewerw3/image/upload/v1721124855/Teachers_xl1j0v.png" className='w-24' alt="" />
    <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg  font-semibold">Teachers</span>
  </Link>
  <Link
    to="/leaves"
    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200  xl:w-5/12 xl:justify-self-end  rounded-3xl shadow-md hover:shadow-xl"
  >
    <img src="https://res.cloudinary.com/devewerw3/image/upload/v1721124888/Non-Teaching_Staff_pzh3hz.png" className='w-24' alt="" />
    <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg  font-semibold">Non Teaching</span>
  </Link>
  <Link
    to="/staff"
    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200   xl:w-5/12 rounded-3xl shadow-md hover:shadow-xl"
  >
    <img src="https://res.cloudinary.com/devewerw3/image/upload/v1721124895/management_rexme1.png" className='w-24' alt="" />
    <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg  font-semibold">Management</span>
  </Link>
          </div>
        </main>
      </div>
    </div>    
    </>

  )
}

export default Enrolements



