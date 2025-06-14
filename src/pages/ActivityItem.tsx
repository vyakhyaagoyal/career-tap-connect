import React from "react";

interface ActivityItemProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, date }) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-1">
    <div className="font-semibold text-gray-800">{title}</div>
    <div className="text-gray-600 text-sm">{description}</div>
    <div className="text-xs text-gray-400 mt-1">{date}</div>
  </div>
);