
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart, X, ArrowUp } from "lucide-react";

type ActivityItemProps = {
  type: "right" | "left" | "up";
  text: string;
  details: string;
  status: string;
};

const typeDetails = {
  right: {
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  left: {
    icon: X,
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  },
  up: {
    icon: ArrowUp,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
};

const statusColors: { [key: string]: string } = {
  "Matched!": "bg-pink-100 text-pink-800 border-pink-200",
  "Passed": "bg-gray-100 text-gray-800 border-gray-200",
  "Waitlisted": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Pending": "bg-blue-100 text-blue-800 border-blue-200",
};

export function ActivityItem({
  type,
  text,
  details,
  status,
}: ActivityItemProps) {
  const { icon: Icon, color, bgColor } = typeDetails[type];
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
          bgColor
        )}
      >
        <Icon className={cn("h-4 w-4", color)} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{text}</p>
        <p className="text-xs text-gray-500">{details}</p>
      </div>
      <Badge variant="outline" className={`${statusColors[status] || ""}`}>
        {status}
      </Badge>
    </div>
  );
}
