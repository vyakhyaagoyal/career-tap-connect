
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

type MatchItemProps = {
  id: number | string;
  company: string;
  role: string;
  message: string;
  time: string;
  status: string;
  avatar: string;
  conversationId?: number;
};

const statusColors: { [key: string]: string } = {
  "New Match": "bg-green-100 text-green-800 border-green-200",
  "Active": "bg-blue-100 text-blue-800 border-blue-200",
  "Interview Scheduled": "bg-purple-100 text-purple-800 border-purple-200",
};

export function MatchItem({
  company,
  role,
  message,
  time,
  status,
  avatar,
  conversationId,
}: MatchItemProps) {
  const navigate = useNavigate();

  const handleChat = () => {
    if (conversationId) {
      navigate(`/chats/${conversationId}`);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <Avatar>
        <AvatarFallback>{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold">{company}</h4>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
          <Badge variant="outline" className={`${statusColors[status] || ""}`}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mt-2">{message}</p>
        <p className="text-xs text-gray-400 mt-2">{time}</p>
      </div>
      <Button
        className="bg-purple-600 hover:bg-purple-700 text-white shrink-0 ml-4"
        onClick={handleChat}
        disabled={!conversationId}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Chat
      </Button>
    </div>
  );
}
