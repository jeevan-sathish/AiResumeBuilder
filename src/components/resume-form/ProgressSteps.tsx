
import { CheckCircle } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ProgressSteps = ({ currentStep, setCurrentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div 
          key={step} 
          className="flex flex-col items-center"
          onClick={() => setCurrentStep(step)}
        >
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= step 
                ? "bg-primary text-primary-foreground" 
                : "border border-input bg-background"
            } cursor-pointer`}
          >
            {currentStep > step ? (
              <CheckCircle size={18} />
            ) : (
              <span>{step}</span>
            )}
          </div>
          <span 
            className={`text-xs mt-1 ${
              currentStep >= step ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {step === 1 ? "Layout" : 
             step === 2 ? "Personal" : 
             step === 3 ? "Experience" : "Skills"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
