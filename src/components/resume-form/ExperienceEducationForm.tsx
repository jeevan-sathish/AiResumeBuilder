
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceEducationFormProps {
  formData: {
    workExperience: string;
    education: string;
    projects: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ExperienceEducationForm = ({ formData, handleChange }: ExperienceEducationFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Experience & Education</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="workExperience">Work Experience</Label>
          <Textarea 
            id="workExperience" 
            name="workExperience" 
            placeholder="List your work experiences with job title, company, dates, and key responsibilities..." 
            rows={6}
            value={formData.workExperience}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="education">Education</Label>
          <Textarea 
            id="education" 
            name="education" 
            placeholder="List your educational background with degree, institution, dates, and any notable achievements..." 
            rows={4}
            value={formData.education}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="projects">Projects</Label>
          <Textarea 
            id="projects" 
            name="projects" 
            placeholder="List any notable projects with descriptions, technologies used, and outcomes..." 
            rows={4}
            value={formData.projects}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceEducationForm;
