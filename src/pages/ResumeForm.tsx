
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Download, 
  AlertCircle, 
  Save, 
  ChevronRight, 
  CheckCircle 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ResumeLayouts from "@/components/ResumeLayouts";

const ResumeForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    workExperience: "",
    education: "",
    skills: "",
    certifications: "",
    languages: "",
    projects: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd submit the form data to generate the resume
    saveResume();
  };

  const saveResume = () => {
    // In a real app, we'd save the resume data to the database or local storage
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully. You can now download or analyze it.",
    });
    navigate("/builder", { state: { resumeData: formData, layout: selectedLayout } });
  };

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully. Check the results in the dashboard.",
      });
      navigate("/builder", { state: { resumeData: formData, layout: selectedLayout, analyze: true } });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadResume = () => {
    // This is a simplified demo - in a real app, we'd generate a PDF
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded as a PDF.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your resume has been successfully downloaded.",
      });
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Choose a Layout</h2>
            <ResumeLayouts 
              selectedLayout={selectedLayout}
              onSelectLayout={setSelectedLayout}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="(123) 456-7890" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="City, State, Country" 
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea 
                  id="summary" 
                  name="summary" 
                  placeholder="Write a brief summary of your professional background and goals..." 
                  rows={4}
                  value={formData.summary}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Experience & Education</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="workExperience">Work Experience</Label>
                <Textarea 
                  id="workExperience" 
                  name="workExperience" 
                  placeholder="List your work experiences with job title, company, dates, and key responsibilities..." 
                  rows={6}
                  value={formData.workExperience}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="education">Education</Label>
                <Textarea 
                  id="education" 
                  name="education" 
                  placeholder="List your educational background with degree, institution, dates, and any notable achievements..." 
                  rows={4}
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="projects">Projects</Label>
                <Textarea 
                  id="projects" 
                  name="projects" 
                  placeholder="List any notable projects with descriptions, technologies used, and outcomes..." 
                  rows={4}
                  value={formData.projects}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Skills & Additional Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Textarea 
                  id="skills" 
                  name="skills" 
                  placeholder="List your technical and soft skills..." 
                  rows={4}
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="certifications">Certifications</Label>
                <Textarea 
                  id="certifications" 
                  name="certifications" 
                  placeholder="List any relevant certifications with name, issuing organization, and date..." 
                  rows={3}
                  value={formData.certifications}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="languages">Languages</Label>
                <Textarea 
                  id="languages" 
                  name="languages" 
                  placeholder="List languages you speak and your proficiency level..." 
                  rows={2}
                  value={formData.languages}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
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
            
            {/* Progress Steps */}
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
          </div>

          <div className="glass-card p-6 rounded-xl mb-6">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
            </form>
          </div>

          {currentStep === 4 && (
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={analyzeResume}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    <span>Analyze Resume Strength</span>
                  </>
                )}
              </button>
              
              <button
                onClick={downloadResume}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResumeForm;
