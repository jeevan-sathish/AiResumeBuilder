
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg px-6 py-4 ${
        scrolled
          ? "glass-panel shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="font-display text-2xl font-bold text-foreground"
        >
          Grab<span className="text-gradient">Your</span>Future
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`transition-all duration-300 hover:text-primary ${
              location.pathname === "/" ? "text-primary font-medium" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/build-resume"
            className={`transition-all duration-300 hover:text-primary ${
              location.pathname === "/build-resume" ? "text-primary font-medium" : ""
            }`}
          >
            Build Resume
          </Link>
          <Link
            to="/builder"
            className={`transition-all duration-300 hover:text-primary ${
              location.pathname === "/builder" ? "text-primary font-medium" : ""
            }`}
          >
            AI Assistant
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel py-4 animate-fade-in">
          <div className="container mx-auto flex flex-col space-y-4 px-6">
            <Link
              to="/"
              className={`transition-all duration-300 hover:text-primary ${
                location.pathname === "/" ? "text-primary font-medium" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/build-resume"
              className={`transition-all duration-300 hover:text-primary ${
                location.pathname === "/build-resume" ? "text-primary font-medium" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Build Resume
            </Link>
            <Link
              to="/builder"
              className={`transition-all duration-300 hover:text-primary ${
                location.pathname === "/builder" ? "text-primary font-medium" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
