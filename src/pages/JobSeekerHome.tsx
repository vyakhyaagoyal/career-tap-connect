
import NavBar from "@/components/NavBar";
import SwipeStack from "@/components/SwipeStack";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { mockFeedJobs } from "@/utils/mockData";

type Job = {
  id: string;
  title: string;
  pay: string;
  company: string;
  location: string;
  tags: string[];
  verified?: boolean;
  description: string;
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
  };
};

const JobSeekerHome = () => {
  const { data: jobSeekerFeed, isLoading } = useQuery({
    queryKey: ["jobSeekerFeed", "mock"],
    queryFn: async (): Promise<Job[]> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // In a real app, you'd fetch jobs relevant to the user's profile
      return mockFeedJobs.map((job) => ({
        ...job,
        tags: job.tags || [],
        description: `Join our dynamic team at ${job.company} to build amazing user interfaces and shape the future of web development. We value creativity and collaboration. This is an exciting role for a ${job.title}.`,
        socials: {
            github: `https://github.com/${job.company.toLowerCase().replace(/\s/g, '')}`,
            linkedin: `https://linkedin.com/company/${job.company.toLowerCase().replace(/\s/g, '')}`,
            x: `https://x.com/${job.company.toLowerCase().replace(/\s/g, '')}`,
        }
      }));
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {isLoading ? (
          <div className="flex-shrink-0 w-full max-w-xl">
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
        ) : jobSeekerFeed && jobSeekerFeed.length > 0 ? (
          <div className="w-full max-w-xl">
            <SwipeStack feed={jobSeekerFeed} userType="jobseeker" />
          </div>
        ) : (
          <div className="text-center p-4">
            <h2 className="text-2xl font-bold text-gray-700">
              No Jobs Found
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              We couldn't find any open positions right now. Please check back later!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobSeekerHome;
