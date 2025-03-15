
import { useState } from "react";
import { Check } from "lucide-react";

type Layout = {
  id: string;
  name: string;
  description: string;
  atsScore: number;
};

const layouts: Layout[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout with clean sections and a professional look.",
    atsScore: 95,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a sleek, minimalist approach.",
    atsScore: 92,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior professionals and leadership roles.",
    atsScore: 97,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stylish layout that maintains ATS compatibility for creative fields.",
    atsScore: 88,
  },
];

interface ResumeLayoutsProps {
  selectedLayout: string;
  onSelectLayout: (id: string) => void;
}

const ResumeLayouts: React.FC<ResumeLayoutsProps> = ({ selectedLayout, onSelectLayout }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {layouts.map((layout) => (
        <div
          key={layout.id}
          className={`layout-card ${selectedLayout === layout.id ? "active" : ""}`}
          onClick={() => onSelectLayout(layout.id)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg">{layout.name}</h3>
            {selectedLayout === layout.id && (
              <div className="bg-primary rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{layout.description}</p>
          <div className="flex items-center gap-2">
            <div className="text-xs font-medium">ATS Score:</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full flex-1">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${layout.atsScore}%` }}
              ></div>
            </div>
            <div className="text-xs font-medium">{layout.atsScore}%</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeLayouts;
