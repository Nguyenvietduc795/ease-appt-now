
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  stepTitles = [] 
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium 
                ${i + 1 <= currentStep ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {i + 1}
            </div>
            {stepTitles[i] && (
              <span 
                className={`mt-2 text-sm md:text-base font-medium
                  ${i + 1 <= currentStep ? 'text-primary-700' : 'text-gray-500'}`}
              >
                {stepTitles[i]}
              </span>
            )}
          </div>
        ))}
      </div>
      
      <div className="w-full mt-4 h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StepIndicator;
