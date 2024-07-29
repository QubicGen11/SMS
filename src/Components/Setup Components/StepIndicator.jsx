import React from 'react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full w-8 h-8 md:w-12 md:h-12 flex justify-center items-center text-white font-bold mb-2 gap-8== ${
                index <= currentStep ? 'bg-yellow-500' : 'bg-[#00274D]'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs md:text-base">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mb-7 ${
                index < currentStep ? 'bg-[#00274D]' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;