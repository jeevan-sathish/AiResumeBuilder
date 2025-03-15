
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SkillsAdditionalFormProps {
  formData: {
    skills: string;
    certifications: string;
    languages: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SkillsAdditionalForm = ({ formData, handleChange }: SkillsAdditionalFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Skills & Additional Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="skills">Skills</Label>
          <Textarea 
            id="skills" 
            name="skills" 
            placeholder="List your technical and soft skills..." 
            rows={4}
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="certifications">Certifications</Label>
          <Textarea 
            id="certifications" 
            name="certifications" 
            placeholder="List any relevant certifications with name, issuing organization, and date..." 
            rows={3}
            value={formData.certifications}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="languages">Languages</Label>
          <Textarea 
            id="languages" 
            name="languages" 
            placeholder="List languages you speak and your proficiency level..." 
            rows={2}
            value={formData.languages}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsAdditionalForm;
