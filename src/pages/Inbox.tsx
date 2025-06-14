import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Heart, Activity as ActivityIcon } from "lucide-react";
import { ActivityItem } from './ActivityItem.tsx';

// Mock data for activity tab
const mockInboxActivity = [
  {
    id: 1,
    title: "Application Submitted",
    description: "You applied to Frontend Developer at Acme Corp.",
    date: "2024-06-01",
  },
  {
    id: 2,
    title: "Interview Scheduled",
    description: "Interview with Beta Inc. scheduled for June 10.",
    date: "2024-06-03",
  },
];

const Inbox = () => {
  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <NavBar />
    <div className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Inbox</h1>
        <p className="text-gray-500 mt-1">
          Stay updated with your job search activity
        </p>
      </header>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-purple-100/60 p-1 rounded-xl h-auto">
          <TabsTrigger value="notifications" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg text-gray-700 font-semibold transition-all duration-200">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            <Badge className="bg-red-500 text-white ml-1">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="matches" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg text-gray-700 font-semibold transition-all duration-200">
            <Heart className="h-5 w-5" />
            <span>Matches</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg text-gray-700 font-semibold transition-all duration-200">
            <ActivityIcon className="h-5 w-5" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-3">
            <p className="text-center text-gray-500">No new notifications.</p>
            <p className="text-center text-gray-500">Check back later!</p>
          </div>
        </TabsContent>
        <TabsContent value="matches" className="mt-6">
          <div className="space-y-3">
            <p className="text-center text-gray-500">No matches yet.</p>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <div className="space-y-3">
            {mockInboxActivity.map((item) => (
              <ActivityItem key={item.id} {...item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
  )
};

export default Inbox;