
import { Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel mt-20 py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold mb-2">
              Grab<span className="text-gradient">Your</span>Future
            </h3>
            <p className="text-muted-foreground">
              Build an ATS-friendly resume that stands out
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a
              href="mailto:sathishjeevan2004@gmail.com"
              className="flex items-center gap-2 transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail size={18} />
              <span>sathishjeevan2004@gmail.com</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {currentYear} GrabYourFuture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
