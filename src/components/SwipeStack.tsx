
import { useState } from "react";
import CardJob from "./CardJob";
import CardCandidate from "./CardCandidate";
import { Heart, X, ArrowUp } from "lucide-react";

// This simplified swipe mechanic is animated with transforms, no external lib yet.
// Demo only! Wire up with react-tinder-card or gesture lib for production.

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
    setSwipeDir(dir);
    setTimeout(() => {
      setSwipeDir(null);
      setCurrent((c) => Math.min(feed.length, c + 1));
    }, 500);
  };

  if (current >= feed.length)
    return (
      <div className="bg-background border rounded-xl shadow-md p-8 flex flex-col items-center animate-fade-in">
        <span className="text-xl font-bold mb-2">No more {userType === "jobseeker" ? "jobs" : "candidates"} right now.</span>
        <span className="text-muted-foreground">Check back later for new matches!</span>
      </div>
    );

  const card = feed[current];

  return (
    <div className="relative w-full min-h-[380px] flex flex-col items-center drop-shadow-lg select-none animate-fade-in">
      <div
        className={`
          absolute w-full transition-all duration-500 ease-in-out
          ${swipeDir === "left" ? "-translate-x-[150vw] -rotate-25 opacity-0" : ""}
          ${swipeDir === "right" ? "translate-x-[150vw] rotate-25 opacity-0" : ""}
          ${swipeDir === "up" ? "-translate-y-[120vh] opacity-0" : ""}
        `}
        style={{ zIndex: 2 }}
      >
        {userType === "jobseeker" ? (
          <CardJob {...(card as Job)} />
        ) : (
          <CardCandidate {...(card as Candidate)} />
        )}
      </div>
      {/* Show underlying next card for effect */}
      {feed[current + 1] && (
        <div className="absolute w-full scale-95 opacity-70 pointer-events-none top-0" style={{ zIndex: 1 }}>
          {userType === "jobseeker" ? (
            <CardJob {...(feed[current + 1] as Job)} />
          ) : (
            <CardCandidate {...(feed[current + 1] as Candidate)} />
          )}
        </div>
      )}
      {/* Controls: mobile visible, desktop for demo */}
      <div className="absolute -bottom-20 flex gap-4 justify-center w-full z-10">
        <div className="flex flex-col items-center gap-1">
          <button
            aria-label="Pass"
            onClick={() => onSwipe("left")}
            className="bg-white/90 backdrop-blur-sm border-2 border-red-300 text-red-500 p-4 rounded-full shadow-lg hover:bg-red-50 transition-all hover:scale-110"
          >
            <X className="w-7 h-7" />
          </button>
          <span className="font-bold text-sm text-red-500">Pass</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button
            aria-label="Waitlist"
            onClick={() => onSwipe("up")}
            className="bg-white/90 backdrop-blur-sm border-2 border-yellow-400 text-yellow-500 p-4 rounded-full shadow-lg hover:bg-yellow-50 transition-all hover:scale-110"
          >
            <ArrowUp className="w-7 h-7" />
          </button>
          <span className="font-bold text-sm text-yellow-500">Waitlist</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button
            aria-label="Like"
            onClick={() => onSwipe("right")}
            className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-5 rounded-full shadow-lg hover:scale-110 transition-transform"
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
