"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, X, ArrowUp, User, MessageCircle, Calendar, Bell, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    type: "match",
    title: "New Match!",
    message: "You and TechCorp both swiped right on Frontend Developer position",
    time: "2 hours ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    type: "swipe",
    title: "Someone liked your profile!",
    message: "StartupXYZ showed interest in your profile",
    time: "4 hours ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    type: "interview",
    title: "Interview Scheduled",
    message: "Your interview with Creative Agency is confirmed for tomorrow at 2 PM",
    time: "1 day ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    type: "rejection",
    title: "Application Update",
    message: "DataTech decided to move forward with other candidates",
    time: "2 days ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    type: "waitlist",
    title: "Moved to Waitlist",
    message: "You've been waitlisted for the Backend Developer role at CloudCorp",
    time: "3 days ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockMatches = [
  {
    id: 1,
    name: "TechCorp",
    role: "Frontend Developer Intern",
    matchedAt: "2 hours ago",
    status: "new",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Hi! We'd love to schedule an interview with you.",
  },
  {
    id: 2,
    name: "StartupXYZ",
    role: "Full Stack Developer",
    matchedAt: "1 day ago",
    status: "active",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Thanks for your interest! When are you available for a call?",
  },
  {
    id: 3,
    name: "Creative Agency",
    role: "UI/UX Designer",
    matchedAt: "3 days ago",
    status: "scheduled",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Interview confirmed for tomorrow at 2 PM",
  },
]

const mockSwipeActivity = [
  {
    id: 1,
    company: "TechCorp",
    role: "Frontend Developer",
    action: "swiped_right",
    result: "matched",
    time: "2 hours ago",
  },
  {
    id: 2,
    company: "DataScience Inc",
    role: "Data Analyst",
    action: "swiped_left",
    result: "passed",
    time: "3 hours ago",
  },
  {
    id: 3,
    company: "StartupXYZ",
    role: "Backend Developer",
    action: "swiped_up",
    result: "waitlisted",
    time: "5 hours ago",
  },
  {
    id: 4,
    company: "CloudCorp",
    role: "DevOps Engineer",
    action: "swiped_right",
    result: "pending",
    time: "1 day ago",
  },
]

export default function InboxPage() {
  const [userType, setUserType] = useState<"seeker" | "recruiter">("seeker")
  const [notifications, setNotifications] = useState(mockNotifications)
  const router = useRouter()

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") as "seeker" | "recruiter"
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (!isAuthenticated) {
      router.push("/auth")
      return
    }

    if (storedUserType) {
      setUserType(storedUserType)
    }
  }, [router])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return <Heart className="w-5 h-5 text-pink-600" />
      case "swipe":
        return <User className="w-5 h-5 text-purple-600" />
      case "interview":
        return <Calendar className="w-5 h-5 text-green-600" />
      case "rejection":
        return <X className="w-5 h-5 text-red-600" />
      case "waitlist":
        return <ArrowUp className="w-5 h-5 text-yellow-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getSwipeIcon = (action: string, result: string) => {
    if (result === "matched") {
      return <Heart className="w-4 h-4 text-pink-600" />
    }

    switch (action) {
      case "swiped_right":
        return <Heart className="w-4 h-4 text-purple-600" />
      case "swiped_left":
        return <X className="w-4 h-4 text-red-600" />
      case "swiped_up":
        return <ArrowUp className="w-4 h-4 text-yellow-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case "matched":
        return <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">Matched!</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "waitlisted":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Waitlisted</Badge>
      case "passed":
        return <Badge variant="outline">Passed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              JobSwipe
            </span>
          </div>

          <nav className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/inbox" className="text-purple-600 font-medium">
              Inbox
            </Link>
            <Link href="/chat" className="text-gray-600 hover:text-purple-600 transition-colors">
              Chats
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inbox</h1>
          <p className="text-gray-600">Stay updated with your job search activity</p>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {notifications.filter((n) => !n.read).length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !notification.read ? "border-purple-200 bg-purple-50/50" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{getNotificationIcon(notification.type)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${!notification.read ? "text-purple-900" : "text-gray-900"}`}>
                          {notification.title}
                        </h3>
                        <span className="text-sm text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>

                    {!notification.read && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            {mockMatches.map((match) => (
              <Card key={match.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={match.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{match.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{match.name}</h3>
                          <p className="text-sm text-gray-600">{match.role}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              match.status === "new"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : match.status === "scheduled"
                                  ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            }
                          >
                            {match.status === "new"
                              ? "New Match"
                              : match.status === "scheduled"
                                ? "Interview Scheduled"
                                : "Active"}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mt-2">{match.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">Matched {match.matchedAt}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/chat/${match.id}`}>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {mockSwipeActivity.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getSwipeIcon(activity.action, activity.result)}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {activity.company} - {activity.role}
                        </h3>
                        <p className="text-sm text-gray-600">
                          You {activity.action.replace("_", " ")} • {activity.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">{getResultBadge(activity.result)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
