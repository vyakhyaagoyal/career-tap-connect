import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "LinkMatch";
  }, []);
  
  const handleGetStarted = () => {
    navigate("/home");
  };

  const handleMyProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff] flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fade-in text-center drop-shadow">
          LinkMatch
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-center max-w-2xl animate-fade-in">
          The world's first swiping-based, verified hiring platform for Jobs & Internships.<br />
          Discover the perfect role or candidate—with AI matching, ATS scoring, and real verification.
        </p>
        <div className="flex flex-col md:flex-row gap-4 animate-scale-in">
          <button
            onClick={handleGetStarted}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold shadow-lg hover-scale text-lg transition-all hover:bg-primary/90"
          >
            Get Started
          </button>
          <button
            onClick={handleMyProfile}
            className="bg-white border border-primary px-8 py-4 rounded-xl font-bold text-primary shadow-sm hover-scale text-lg transition-all hover:bg-primary hover:text-white"
          >
            My Profile
          </button>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 max-w-xl mx-auto w-full">
          <div className="flex gap-3">
            <FeatureChip>🌀 Swipe to Match</FeatureChip>
            <FeatureChip>✅ Verified Profiles</FeatureChip>
          </div>
          <div className="flex gap-3">
            <FeatureChip>🤖 AI-Powered Matching</FeatureChip>
            <FeatureChip>⭐ ATS Resume Score</FeatureChip>
          </div>
        </div>
      </div>
    </div>
  );
};

function FeatureChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-4 py-1 text-base bg-white hover:bg-primary/10 cursor-pointer font-semibold transition shadow-sm">
      {children}
    </span>
  );
}

export default Index;
