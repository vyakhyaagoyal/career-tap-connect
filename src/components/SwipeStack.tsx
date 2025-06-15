import { useState } from "react";
import CardJob from "./CardJob";
import CardCandidate from "./CardCandidate";
import { Heart, X, ArrowUp } from "lucide-react";

type Job = {
  id: string;
  title: string;
  pay: string;
  company: string;
  location: string;
  tags: string[];
  verified?: boolean;
};
type Candidate = {
  id: string;
  name: string;
  skills: string[];
  education: string;
  location: string;
  atsScore: number;
  verified?: boolean;
};

type Props = {
  feed: Job[] | Candidate[];
  userType: "jobseeker" | "recruiter";
};

const SwipeStack = ({ feed, userType }: Props) => {
  const [current, setCurrent] = useState(0);
  const [swipeDir, setSwipeDir] = useState<null | "left" | "right" | "up">(null);

  const onSwipe = (dir: "left" | "right" | "up") => {
    const cardData = feed[current];
    if (!cardData) return;

    setSwipeDir(dir);

    setTimeout(() => {
      setSwipeDir(null);
      setCurrent((c) => Math.min(feed.length, c + 1));
    }, 500);
  };

  if (current >= feed.length)
    return (
      <div className="bg-background border rounded-xl shadow-md p-8 flex flex-col items-center animate-fade-in min-h-[500px] justify-center">
        <span className="text-xl font-bold mb-2">No more {userType === "jobseeker" ? "jobs" : "candidates"} right now.</span>
        <span className="text-muted-foreground">Check back later for new matches!</span>
      </div>
    );

  const card = feed[current];

  return (
    <div className="relative w-full min-h-[620px] flex flex-col items-center drop-shadow-lg select-none animate-fade-in">
      <div
        className={`
          absolute w-full transition-all duration-500 ease-in-out
          ${swipeDir === "left" ? "-translate-x-[150vw] -rotate-12 opacity-0 scale-95" : ""}
          ${swipeDir === "right" ? "translate-x-[150vw] rotate-12 opacity-0 scale-95" : ""}
          ${swipeDir === "up" ? "-translate-y-[100vh] opacity-0 scale-90" : ""}
        `}
        style={{ zIndex: 2 }}
      >
        {userType === "jobseeker" ? (
          <CardJob {...(card as Job)} />
        ) : (
          <CardCandidate {...(card as Candidate)} />
        )}
      </div>
      
      {/* Show underlying next card for depth effect */}
      {feed[current + 1] && (
        <div className="absolute w-full scale-95 opacity-60 pointer-events-none top-2 transition-all duration-200" style={{ zIndex: 1 }}>
          {userType === "jobseeker" ? (
            <CardJob {...(feed[current + 1] as Job)} />
          ) : (
            <CardCandidate {...(feed[current + 1] as Candidate)} />
          )}
        </div>
      )}

      {/* Show second underlying card for even more depth */}
      {feed[current + 2] && (
        <div className="absolute w-full scale-90 opacity-30 pointer-events-none top-4 transition-all duration-200" style={{ zIndex: 0 }}>
          {userType === "jobseeker" ? (
            <CardJob {...(feed[current + 2] as Job)} />
          ) : (
            <CardCandidate {...(feed[current + 2] as Candidate)} />
          )}
        </div>
      )}
      
      {/* Enhanced Controls */}
      <div className="absolute -bottom-24 flex gap-6 justify-center w-full z-10">
        <div className="flex flex-col items-center gap-2">
          <button
            aria-label="Pass"
            onClick={() => onSwipe("left")}
            className="bg-white/95 backdrop-blur-sm border-2 border-red-300 text-red-500 p-4 rounded-full shadow-xl hover:bg-red-50 transition-all duration-200 hover:scale-110 hover:shadow-2xl active:scale-95"
          >
            <X className="w-7 h-7" />
          </button>
          <span className="font-bold text-sm text-red-500">Pass</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            aria-label="Waitlist"
            onClick={() => onSwipe("up")}
            className="bg-white/95 backdrop-blur-sm border-2 border-yellow-400 text-yellow-500 p-4 rounded-full shadow-xl hover:bg-yellow-50 transition-all duration-200 hover:scale-110 hover:shadow-2xl active:scale-95"
          >
            <ArrowUp className="w-7 h-7" />
          </button>
          <span className="font-bold text-sm text-yellow-500">Waitlist</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            aria-label="Like"
            onClick={() => onSwipe("right")}
            className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Heart className="w-8 h-8" />
          </button>
          <span className="font-bold text-sm text-purple-600">Like</span>
        </div>
      </div>
    </div>
  );
};

export default SwipeStack;
