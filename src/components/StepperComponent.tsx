import React from "react";

interface StepperComponentProps {
  steps: string[]; // Array of step names
    currentStep: number; // Current step index

}

export const StepperComponent : React.FC<StepperComponentProps> =({steps,currentStep})=>{

return(
    <div className="flex items-center justify-between mb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </div>
          <span className={`mt-2 ${index <= currentStep ? "text-blue-500" : "text-gray-500"}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );



}