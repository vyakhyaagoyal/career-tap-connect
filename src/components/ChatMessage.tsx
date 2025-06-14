
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  from: "self" | "other";
  text: string;
  time: string;
};

export const ChatMessage = ({ from, text, time }: ChatMessageProps) => {
  const isSelf = from === "self";
  return (
    <div className={cn("flex mb-4", isSelf ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-md",
          isSelf
            ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-md"
            : "bg-gray-100 text-gray-800"
        )}
      >
        <p className="text-sm">{text}</p>
        <p
          className={cn(
            "text-xs mt-1 text-right",
            isSelf ? "text-purple-200/80" : "text-gray-500"
          )}
        >
          {time}
        </p>
      </div>
    </div>
  );
};
