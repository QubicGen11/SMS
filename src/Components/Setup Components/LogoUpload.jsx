import React, { useState } from 'react';

const LogoUpload = () => {
  const [logo, setLogo] = useState(() => localStorage.getItem('logo') || 'https://res.cloudinary.com/devewerw3/image/upload/v1722230790/school_okuhs4.png');

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
        <img src={logo} alt="Logo" className=" w-24 h-24 md:w-20 md:h-20 mb-2 bg-cover" />
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