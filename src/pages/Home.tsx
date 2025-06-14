
import NavBar from "@/components/NavBar";
import SwipeStack from "@/components/SwipeStack";
import { mockFeedJobs, mockFeedCandidates } from "@/utils/mockData";
import { useSearchParams } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userType = searchParams.get("userType");

  const handleRoleSelect = (role: "jobseeker" | "recruiter") => {
    setSearchParams({ userType: role });
  };

  if (!userType || (userType !== "jobseeker" && userType !== "recruiter")) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
        <NavBar />
        <div className="flex-1 flex justify-center items-center px-4 py-6">
          <div className="w-full max-w-2xl text-center animate-fade-in">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
              Choose Your Role
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Are you looking for your next career move, or searching for the
              perfect candidate?
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => handleRoleSelect("jobseeker")}
                className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <Briefcase className="w-16 h-16 mb-4 text-primary" />
                <h2 className="text-2xl font-bold text-gray-800">
                  I'm a Job Seeker
                </h2>
                <p className="text-gray-500 mt-2">
                  Find your dream job or internship.
                </p>
              </button>
              <button
                onClick={() => handleRoleSelect("recruiter")}
                className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <Users className="w-16 h-16 mb-4 text-primary" />
                <h2 className="text-2xl font-bold text-gray-800">
                  I'm a Recruiter
                </h2>
                <p className="text-gray-500 mt-2">
                  Discover top talent for your company.
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // We'll switch mock feed for demonstration based on user type
  const feed = userType === "jobseeker" ? mockFeedJobs : mockFeedCandidates;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
      <NavBar />
      <div className="flex-1 flex justify-center items-center px-3 py-6 pb-28">
        <div className="w-full max-w-xl flex flex-col gap-4 items-center">
          <SwipeStack
            feed={feed}
            userType={userType as "jobseeker" | "recruiter"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
