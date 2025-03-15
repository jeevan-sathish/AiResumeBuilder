
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ResumeLayouts from "./ResumeLayouts";
import ResumeCustomizer from "./ResumeCustomizer";
import ResumeStrength from "./ResumeStrength";
import AIInterfaceToggle from "./AIInterfaceToggle";
import ResumeActions from "./ResumeActions";
import { toast } from "@/hooks/use-toast";
import { useResumeData } from "@/hooks/use-resume-data";

const ResumeBuilder = () => {
  const location = useLocation();
  const { userName, resumeContent, isAnalyzing, strengths, setResumeContent, analyzeResume } = useResumeData();
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [font, setFont] = useState("sans");
  const [fontSize, setFontSize] = useState("md");
  const [accentColor, setAccentColor] = useState("blue");

  const handlePromptResult = (result: string) => {
    setResumeContent(result);
    
    toast({
      title: "Content Added",
      description: "The AI-generated content has been added to your resume.",
    });
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {userName ? `Welcome, ${userName}!` : "Resume Builder"}
        </h1>
        <p className="text-muted-foreground">
          Create an ATS-optimized resume that gets you noticed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AIInterfaceToggle onPromptResult={handlePromptResult} />

          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">ATS-Optimized Layouts</h2>
            <p className="text-muted-foreground mb-6">
              Choose from professionally designed layouts that are proven to pass ATS scans.
            </p>
            <ResumeLayouts 
              selectedLayout={selectedLayout}
              onSelectLayout={setSelectedLayout}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Customize</h2>
            <p className="text-muted-foreground mb-6">
              Personalize your resume's appearance while maintaining ATS compatibility.
            </p>
            <ResumeCustomizer 
              font={font}
              fontSize={fontSize}
              accentColor={accentColor}
              onFontChange={setFont}
              onFontSizeChange={setFontSize}
              onColorChange={setAccentColor}
            />
          </div>

          <ResumeStrength scores={strengths} />

          <ResumeActions 
            isAnalyzing={isAnalyzing}
            resumeContent={resumeContent}
            locationState={location.state}
            analyzeResume={() => analyzeResume()}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
