
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NotificationItemProps = {
  text: string;
  time: string;
  read: boolean;
};

export function NotificationItem({ text, time, read }: NotificationItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-gray-100"></AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{text}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-xs text-gray-400">{time}</span>
        {!read && <div className="h-2 w-2 rounded-full bg-purple-500"></div>}
      </div>
    </div>
  );
}
