import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ConversationListItemProps = {
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unreadCount?: number;
  avatar: string;
  isActive: boolean;
  onClick: () => void;
};

export const ConversationListItem = ({
  name,
  role,
  lastMessage,
  time,
  online,
  unreadCount,
  avatar,
  isActive,
  onClick,
}: ConversationListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border-l-4",
        isActive
          ? "bg-purple-50 border-purple-500"
          : "border-transparent hover:bg-gray-50"
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{avatar}</AvatarFallback>
        </Avatar>
        {online && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white" />}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm truncate">{name}</h3>
          <p className="text-xs text-gray-500 shrink-0 ml-2">{time}</p>
        </div>
        <p className="text-xs text-gray-600 truncate">{role}</p>
        <div className="flex justify-between items-end mt-1">
          <p className="text-xs text-gray-500 truncate w-40">{lastMessage}</p>
          {unreadCount && unreadCount > 0 && (
            <Badge className="bg-purple-600 text-white h-5 min-w-[1.25rem] flex items-center justify-center p-1 text-xs">{unreadCount}</Badge>
          )}
        </div>
      </div>
    </div>
  );
};
