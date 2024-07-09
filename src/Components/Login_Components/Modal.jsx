import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md relative">
        {children}
        <button
          className="absolute top-0 right-0 m-2 text-gray-500"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
