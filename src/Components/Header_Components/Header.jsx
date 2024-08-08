import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBell, FaSearch, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import Cookies from "js-cookie";

const Header = ({ toggleSidebar }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(window.innerWidth >= 1280);
  const location = useLocation();
  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSearchOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.from(headerRef.current, { opacity: 0, y: -50, duration: 1 });
    gsap.from(searchRef.current, {
      opacity: 0,
      scale: 0,
      duration: 1,
      delay: 0.5,
    });
    gsap.from(avatarRef.current, { opacity: 0, x: 50, duration: 1, delay: 1 });
  }, []);

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      gsap.from(searchRef.current, { opacity: 0, scale: 0, duration: 0.5 });
    } else {
      gsap.to(searchRef.current, { opacity: 0, scale: 0, duration: 0.5 });
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove("authToken");
    Cookies.remove("role");
    Cookies.remove("userId")
    // Redirect or handle additional logout actions here
    window.location.href = "/"; // Example redirect to login page
  };

  return (
    <header className="flex items-center justify-between h-16 p-4 bg-[#00274D] text-orange shadow-lg" ref={headerRef}>
      <button className="text-white md:hidden" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="flex flex-1 items-center space-x-4 md:space-x-8">
        <div className="flex items-center rounded-lg p-2 relative">
          {!searchOpen && (
            <FaSearch
              className="text-white cursor-pointer"
              onClick={() => setSearchOpen(true)}
            />
          )}
          <div
            className={`relative flex items-center transition-all duration-300 ease-in-out ${
              searchOpen ? "w-60 md:w-52 lg:w-96 xl:w-full" : "w-0"
            }`}
          >
            <FaSearch className="absolute left-3 top-2.5 text-black" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`h-9 rounded-lg text-black pl-10 pr-10 ${
                searchOpen ? "w-full" : "w-0"
              }`}
              placeholder="Search"
              style={{ visibility: searchOpen ? "visible" : "hidden" }}
            />
            {searchValue && (
              <FaTimes
                className="absolute right-3 top-2.5 text-black cursor-pointer"
                onClick={() => setSearchValue("")}
              />
            )}
          </div>
        </div>
        <select className="bg-[#00274D] text-white hidden md:block md:w-28 lg:w-28 h-9 rounded-lg">
          <option value="">Category</option>
          <option value="">Teachers</option>
          <option value="">Students</option>
          <option value="">Non Teaching Staff</option>
        </select>

        <div className="flex-grow"></div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-300" />
          <div className="flex items-center space-x-2" ref={avatarRef}>
            <img
              src="https://res.cloudinary.com/defsu5bfc/image/upload/v1714828410/logo_3_jizb6b.png"
              alt="User avatar"
              className="w-12 rounded-full"
            />
            <select
              className="bg-[#00274D] text-white hidden md:block md:w-28 lg:w-28 h-9 rounded-lg"
              onChange={(e) => {
                if (e.target.value === "logout") {
                  handleLogout();
                }
              }}
            >
              <option value="settings">Settings</option>
              <option value="logout" onClick={handleLogout}>Logout</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
