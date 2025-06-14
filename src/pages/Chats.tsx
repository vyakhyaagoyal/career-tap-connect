
import NavBar from "@/components/NavBar";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Chats = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
        </header>
        <div className="flex-1 bg-white border rounded-lg flex flex-col p-4 space-y-4 overflow-y-auto h-96">
          <p className="text-center text-gray-500">
            Chat functionality is disabled because authentication has been removed.
          </p>
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
          <Input
            placeholder="Chat disabled"
            disabled={true}
          />
          <Button type="submit" disabled={true}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
