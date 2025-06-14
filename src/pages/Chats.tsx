
import NavBar from "@/components/NavBar";

const Chats = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
    <NavBar />
    <div className="flex-1 px-3 pt-10 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-extrabold mb-6">Chats / Matches</h1>
      <div className="bg-white border rounded-lg p-6 shadow flex flex-col items-center gap-3">
        <span className="text-lg text-muted-foreground mb-2">No matches yet — start swiping to unlock chat!</span>
        <div className="text-5xl">💬</div>
      </div>
    </div>
  </div>
);

export default Chats;
