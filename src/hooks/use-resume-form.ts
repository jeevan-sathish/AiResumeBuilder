
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  workExperience: string;
  education: string;
  skills: string;
  certifications: string;
  languages: string;
  projects: string;
}

export function useResumeForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<ResumeFormData>({
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
    saveResume();
  };

  const saveResume = () => {
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
    let content = "";
    
    if (formData.fullName) content += `# ${formData.fullName}\n`;
    if (formData.email || formData.phone || formData.location) {
      content += `${formData.email || ''} | ${formData.phone || ''} | ${formData.location || ''}\n\n`;
    }
    
    if (formData.summary) content += `## Professional Summary\n${formData.summary}\n\n`;
    if (formData.workExperience) content += `## Work Experience\n${formData.workExperience}\n\n`;
    if (formData.education) content += `## Education\n${formData.education}\n\n`;
    if (formData.skills) content += `## Skills\n${formData.skills}\n\n`;
    if (formData.projects) content += `## Projects\n${formData.projects}\n\n`;
    if (formData.certifications) content += `## Certifications\n${formData.certifications}\n\n`;
    if (formData.languages) content += `## Languages\n${formData.languages}\n\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.txt';
    document.body.appendChild(link);
    link.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
    toast({
      title: "Download Complete",
      description: "Your resume has been successfully downloaded.",
    });
  };

  return {
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
    saveResume,
    analyzeResume,
    downloadResume
  };
}
