import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Dbmain = () => {
  const linksRef = useRef([]);

  const handleMouseEnter = (index) => {
    const img = linksRef.current[index].querySelector('img');
    gsap.to(img, {
      y: -15,
      duration: 0.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1
    });
  };

  const handleMouseLeave = (index) => {
    const img = linksRef.current[index].querySelector('img');
    gsap.to(img, {
      y: 0,
      duration: 0.2,
      ease: "power1.inOut"
    });
  };

  return (
    <>
      {[
        { to: "/students", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772446/Metrics_rretv9.png", text: "Metrics" },
        { to: "/enrolements", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772427/Registration_mmddw4.png", text: "Enrollment/Registration" },
        { to: "/attendance", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772415/Finances_gfoyxs.png", text: "Finances" },
        { to: "/marks", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772394/User_Management_m0qsvy.png", text: "User Management" },
        { to: "/students", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772378/Students_quljje.png", text: "Students" },
        { to: "/teachers", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772365/Teachers_wdoq9f.png", text: "Teachers" },
        { to: "/attendance", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772346/Attendance_l53an9.png", text: "Attendance" },
        { to: "/marks", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772326/Marks_ynnahe.png", text: "Marks" },
        { to: "/staff", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772308/Staff_ukgko1.png", text: "Staff" },
        { to: "/leaves", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772269/Leaves_qno92t.png", text: "Leaves" },
        { to: "/announcements", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772198/Announcements_d7rrb4.png", text: "Announcements" },
        { to: "/settings", imgSrc: "https://res.cloudinary.com/devewerw3/image/upload/v1720772183/Settings_boymis.png", text: "Settings" },
      ].map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className="flex flex-col items-center justify-center p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white border border-gray-200 rounded-3xl w-10/12 shadow-md hover:shadow-xl"
          ref={(el) => linksRef.current[index] = el}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <img src={link.imgSrc} className='w-24' alt="" />
          <span className="mt-2 text-sm md:text-lg lg:text-lg xl:text-lg font-semibold">{link.text}</span>
        </Link>
      ))}
    </>
  )
}

export default Dbmain;