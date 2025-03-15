import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatInterface from "./ChatInterface";
import ResumeLayouts from "./ResumeLayouts";
import ResumeCustomizer from "./ResumeCustomizer";
import ResumeStrength from "./ResumeStrength";
import MasterPrompt from "./MasterPrompt";
import { Download, FileText, Share2, AlertCircle } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";
import { toast } from "@/hooks/use-toast";

const ResumeBuilder = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [font, setFont] = useState("sans");
  const [fontSize, setFontSize] = useState("md");
  const [accentColor, setAccentColor] = useState("blue");
  const [resumeContent, setResumeContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strengths, setStrengths] = useState<{ category: string; score: number }[]>([
    { category: "ATS Compatibility", score: 92 },
    { category: "Content Quality", score: 85 },
    { category: "Keyword Optimization", score: 78 },
    { category: "Format & Structure", score: 90 },
    { category: "Impact Statements", score: 82 },
  ]);
  const [showMasterPrompt, setShowMasterPrompt] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
    
    if (location.state?.resumeData) {
      const { fullName, email, phone, location: userLocation, summary, workExperience, education, skills, certifications, languages, projects } = location.state.resumeData;
      
      let formattedContent = "";
      
      if (fullName) formattedContent += `# ${fullName}\n`;
      if (email || phone || userLocation) {
        formattedContent += `${email || ''} | ${phone || ''} | ${userLocation || ''}\n\n`;
      }
      
      if (summary) formattedContent += `## Professional Summary\n${summary}\n\n`;
      if (workExperience) formattedContent += `## Work Experience\n${workExperience}\n\n`;
      if (education) formattedContent += `## Education\n${education}\n\n`;
      if (skills) formattedContent += `## Skills\n${skills}\n\n`;
      if (projects) formattedContent += `## Projects\n${projects}\n\n`;
      if (certifications) formattedContent += `## Certifications\n${certifications}\n\n`;
      if (languages) formattedContent += `## Languages\n${languages}\n\n`;
      
      setResumeContent(formattedContent);
      
      if (location.state.layout) {
        setSelectedLayout(location.state.layout);
      }
      
      if (location.state.analyze) {
        analyzeResume();
      }
    }
  }, [location.state]);

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    try {
      const resumeData = location.state?.resumeData || {};
      
      const contentScores = {
        atsScore: calculateATSScore(resumeData),
        contentQualityScore: calculateContentQualityScore(resumeData),
        keywordScore: calculateKeywordScore(resumeData),
        formatScore: 90,
        impactScore: calculateImpactScore(resumeData)
      };
      
      const newStrengths = [
        { category: "ATS Compatibility", score: contentScores.atsScore },
        { category: "Content Quality", score: contentScores.contentQualityScore },
        { category: "Keyword Optimization", score: contentScores.keywordScore },
        { category: "Format & Structure", score: contentScores.formatScore },
        { category: "Impact Statements", score: contentScores.impactScore },
      ];
      
      setStrengths(newStrengths);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully.",
      });
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

  const calculateATSScore = (data: any) => {
    let score = 70;
    
    if (data.summary && data.summary.length > 50) score += 5;
    if (data.workExperience && data.workExperience.length > 100) score += 5;
    if (data.skills && data.skills.length > 50) score += 5;
    if (data.education && data.education.length > 50) score += 5;
    if (data.projects && data.projects.length > 0) score += 5;
    if (data.certifications && data.certifications.length > 0) score += 3;
    if (data.languages && data.languages.length > 0) score += 2;
    
    return Math.min(score, 98);
  };
  
  const calculateContentQualityScore = (data: any) => {
    let score = 65;
    
    if (data.summary && data.summary.length > 100) score += 7;
    if (data.workExperience && data.workExperience.length > 200) score += 7;
    if (data.skills && data.skills.length > 100) score += 7;
    if (data.education && data.education.length > 100) score += 7;
    
    return Math.min(score, 95);
  };
  
  const calculateKeywordScore = (data: any) => {
    let score = 60;
    
    if (data.skills) {
      const skills = data.skills.toLowerCase();
      if (skills.includes("management") || skills.includes("leadership")) score += 5;
      if (skills.includes("communication")) score += 5;
      if (skills.includes("analy")) score += 5;
      if (skills.includes("project")) score += 5;
      if (skills.includes("team")) score += 5;
      if (skills.includes("develop")) score += 5;
    }
    
    return Math.min(score, 90);
  };
  
  const calculateImpactScore = (data: any) => {
    let score = 70;
    
    if (data.workExperience) {
      const exp = data.workExperience.toLowerCase();
      if (exp.includes("increas") || exp.includes("improv")) score += 3;
      if (exp.includes("lead") || exp.includes("manage")) score += 3;
      if (exp.includes("develop") || exp.includes("creat")) score += 3;
      if (exp.includes("implement")) score += 3;
      if (exp.includes("%") || exp.includes("percent")) score += 3;
    }
    
    return Math.min(score, 92);
  };

  const downloadResume = () => {
    let content = "";
    
    if (resumeContent) {
      content = resumeContent;
    } else if (location.state?.resumeData) {
      const { fullName, email, phone, location: userLocation, summary, workExperience, education, skills, certifications, languages, projects } = location.state.resumeData;
      
      content = `# ${fullName || "Resume"}\n`;
      if (email || phone || userLocation) {
        content += `${email || ''} | ${phone || ''} | ${userLocation || ''}\n\n`;
      }
      
      if (summary) content += `## Professional Summary\n${summary}\n\n`;
      if (workExperience) content += `## Work Experience\n${workExperience}\n\n`;
      if (education) content += `## Education\n${education}\n\n`;
      if (skills) content += `## Skills\n${skills}\n\n`;
      if (projects) content += `## Projects\n${projects}\n\n`;
      if (certifications) content += `## Certifications\n${certifications}\n\n`;
      if (languages) content += `## Languages\n${languages}\n\n`;
    } else {
      content = "# Sample Resume\n\n## Professional Summary\nExperienced professional with expertise in...\n\n## Work Experience\n...\n\n## Education\n...\n\n## Skills\n...";
    }
    
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

  const shareResume = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Resume',
        text: 'Check out my resume created with GrabYourFuture!',
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Resume Shared",
          description: "Your resume has been shared successfully.",
        });
      })
      .catch((error) => {
        console.error('Error sharing resume:', error);
        toast({
          title: "Sharing Failed",
          description: "There was an error sharing your resume. Please try again.",
          variant: "destructive",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link Copied",
          description: "Resume link copied to clipboard. You can now share it manually.",
        });
      });
    }
  };

  const handlePromptResult = (result: string) => {
    setResumeContent(result);
    setShowMasterPrompt(false);
    
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
          {showMasterPrompt ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">AI Content Generator</h2>
                <button 
                  onClick={() => setShowMasterPrompt(false)}
                  className="text-sm text-primary hover:underline"
                >
                  Switch to Chat Interface
                </button>
              </div>
              <MasterPrompt onPromptResult={handlePromptResult} />
            </div>
          ) : (
            <div className="glass-card p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">AI Resume Assistant</h2>
                <button 
                  onClick={() => setShowMasterPrompt(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Switch to Master Prompts
                </button>
              </div>
              <p className="text-muted-foreground mb-6">
                Chat with our AI to craft perfect resume sections, improve wording, or get career advice.
              </p>
              <ChatInterface />
            </div>
          )}

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

          <div className="flex flex-col gap-3">
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
            
            <button onClick={shareResume} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-secondary transition-colors">
              <Share2 size={20} />
              <span>Share Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
