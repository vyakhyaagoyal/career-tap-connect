import NavBar from "@/components/NavBar";
import SwipeStack from "@/components/SwipeStack";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Tables } from "@/integrations/supabase/types";
import { mockFeedJobs, mockFeedCandidates } from "@/utils/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define Candidate type based on CardCandidate props
type Candidate = {
  id: string;
  name: string;
  skills: string[];
  education: string;
  location: string;
  atsScore: number;
  verified?: boolean;
  photoUrl?: string;
  resumeUrl?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
  };
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
    queryKey: ["recruiterFeed", currentUserId, "mock"],
    queryFn: async (): Promise<RecruiterFeedItem[]> => {
      // Simulate network delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      const jobs = mockFeedJobs.map(job => ({
          ...job,
          id: job.id, 
          recruiter_id: currentUserId,
          created_at: new Date().toISOString(),
          tags: job.tags || [],
      })) as Tables<'jobs'>[];
      
      const candidateProfiles = mockFeedCandidates.map(candidate => ({
          id: candidate.id,
          full_name: candidate.name,
          skills: candidate.skills,
          education: candidate.education,
          location: candidate.location,
          user_role: 'jobseeker',
          email: `${candidate.name.replace(/\s+/g, '.').toLowerCase()}@example.com`
      })) as Tables<'profiles'>[];

      // For each job, find matching candidates
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

              // Match if at least 70% of job skills are present
              if (matchPercentage >= 0.7) {
                const mockCandidateData = mockFeedCandidates.find(c => c.id === profile.id);
                return {
                  id: profile.id,
                  name: profile.full_name || "Anonymous Candidate",
                  skills: profile.skills || [],
                  education: profile.education || "No education listed",
                  location: profile.location || "Remote",
                  atsScore: Math.round(matchPercentage * 100),
                  verified: mockCandidateData?.verified || false,
                  photoUrl: mockCandidateData?.photoUrl,
                  resumeUrl: mockCandidateData?.resumeUrl,
                  socials: mockCandidateData?.socials,
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
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
      <NavBar />
      <main className="flex-1 flex overflow-hidden items-center">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="flex-shrink-0 w-full max-w-xl">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="w-full bg-white rounded-2xl border shadow-xl p-7 flex flex-col gap-4 min-h-[500px]">
                <div className="flex gap-4 items-start">
                  <Skeleton className="w-20 h-20 rounded-full" />
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
          </div>
        ) : recruiterFeed && recruiterFeed.length > 0 ? (
          <div className="flex-1 flex justify-center items-center w-full p-4">
            <Carousel className="w-full max-w-2xl" opts={{ loop: false }}>
              <CarouselContent>
                {recruiterFeed.map(({ job, candidates }) => (
                  <CarouselItem key={job.id}>
                    <div className="p-1">
                      <div className="w-full max-w-xl flex flex-col mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 self-start px-2">
                          {job.title}
                        </h2>
                        <SwipeStack feed={candidates} userType="recruiter" />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
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
