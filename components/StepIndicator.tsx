import React from "react";
import { CheckIcon } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  labels = ["User Info", "Solution", "OS Pref.", "Algorithms", "Summary"]
}) => {
  return (
    <div className="w-full mb-8 px-2">
      {/* Desktop and Tablet View */}
      <div className="hidden sm:flex justify-between items-center relative">
        {/* Background line */}
        <div className="absolute h-1 bg-gray-200 w-full top-4 left-0 z-0"/>
        
        {/* Progress line */}
        <div 
          className="absolute h-1 bg-blue-500 top-4 left-0 z-0 transition-all duration-300"
          style={{ 
            width: `${(Math.max(0, currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
        />
        
        {/* Step indicators */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={`desktop-${index}`} className="flex flex-col items-center z-10">
              {/* Step circle */}
              <div 
                className={`z-10 h-8 w-8 flex items-center justify-center rounded-full 
                  ${isActive 
                    ? "bg-blue-500 text-white" 
                    : isCompleted 
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500 border-2 border-gray-300"
                  }`}
              >
                {isCompleted ? (
                  <CheckIcon size={16} />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              
              {/* Step label */}
              <span 
                className={`mt-2 text-xs text-center w-20 font-medium
                  ${isActive || isCompleted ? "text-blue-500" : "text-gray-500"}`}
              >
                {labels[index]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {/* Progress bar and step number */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-500">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-blue-500">
            {labels[currentStep - 1]}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        
        {/* Step dots for mobile */}
        <div className="flex justify-center mt-2 space-x-2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div 
                key={`mobile-${index}`}
                className={`w-2 h-2 rounded-full ${
                  isActive 
                    ? "bg-blue-500" 
                    : isCompleted 
                      ? "bg-blue-400" 
                      : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;