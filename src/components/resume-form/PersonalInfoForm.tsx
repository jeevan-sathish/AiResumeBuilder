
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoForm = ({ formData, handleChange }: PersonalInfoFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            placeholder="John Doe" 
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              name="phone" 
              placeholder="(123) 456-7890" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            name="location" 
            placeholder="City, State, Country" 
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea 
            id="summary" 
            name="summary" 
            placeholder="Write a brief summary of your professional background and goals..." 
            rows={4}
            value={formData.summary}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
