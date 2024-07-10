import React from 'react'
import { Link} from 'react-router-dom';
import {
    FaCog, 
   } from 'react-icons/fa';

const Dbmain = () => {
  return (
    <>
 
 <Link
              to="/students"
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720611744/Students_fxzltp.png" className='w-24' alt="" />
              <span className="mt-2 text-lg font-semibold">Students</span>
            </Link>
            <Link
              to="/teachers"
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720611738/Teachers_h8i7rx.png" className='w-24' alt="" />
              <span className="mt-2 text-lg font-semibold">Teachers</span>
            </Link>
            <Link
              to="/attendance"
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720611726/Attendance_d9wmem.png" className='w-24' alt="" />
              <span className="mt-2 text-lg font-semibold">Attendance</span>
            </Link>
            <Link
              to="/marks"
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720611710/Marks_nf2g0o.png" className='w-24' alt="" />
              <span className="mt-2 text-lg font-semibold">Marks</span>
            </Link>
            <Link
              to="/staff"
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720611678/management_stv5su.png" className='w-24' alt="" />
              <span className="mt-2 text-lg font-semibold">Staff</span>
            </Link>
            <Link
              to="/leaves"
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720611672/Leaves_ovcell.png" className='w-24' alt="" />
              <span className="mt-2 text-lg font-semibold">Leaves</span>
            </Link>
            <Link
              to="/announcements"
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720611657/Announcements_n9o9ed.png" className='w-24' alt="" />
              <span className="mt-2 text-lg font-semibold">Announcements</span>
            </Link>
            <Link
                to="/settings"
                className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
              >
                <FaCog className="text-4xl text-gray-500" />
                <span className="mt-2 text-lg font-semibold">Settings</span>
              </Link>
    </>
  )
}

export default Dbmain