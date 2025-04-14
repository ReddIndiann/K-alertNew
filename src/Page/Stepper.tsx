import React,{useState} from "react";
import { StepperComponent } from "../components/StepperComponent";

export const Stepper = ()=>{
const [currentStep, setCurrentStep] = useState(0);
const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
}


const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
}
return(
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> 
    <StepperComponent steps={steps} currentStep={currentStep} />
    <button className={`flex space-x-4 mt-4 p-4 ${currentStep === 0 ? 'bg-slate-500 ':'bg-red-500 '}`} onClick={handleBack}  disabled={currentStep === 0}>Back</button>   
    <button className={`flex space-x-4 mt-4 p-4 ${currentStep === steps.length -1 ? 'bg-slate-500':'bg-blue-500'}`} onClick={handleNext}  disabled={currentStep === steps.length-1}>Next</button> 
    </div>
)
}