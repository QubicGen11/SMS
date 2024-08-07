import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import axios from 'axios';
import ForgotPasswordModal from './ForgotModalOne';
import './Login.css';
import Cookies from 'js-cookie';

const Login_main = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animations for initial load
    gsap.fromTo('.blur-bg', { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.from('.fixed-content', { y: -50, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.from('.scrolling-content img', { scale: 0.9, opacity: 0, duration: 1, stagger: 0.3, delay: 1, ease: 'power3.out' });

    // 3D rotation for logo on load
    gsap.fromTo(logoRef.current, 
      { rotationY: 360, opacity: 0 }, 
      { rotationY: 0, opacity: 1, duration: 1.5, ease: 'back.out(1.7)' }
    );

    // Add hover animation for the logo
    const logo = logoRef.current;
    const handleLogoMouseOver = () => {
      gsap.to(logo, {
        scaleX: 1.2,
        scaleY: 0.8,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
        onComplete: () => {
          gsap.to(logo, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          });
        }
      });
    };

    const handleLogoMouseOut = () => {
      gsap.to(logo, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    };

    logo.addEventListener('mouseover', handleLogoMouseOver);
    logo.addEventListener('mouseout', handleLogoMouseOut);

    // Magnifying and smooth effect for the title on hover
    const title = titleRef.current;
    const handleTitleMouseOver = () => {
      gsap.to(title, {
        scale: 1.2,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    const handleTitleMouseOut = () => {
      gsap.to(title, {
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    title.addEventListener('mouseover', handleTitleMouseOver);
    title.addEventListener('mouseout', handleTitleMouseOut);

    // Cleanup event listeners on component unmount
    return () => {
      logo.removeEventListener('mouseover', handleLogoMouseOver);
      logo.removeEventListener('mouseout', handleLogoMouseOut);
      title.removeEventListener('mouseover', handleTitleMouseOver);
      title.removeEventListener('mouseout', handleTitleMouseOut);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const data = { email, password };
      const response = await axios.post('http://localhost:3000/sms/login', data);
      
      const { token, role,id } = response.data;
      Cookies.set('authToken', token, { expires: 1 }); // Cookie will expire in 1 day
      Cookies.set('userRole', role, { expires: 1 }); // Store user role in a cookie
      Cookies.set('userId', id, { expires: 1 }); // Store user role in a cookie
      
      
      alert(response.data.message); // Display success message
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        alert(error.response.data); // Display error message from server
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="Careersmain flex justify-center items-center min-h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-50 flex flex-col md:flex-row justify-center items-center text-2xl text-white sm:mx-6 md:text-4xl lg:text-5xl rounded-xl blur-bg p-4 max-w-screen-md">
        <div className="text-black w-full md:w-1/2 h-auto md:h-[70vh] rounded-2xl flex justify-center items-center p-4 fixed-content">
          <h1 className="text-2xl text-center text-white hover:text-yellow-500 title" ref={titleRef}>Welcome! to the School Management System</h1>
        </div>
        <div className="text-black w-full md:w-1/2 h-auto md:h-[70vh] rounded-2xl flex justify-center items-center flex-col gap-5 p-4 scrolling-content">
          <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720427797/Group_8_1_fjriu5.png" className="h-24 logo" alt="QubicGen Logo" ref={logoRef} />
          <div className="relative w-full md:w-64 flex justify-center">
            <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720430246/user_blfrle.png" alt="User Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6" />
            <input type="text" className="w-full pl-10 rounded-2xl text-lg p-2 h-12" placeholder="user id" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="relative w-full md:w-64 flex justify-center">
            <img src="https://res.cloudinary.com/devewerw3/image/upload/v1720430245/padlock_lvmzv2.png" alt="Padlock Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6" />
            <input type="password" className="w-full pl-10 rounded-2xl text-lg p-2 h-12" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <Link to="/setup" className="text-sm text-white">Register / Sign Up</Link>
            <a href="#" className="text-sm text-white" onClick={() => setShowModal(true)}>Forgot Password ?</a>
          </div>

          <button onClick={handleLogin} className="bg-blue-500 hover:bg-yellow-600 text-white text-base font-bold px-16 py-2 rounded-2xl">LOG IN</button>

          <ForgotPasswordModal showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </div>
  );
};

export default Login_main;
