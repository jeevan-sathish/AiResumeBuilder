
import { useState } from "react";
import { getGeminiResponse } from "@/lib/gemini";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MasterPromptProps {
  onPromptResult: (result: string) => void;
}

const masterPromptTemplates = [
  {
    title: "Professional Summary",
    prompt: "Create a professional summary for a resume highlighting expertise in [FIELD] with [NUMBER] years of experience focusing on [SKILLS].",
    example: "Create a professional summary for a resume highlighting expertise in software development with 5 years of experience focusing on React, Node.js, and cloud infrastructure."
  },
  {
    title: "Job Description",
    prompt: "Write a concise, achievement-focused job description for a [JOB TITLE] role at [COMPANY], highlighting responsibilities in [AREA1], [AREA2], and quantifiable results like [RESULT].",
    example: "Write a concise, achievement-focused job description for a Senior Product Manager role at Microsoft, highlighting responsibilities in product strategy, team leadership, and quantifiable results like 30% revenue growth."
  },
  {
    title: "Skills Section",
    prompt: "Create a comprehensive skills section for a [PROFESSION] resume, organized by categories like [CATEGORY1], [CATEGORY2], and [CATEGORY3].",
    example: "Create a comprehensive skills section for a UX Designer resume, organized by categories like design tools, research methods, and programming languages."
  },
  {
    title: "Achievement Statement",
    prompt: "Transform this basic statement: \"[BASIC STATEMENT]\" into a powerful achievement statement using the STAR method and quantifiable results.",
    example: "Transform this basic statement: \"Managed a team and improved sales\" into a powerful achievement statement using the STAR method and quantifiable results."
  }
];

const MasterPrompt: React.FC<MasterPromptProps> = ({ onPromptResult }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(masterPromptTemplates[0].prompt);
  const [isLoading, setIsLoading] = useState(false);

  const handleTemplateChange = (index: number) => {
    setSelectedTemplate(index);
    setCustomPrompt(masterPromptTemplates[index].prompt);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const promptWithInstructions = `You are a professional resume writer. 
      Your task is to generate high-quality, ATS-friendly resume content based on this request: 
      
      ${customPrompt}
      
      Make the content concise, impactful, and focused on achievements and metrics where applicable.
      Optimize for ATS systems by using relevant keywords.
      Use professional language and avoid clichés.
      Format appropriately for a resume section.
      Maximum length: 250 words.`;
      
      const response = await getGeminiResponse(promptWithInstructions);
      onPromptResult(response);
      toast({
        title: "Content Generated",
        description: "Your resume content has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">AI Resume Assistant</h2>
      <p className="text-muted-foreground mb-6">
        Use master prompts to generate optimized resume content using AI.
      </p>

      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {masterPromptTemplates.map((template, index) => (
              <button
                key={index}
                className={`p-3 rounded-lg border text-left ${
                  selectedTemplate === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary"
                }`}
                onClick={() => handleTemplateChange(index)}
              >
                <h3 className="font-medium">{template.title}</h3>
              </button>
            ))}
          </div>
          
          <div className="mb-4">
            <Textarea
              placeholder="Enter your prompt..."
              className="min-h-[100px]"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            <span className="font-medium">Example:</span> {masterPromptTemplates[selectedTemplate].example}
          </p>
          
          <Button
            onClick={handleSubmit}
            className="w-full justify-center"
            disabled={isLoading || !customPrompt.trim()}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MasterPrompt;
