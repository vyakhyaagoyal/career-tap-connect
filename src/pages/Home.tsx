
import NavBar from "@/components/NavBar";
import SwipeStack from "@/components/SwipeStack";
import { mockFeedCandidates } from "@/utils/mockData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const userType = "jobseeker"; // Replace with actual auth-based detection

  // TODO: Replace with actual logged-in user ID after implementing auth
  const currentUserId = "22222222-2222-2222-2222-222222222222";

  const { data: feed, isLoading } = useQuery({
    queryKey: ['feed', userType, currentUserId],
    queryFn: async () => {
      if (userType === 'jobseeker') {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('skills')
          .eq('id', currentUserId)
          .single();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          // Return empty or handle error, maybe user has no profile yet
          return [];
        }
        const jobseekerSkills = new Set(profile?.skills || []);

        if (jobseekerSkills.size === 0) return []; // No skills, no matches

        const { data: jobs, error: jobsError } = await supabase
          .from('jobs')
          .select('*');

        if (jobsError) throw jobsError;

        const matchedJobs = jobs.filter(job => {
          if (!job.tags || job.tags.length === 0) return false;
          
          const jobSkills = new Set(job.tags);
          const sharedSkills = [...jobseekerSkills].filter(skill => jobSkills.has(skill));
          
          const matchPercentage = (sharedSkills.length / job.tags.length);
          
          return matchPercentage >= 0.7;
        });
        
        return matchedJobs;
      } else { // recruiter
        // TODO: Implement candidate matching for recruiters
        return mockFeedCandidates;
      }
    },
    enabled: !!currentUserId,
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
      <NavBar />
      <div className="flex-1 flex justify-center items-center px-3 py-6 pb-28">
        <div className="w-full max-w-xl flex flex-col gap-4 items-center">
          {isLoading ? (
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
          ) : (
            <SwipeStack
              feed={feed || []}
              userType={userType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
