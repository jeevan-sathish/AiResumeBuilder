
import { Download, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResumeFormActionsProps {
  isAnalyzing: boolean;
  analyzeResume: () => Promise<void>;
  downloadResume: () => void;
}

const ResumeFormActions = ({ isAnalyzing, analyzeResume, downloadResume }: ResumeFormActionsProps) => {
  return (
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
  );
};

export default ResumeFormActions;
