
import NavBar from "@/components/NavBar";

const Inbox = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
    <NavBar />
    <div className="flex-1 px-3 pt-10 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-extrabold mb-6">Inbox & Updates</h1>
      <div className="space-y-3">
        <InboxCard
          type="swipe-right"
          message="John Doe wants to connect with you! Mutual interest has been detected."
        />
        <InboxCard
          type="swipe-left"
          message="Your profile was skipped by Alice - never give up!"
        />
        <InboxCard
          type="waitlist"
          message="Samantha added you to waitlist, answer their question to unlock chat."
        />
      </div>
      <div className="pt-8 text-muted-foreground text-center">Check back often for the latest updates!</div>
    </div>
  </div>
);

function InboxCard({
  type,
  message,
}: {
  type: "swipe-right" | "swipe-left" | "waitlist";
  message: string;
}) {
  const bg =
    type === "swipe-right"
      ? "bg-green-50 border-green-300"
      : type === "swipe-left"
      ? "bg-red-50 border-red-300"
      : "bg-blue-50 border-blue-300";
  return (
    <div className={`rounded-xl border p-5 flex items-center gap-4 shadow ${bg}`}>
      <span className="font-bold text-lg">{type === "swipe-right" ? "🤝" : type === "swipe-left" ? "👋" : "🌀"}</span>
      <span className="text-base">{message}</span>
    </div>
  );
}

export default Inbox;
