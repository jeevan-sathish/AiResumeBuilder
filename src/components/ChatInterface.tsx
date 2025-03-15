
import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { getGeminiResponse, preprocessGeminiResponse } from "@/lib/gemini";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  points?: string[];
  highlights?: string[];
};

const systemPrompt = `You are a professional resume writing assistant. Help the user create or improve their resume sections. 
Focus on providing concise, impactful content that highlights their strengths. Format key skills or important points with ** around them for emphasis.
Use bullet points for lists. Keep responses under 300 words and focus on being ATS-friendly.`;

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-greeting",
      sender: "ai",
      text: "Hello! I'm your resume assistant. I can help you craft perfect resume sections, improve your existing content, or answer questions about resume best practices. What would you like help with today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare context with previous messages
      const context = messages.slice(-4).map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
      const fullPrompt = `${systemPrompt}\n\nConversation history:\n${context}\n\nUser: ${input}\n\nAssistant:`;
      
      const response = await getGeminiResponse(fullPrompt);
      const { points, highlights } = preprocessGeminiResponse(response);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: response,
        points,
        highlights,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] glass-card rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`chat-bubble ${
                  message.sender === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                } max-w-[85%]`}
              >
                {message.points && message.points.length > 0 && message.sender === "ai" ? (
                  <div className="space-y-2">
                    {message.points.map((point, index) => (
                      <p key={index} className="text-left">
                        {message.highlights && message.highlights.length > 0
                          ? highlightText(point, message.highlights)
                          : point}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-left">{message.text}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="chat-bubble chat-bubble-ai animate-pulse flex items-center">
                <span className="loading-dots">Loading</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper function to highlight text
function highlightText(text: string, highlights: string[]): JSX.Element {
  if (!highlights.length) return <>{text}</>;

  let result = text;
  let parts = [];
  let lastIndex = 0;

  highlights.forEach((highlight) => {
    const index = result.toLowerCase().indexOf(highlight.toLowerCase());
    if (index !== -1) {
      // Add text before the highlight
      if (index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{result.substring(lastIndex, index)}</span>);
      }
      
      // Add the highlighted text
      parts.push(
        <span key={`highlight-${index}`} className="font-medium text-primary">
          {result.substring(index, index + highlight.length)}
        </span>
      );
      
      lastIndex = index + highlight.length;
    }
  });

  // Add any remaining text
  if (lastIndex < result.length) {
    parts.push(<span key={`text-end`}>{result.substring(lastIndex)}</span>);
  }

  return <>{parts.length ? parts : text}</>;
}

export default ChatInterface;
