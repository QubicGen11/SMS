import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Dbmain = () => {
  const linksRef = useRef([]);

  useEffect(() => {
    linksRef.current.forEach((link, index) => {
      if (link) {
        const img = link.querySelector('img');
        const tl = gsap.timeline({ paused: true });

        tl.to(img, {
          y: -15,
          duration: 0.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1
        });

        link.addEventListener('mouseenter', () => tl.play());
        link.addEventListener('mouseleave', () => tl.reverse());
      }
    });
  }, []);

  return (
    <>
      <Link
        to="/students"
        className="flex flex-col items-center justify-center p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white border border-gray-200 rounded-3xl w-10/12 shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[0] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772446/Metrics_rretv9.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Metrics</span>
      </Link>
      <Link
        to="/enrolements"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[1] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772427/Registration_mmddw4.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Enrollment/Registration</span>
      </Link>
      <Link
        to="/attendance"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[2] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772415/Finances_gfoyxs.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Finances</span>
      </Link>
      <Link
        to="/marks"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[3] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772394/User_Management_m0qsvy.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">User Management</span>
      </Link>
      <Link
        to="/students"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-3xl w-10/12 shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[4] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772378/Students_quljje.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Students</span>
      </Link>
      <Link
        to="/teachers"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[5] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772365/Teachers_wdoq9f.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Teachers</span>
      </Link>
      <Link
        to="/attendance"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[6] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772346/Attendance_l53an9.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Attendance</span>
      </Link>
      <Link
        to="/marks"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[7] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772326/Marks_ynnahe.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Marks</span>
      </Link>
      <Link
        to="/staff"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[8] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772308/Staff_ukgko1.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Staff</span>
      </Link>
      <Link
        to="/leaves"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[9] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772269/Leaves_qno92t.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Leaves</span>
      </Link>
      <Link
        to="/announcements"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[10] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772198/Announcements_d7rrb4.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Announcements</span>
      </Link>
      <Link
        to="/announcements"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 bg-white border border-gray-200 w-10/12 rounded-3xl shadow-md hover:shadow-xl"
        ref={(el) => linksRef.current[11] = el}
      >
        <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720772183/Settings_boymis.png" className='w-24' alt="" />
        <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">Settings</span>
      </Link>

    </>
  )
}

export default Dbmain