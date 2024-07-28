import React, { useState } from 'react';

const LogoUpload = () => {
  const [logo, setLogo] = useState(() => localStorage.getItem('logo') || '/mnt/data/AD82DDE6-BCD9-4BB5-8D1F-10E84E29038D.png');

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        localStorage.setItem('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <label htmlFor="logo-upload" className="cursor-pointer">
        <img src={logo} alt="Logo" className="rounded-full w-24 h-24 md:w-32 md:h-32 mb-2" />
        <input
          type="file"
          id="logo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleLogoUpload}
        />
      </label>
      <span className="mt-2 text-sm md:text-base text-gray-700">Logo</span>
      <span className="text-sm text-gray-500">Edit</span>
    </div>
  );
};

export default LogoUpload;