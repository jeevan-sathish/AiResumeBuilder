
import ResumeLayouts from "@/components/ResumeLayouts";

interface LayoutSelectionProps {
  selectedLayout: string;
  onSelectLayout: (layout: string) => void;
}

const LayoutSelection = ({ selectedLayout, onSelectLayout }: LayoutSelectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Choose a Layout</h2>
      <ResumeLayouts 
        selectedLayout={selectedLayout}
        onSelectLayout={onSelectLayout}
      />
    </div>
  );
};

export default LayoutSelection;
