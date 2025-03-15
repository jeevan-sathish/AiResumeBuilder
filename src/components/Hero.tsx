
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Hero = () => {
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowNameInput(true);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      toast({
        title: `Welcome, ${name}!`,
        description: "Let's build your professional resume together.",
      });
      navigate('/builder');
    } else {
      toast({
        title: "Name is required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0"></div>
      
      <div className="container relative z-10 flex flex-col items-center text-center max-w-4xl animate-slide-up">
        <div className="inline-block mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            AI-Powered Resume Builder
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Craft an <span className="text-gradient">ATS-Friendly</span> Resume That Gets You Hired
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
          Our AI-powered platform helps you create a professional resume with perfect sentence framing 
          and ATS-optimized layouts that land interviews.
        </p>
        
        {!showNameInput ? (
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-lg hover:translate-y-[-2px]"
          >
            Get Started
            <ArrowRight size={18} />
          </button>
        ) : (
          <form 
            onSubmit={handleContinue}
            className="w-full max-w-md glass-card p-6 rounded-2xl animate-scale-in"
          >
            <label htmlFor="name" className="block text-left mb-2 font-medium">
              What's your name?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
