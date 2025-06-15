
import NavBar from "@/components/NavBar";
import SwipeStack from "@/components/SwipeStack";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { mockFeedJobs } from "@/utils/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Job = {
  id: string;
  title: string;
  pay: string;
  company: string;
  companyPhotoUrl?: string;
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

// New type for the feed, grouping jobs by company
type CompanyFeedItem = {
  companyName: string;
  companyPhotoUrl?: string;
  jobs: Job[];
};

const JobSeekerHome = () => {
  const { data: jobSeekerFeed, isLoading } = useQuery({
    queryKey: ["jobSeekerFeedGrouped", "mock"],
    queryFn: async (): Promise<CompanyFeedItem[]> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const placeholderPhotos = [
        'photo-1488590528505-98d2b5aba04b',
        'photo-1486312338219-ce68d2c6f44d',
        'photo-1460925895917-afdab827c52f',
        'photo-1483058712412-4245e9b90334',
        'photo-1498050108023-c5249f4df085',
        'photo-1496307653780-42ee777d4833',
      ];

      // In a real app, you'd fetch jobs relevant to the user's profile
      const allJobs: Job[] = mockFeedJobs.map((job, index) => ({
        ...job,
        companyPhotoUrl: `https://images.unsplash.com/${placeholderPhotos[index % placeholderPhotos.length]}?q=80&w=400&auto=format&fit=crop`,
        tags: job.tags || [],
        description: `Join our dynamic team at ${job.company} to build amazing user interfaces and shape the future of web development. We value creativity and collaboration. This is an exciting role for a ${job.title}.`,
        socials: {
            github: `https://github.com/${job.company.toLowerCase().replace(/\s/g, '')}`,
            linkedin: `https://linkedin.com/company/${job.company.toLowerCase().replace(/\s/g, '')}`,
            x: `https://x.com/${job.company.toLowerCase().replace(/\s/g, '')}`,
        }
      }));

      // Group jobs by company
      const jobsByCompany = allJobs.reduce((acc, job) => {
        const companyName = job.company;
        if (!acc[companyName]) {
          acc[companyName] = {
            companyName: companyName,
            companyPhotoUrl: job.companyPhotoUrl, // Assume first job's photo is representative for the group
            jobs: []
          };
        }
        acc[companyName].jobs.push(job);
        return acc;
      }, {} as Record<string, CompanyFeedItem>);

      return Object.values(jobsByCompany);
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
          </div>
        ) : jobSeekerFeed && jobSeekerFeed.length > 0 ? (
          <div className="flex-1 flex justify-center items-center w-full p-4">
            <Carousel className="w-full max-w-2xl" opts={{ loop: false }}>
              <CarouselContent>
                {jobSeekerFeed.map(({ companyName, jobs }) => (
                  <CarouselItem key={companyName}>
                    <div className="p-1">
                      <div className="w-full max-w-xl flex flex-col mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 self-start px-2">
                          Jobs at {companyName}
                        </h2>
                        <SwipeStack feed={jobs} userType="jobseeker" />
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
                No Jobs Found
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                We couldn't find any open positions right now. Please check back later!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobSeekerHome;
