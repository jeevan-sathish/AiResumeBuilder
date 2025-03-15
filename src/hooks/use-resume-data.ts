
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export type ResumeData = {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  workExperience?: string;
  education?: string;
  skills?: string;
  certifications?: string;
  languages?: string;
  projects?: string;
};

export type ResumeStrength = {
  category: string;
  score: number;
};

export function useResumeData() {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strengths, setStrengths] = useState<ResumeStrength[]>([
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
      
      if (location.state.analyze) {
        analyzeResume(location.state.resumeData);
      }
    }
  }, [location.state]);

  const analyzeResume = async (data?: ResumeData) => {
    setIsAnalyzing(true);
    
    try {
      const resumeData = data || location.state?.resumeData || {};
      
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

  return {
    userName,
    resumeContent,
    isAnalyzing,
    strengths,
    setResumeContent,
    analyzeResume
  };
}
