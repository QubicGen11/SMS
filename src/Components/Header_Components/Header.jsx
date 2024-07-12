import React, { useState } from 'react';
import { FaBars, FaBell, FaSearch, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="flex items-center justify-between h-16 p-4 bg-[#00274D] text-orange shadow-lg">
      <button className="text-white md:hidden" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="flex flex-1 items-center space-x-4 md:space-x-8 ">
        <div className="flex items-center rounded-lg p-2 relative">
          {!searchOpen && (
            <FaSearch
              className="text-white cursor-pointer"
              onClick={() => setSearchOpen(true)}
            />
          )}
          <div
            className={`relative flex items-center transition-all duration-300 ease-in-out ${
              searchOpen ? ' md:w-52 lg:w-96' : 'w-0'
            }`}
            style={{ visibility: searchOpen ? 'visible' : 'hidden' }}
          >
            <FaSearch className="absolute left-3 top-2.5 text-black" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-9 rounded-lg text-black pl-10 pr-10"
              placeholder="Search"
            />
            {searchValue && (
              <FaTimes
                className="absolute right-3 top-2.5 text-black cursor-pointer"
                onClick={() => setSearchValue('')}
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

        <div className="flex-grow"></div> {/* This div will take up the remaining space and push the next div to the right */}
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-300" />
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/defsu5bfc/image/upload/v1714828410/logo_3_jizb6b.png"
              alt="User avatar"
              className="w-12 rounded-full"
            />
            <div className="text-white">
              <span className="hidden md:block">QubicGen</span>
              <span className="text-sm text-gray-300 hidden md:block">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;