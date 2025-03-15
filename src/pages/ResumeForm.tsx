
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Save } from "lucide-react";
import { useResumeForm } from "@/hooks/use-resume-form";
import LayoutSelection from "@/components/resume-form/LayoutSelection";
import PersonalInfoForm from "@/components/resume-form/PersonalInfoForm";
import ExperienceEducationForm from "@/components/resume-form/ExperienceEducationForm";
import SkillsAdditionalForm from "@/components/resume-form/SkillsAdditionalForm";
import ResumeFormActions from "@/components/resume-form/ResumeFormActions";
import ProgressSteps from "@/components/resume-form/ProgressSteps";

const ResumeForm = () => {
  const {
    currentStep,
    setCurrentStep,
    selectedLayout,
    setSelectedLayout,
    isAnalyzing,
    formData,
    handleChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    analyzeResume,
    downloadResume
  } = useResumeForm();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <LayoutSelection 
            selectedLayout={selectedLayout}
            onSelectLayout={setSelectedLayout}
          />
        );
      case 2:
        return (
          <PersonalInfoForm 
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <ExperienceEducationForm 
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 4:
        return (
          <SkillsAdditionalForm 
            formData={formData}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-24 pb-10">
        <div className="container mx-auto py-10 px-6">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Build Your Resume</h1>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={handleNext}>
                    Next <ChevronRight className="ml-1" size={18} />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-primary">
                    <Save className="mr-1" size={18} /> Save Resume
                  </Button>
                )}
              </div>
            </div>
            
            <ProgressSteps 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          <div className="glass-card p-6 rounded-xl mb-6">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
            </form>
          </div>

          {currentStep === 4 && (
            <ResumeFormActions 
              isAnalyzing={isAnalyzing}
              analyzeResume={analyzeResume}
              downloadResume={downloadResume}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResumeForm;
