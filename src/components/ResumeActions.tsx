
import { Download, Share2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ResumeStrength } from "@/hooks/use-resume-data";

interface ResumeActionsProps {
  isAnalyzing: boolean;
  resumeContent: string;
  locationState: any;
  analyzeResume: () => void;
}

const ResumeActions = ({ isAnalyzing, resumeContent, locationState, analyzeResume }: ResumeActionsProps) => {
  const downloadResume = () => {
    let content = "";
    
    if (resumeContent) {
      content = resumeContent;
    } else if (locationState?.resumeData) {
      const { fullName, email, phone, location: userLocation, summary, workExperience, education, skills, certifications, languages, projects } = locationState.resumeData;
      
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

  return (
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
  );
};

export default ResumeActions;
