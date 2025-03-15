
import { useState, useEffect } from "react";
import ChatInterface from "./ChatInterface";
import ResumeLayouts from "./ResumeLayouts";
import ResumeCustomizer from "./ResumeCustomizer";
import ResumeStrength from "./ResumeStrength";
import { Download, FileText, Share2, AlertCircle } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";
import { toast } from "@/hooks/use-toast";

const ResumeBuilder = () => {
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

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const analyzeResume = async () => {
    // In a real app, we'd send the actual resume content
    // For demo purposes, we'll just randomize the scores
    setIsAnalyzing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate new random scores
      const newStrengths = [
        { category: "ATS Compatibility", score: Math.floor(Math.random() * 15) + 80 },
        { category: "Content Quality", score: Math.floor(Math.random() * 20) + 75 },
        { category: "Keyword Optimization", score: Math.floor(Math.random() * 25) + 70 },
        { category: "Format & Structure", score: Math.floor(Math.random() * 15) + 80 },
        { category: "Impact Statements", score: Math.floor(Math.random() * 20) + 75 },
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
          {/* AI Chat Interface */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">AI Resume Assistant</h2>
            <p className="text-muted-foreground mb-6">
              Chat with our AI to craft perfect resume sections, improve wording, or get career advice.
            </p>
            <ChatInterface />
          </div>

          {/* Resume Layouts */}
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
          {/* Resume Customizer */}
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

          {/* Resume Strength Analysis */}
          <ResumeStrength scores={strengths} />

          {/* Action Buttons */}
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
            
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-secondary transition-colors">
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
