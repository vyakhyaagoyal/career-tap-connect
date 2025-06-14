
import NavBar from "@/components/NavBar";
import SwipeStack from "@/components/SwipeStack";
import { mockFeedJobs, mockFeedCandidates } from "@/utils/mockData";
import { useState } from "react";

const userType = "jobseeker"; // Replace with actual auth-based detection

const Home = () => {
  // We'll switch mock feed for demonstration based on user type
  const feed = userType === "jobseeker" ? mockFeedJobs : mockFeedCandidates;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
      <NavBar />
      <div className="flex-1 flex justify-center items-center px-3 py-6">
        <div className="w-full max-w-xl flex flex-col gap-4 items-center">
          <SwipeStack
            feed={feed}
            userType={userType}
          />
          <div className="w-full flex justify-between mt-2">
            <div className="text-sm text-muted-foreground">Swipe left: Skip</div>
            <div className="text-sm text-muted-foreground">Swipe right: Interested</div>
            <div className="text-sm text-muted-foreground">Swipe up: Waitlist</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
