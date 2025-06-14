
import { useState } from "react";
import CardJob from "./CardJob";
import CardCandidate from "./CardCandidate";
import { ArrowRight, ArrowLeft, ArrowUp } from "lucide-react";

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
    }, 350);
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
          absolute w-full transition-all duration-300 ease-in-out
          ${swipeDir === "left" ? "-translate-x-[120vw] opacity-0" : ""}
          ${swipeDir === "right" ? "translate-x-[120vw] opacity-0" : ""}
          ${swipeDir === "up" ? "-translate-y-[100vh] opacity-0" : ""}
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
      <div className="mt-5 flex gap-8 justify-center w-full z-10">
        <button
          aria-label="Skip"
          onClick={() => onSwipe("left")}
          className="bg-muted p-4 rounded-full shadow hover:bg-muted/70 transition hover:scale-110 text-2xl"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <button
          aria-label="Waitlist/Up"
          onClick={() => onSwipe("up")}
          className="bg-secondary p-4 rounded-full shadow hover:bg-secondary/80 transition hover:scale-110 text-2xl"
        >
          <ArrowUp className="w-7 h-7" />
        </button>
        <button
          aria-label="Interested"
          onClick={() => onSwipe("right")}
          className="bg-primary text-primary-foreground p-4 rounded-full shadow hover:scale-110 transition hover:bg-primary/90 text-2xl"
        >
          <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default SwipeStack;
