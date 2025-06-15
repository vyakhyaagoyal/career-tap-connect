
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: "jobseeker" | "recruiter") => {
    // Store role in localStorage for now (you can integrate with auth later)
    localStorage.setItem("userRole", role);
    
    if (role === "jobseeker") {
      navigate("/profile");
    } else {
      navigate("/recruiter-setup");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff] flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in text-center">
          Choose Your Role
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-2xl animate-fade-in">
          Are you looking for opportunities or seeking talent?
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl animate-scale-in">
          <div 
            onClick={() => handleRoleSelection("jobseeker")}
            className="flex-1 bg-white border-2 border-primary/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 hover:border-primary/40"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Seeker</h2>
              <p className="text-gray-600 mb-6">
                Find your perfect job or internship opportunity. Upload your resume and get matched with relevant positions.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Resume Upload</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">AI Matching</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Direct Applications</span>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => handleRoleSelection("recruiter")}
            className="flex-1 bg-white border-2 border-primary/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 hover:border-primary/40"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recruiter</h2>
              <p className="text-gray-600 mb-6">
                Post job openings and find qualified candidates. Use AI-powered matching to discover the best talent.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Job Posting</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Candidate Search</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">ATS Integration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
