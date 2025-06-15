
import NavBar from "@/components/NavBar";
import SwipeStack from "@/components/SwipeStack";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Tables } from "@/integrations/supabase/types";

// Define Candidate type based on CardCandidate props
type Candidate = {
  id: string;
  name: string;
  skills: string[];
  education: string;
  location: string;
  atsScore: number;
  verified?: boolean;
};

// Define a type for our new feed structure for recruiters
type RecruiterFeedItem = {
  job: Tables<"jobs">;
  candidates: Candidate[];
};

const Home = () => {
  const userType = "recruiter"; // Hardcode to recruiter as per the new design
  // TODO: Replace with actual auth-based detection and ID
  const currentUserId = "11111111-1111-1111-1111-111111111111"; // Recruiter ID

  const { data: recruiterFeed, isLoading } = useQuery({
    queryKey: ["recruiterFeed", currentUserId],
    queryFn: async (): Promise<RecruiterFeedItem[]> => {
      // 1. Fetch jobs for the current recruiter
      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .eq("recruiter_id", currentUserId);

      if (jobsError) {
        console.error("Error fetching recruiter jobs:", jobsError);
        throw jobsError;
      }
      if (!jobs || jobs.length === 0) {
        return [];
      }

      // 2. Fetch all potential candidates (jobseekers)
      const { data: candidateProfiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, skills, education, location")
        .eq("user_role", "jobseeker");

      if (profilesError) {
        console.error("Error fetching candidate profiles:", profilesError);
        throw profilesError;
      }
      if (!candidateProfiles || candidateProfiles.length === 0) {
        return [];
      }

      // 3. For each job, find matching candidates
      const feedWithCandidates = jobs
        .map((job) => {
          const jobSkills = new Set(job.tags || []);
          if (jobSkills.size === 0) {
            return { job, candidates: [] };
          }

          const matchedCandidates: Candidate[] = candidateProfiles
            .map((profile): Candidate | null => {
              const candidateSkills = new Set(profile.skills || []);
              if (candidateSkills.size === 0) return null;

              const sharedSkills = [...candidateSkills].filter((skill) =>
                jobSkills.has(skill)
              );

              const matchPercentage =
                jobSkills.size > 0
                  ? sharedSkills.length / jobSkills.size
                  : 0;

              // Match if at least 50% of job skills are present
              if (matchPercentage >= 0.5) {
                return {
                  id: profile.id,
                  name: profile.full_name || "Anonymous Candidate",
                  skills: profile.skills || [],
                  education: profile.education || "No education listed",
                  location: profile.location || "Remote",
                  atsScore: parseFloat((matchPercentage * 5).toFixed(1)),
                  verified: false,
                };
              }
              return null;
            })
            .filter((c): c is Candidate => c !== null);

          return { job, candidates: matchedCandidates };
        })
        .filter((item) => item.candidates.length > 0);

      return feedWithCandidates;
    },
    enabled: !!currentUserId && userType === "recruiter",
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
      <NavBar />
      <main className="flex-1 flex overflow-x-auto">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 space-x-8">
            {[1, 2].map((i) => (
              <div key={i} className="flex-shrink-0 w-full max-w-xl">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="w-full bg-white rounded-2xl border shadow-xl p-7 flex flex-col gap-4 min-h-[500px]">
                  <div className="flex gap-4 items-start">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : recruiterFeed && recruiterFeed.length > 0 ? (
          <div className="flex-1 flex p-4 sm:p-6 lg:p-8 space-x-8">
            {recruiterFeed.map(({ job, candidates }) => (
              <div
                key={job.id}
                className="flex-shrink-0 w-full max-w-xl flex flex-col"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4 self-start px-2">
                  {job.title}
                </h2>
                <SwipeStack feed={candidates} userType="recruiter" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center p-4">
              <h2 className="text-2xl font-bold text-gray-700">
                No Candidate Matches Yet
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Once jobseekers who match your posted jobs start swiping, they
                will appear here. Keep checking back!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
