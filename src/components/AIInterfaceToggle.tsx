
import { useState } from "react";
import ChatInterface from "./ChatInterface";
import MasterPrompt from "./MasterPrompt";

interface AIInterfaceToggleProps {
  onPromptResult: (result: string) => void;
}

const AIInterfaceToggle = ({ onPromptResult }: AIInterfaceToggleProps) => {
  const [showMasterPrompt, setShowMasterPrompt] = useState(false);

  return (
    <div className="glass-card p-6 rounded-xl">
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
          <MasterPrompt onPromptResult={(result) => {
            onPromptResult(result);
            setShowMasterPrompt(false);
          }} />
        </div>
      ) : (
        <div>
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
    </div>
  );
};

export default AIInterfaceToggle;
