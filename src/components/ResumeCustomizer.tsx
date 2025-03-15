
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const fontOptions = [
  { id: "sans", name: "Sans-serif", value: "font-sans" },
  { id: "serif", name: "Serif", value: "font-serif" },
  { id: "mono", name: "Monospace", value: "font-mono" },
];

const sizeOptions = [
  { id: "sm", name: "Small", value: "text-sm" },
  { id: "md", name: "Medium", value: "text-base" },
  { id: "lg", name: "Large", value: "text-lg" },
];

const colorOptions = [
  { id: "blue", name: "Blue", value: "#3b82f6" },
  { id: "indigo", name: "Indigo", value: "#6366f1" },
  { id: "purple", name: "Purple", value: "#8b5cf6" },
  { id: "green", name: "Green", value: "#10b981" },
  { id: "red", name: "Red", value: "#ef4444" },
  { id: "gray", name: "Gray", value: "#6b7280" },
  { id: "black", name: "Black", value: "#000000" },
];

interface ResumeCustomizerProps {
  font: string;
  fontSize: string;
  accentColor: string;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

const ResumeCustomizer: React.FC<ResumeCustomizerProps> = ({
  font,
  fontSize,
  accentColor,
  onFontChange,
  onFontSizeChange,
  onColorChange,
}) => {
  const [fontOpen, setFontOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const getCurrentFontName = () => {
    return fontOptions.find(option => option.id === font)?.name || "Sans-serif";
  };

  const getCurrentSizeName = () => {
    return sizeOptions.find(option => option.id === fontSize)?.name || "Medium";
  };

  return (
    <div className="space-y-6">
      {/* Font Family Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Font Family</label>
        <div className="relative">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-2 border border-border rounded-lg bg-background"
            onClick={() => setFontOpen(!fontOpen)}
          >
            <span>{getCurrentFontName()}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {fontOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md glass-card shadow-lg animate-fade-in">
              <ul className="py-1">
                {fontOptions.map((option) => (
                  <li
                    key={option.id}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-accent flex items-center justify-between ${
                      font === option.id ? "text-primary" : ""
                    }`}
                    onClick={() => {
                      onFontChange(option.id);
                      setFontOpen(false);
                    }}
                  >
                    <span className={option.value}>{option.name}</span>
                    {font === option.id && <Check className="h-4 w-4" />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Font Size Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Font Size</label>
        <div className="relative">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-2 border border-border rounded-lg bg-background"
            onClick={() => setSizeOpen(!sizeOpen)}
          >
            <span>{getCurrentSizeName()}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {sizeOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md glass-card shadow-lg animate-fade-in">
              <ul className="py-1">
                {sizeOptions.map((option) => (
                  <li
                    key={option.id}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-accent flex items-center justify-between ${
                      fontSize === option.id ? "text-primary" : ""
                    }`}
                    onClick={() => {
                      onFontSizeChange(option.id);
                      setSizeOpen(false);
                    }}
                  >
                    <span>{option.name}</span>
                    {fontSize === option.id && <Check className="h-4 w-4" />}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Color Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Accent Color</label>
        <div className="grid grid-cols-7 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.id}
              type="button"
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                accentColor === color.id ? "ring-2 ring-offset-2 ring-primary" : ""
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => onColorChange(color.id)}
              aria-label={`Select ${color.name} color`}
            >
              {accentColor === color.id && (
                <Check className="h-4 w-4 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeCustomizer;
