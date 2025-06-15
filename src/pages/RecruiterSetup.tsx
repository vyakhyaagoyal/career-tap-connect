
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { toast } from "@/hooks/use-toast";

const RecruiterSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    recruiterName: "",
    email: "",
    position: "",
    companySize: "",
    industry: "",
    location: "",
    website: "",
    description: ""
  });

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "Manufacturing", "Consulting", "Other"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store recruiter data (integrate with your backend later)
    localStorage.setItem("recruiterData", JSON.stringify(formData));
    toast({
      title: "Profile Created!",
      description: "Your recruiter profile has been set up successfully.",
    });
    navigate("/home");
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff] flex flex-col">
      <NavBar />
      <div className="flex-1 px-4 max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-extrabold mb-2 text-center">Set Up Your Recruiter Profile</h1>
        <p className="text-muted-foreground mb-8 text-center">Tell us about your company and what you're looking for</p>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                placeholder="Enter company name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Your Name *</label>
              <input
                type="text"
                name="recruiterName"
                value={formData.recruiterName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Your Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                placeholder="e.g., HR Manager, Talent Acquisition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Company Size *</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                required
              >
                <option value="">Select company size</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size} employees</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                required
              >
                <option value="">Select industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                placeholder="City, Country"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Company Website *</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 outline-primary"
                placeholder="https://company.com"
                required
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2">Company Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full border rounded-lg px-3 py-2 outline-primary resize-none"
              placeholder="Tell us about your company, culture, and what makes it special..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className={`mt-8 w-full px-6 py-3 rounded-lg font-semibold transition-all ${
              isFormValid 
                ? "bg-primary text-white hover:bg-primary/90 hover:scale-105" 
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterSetup;
