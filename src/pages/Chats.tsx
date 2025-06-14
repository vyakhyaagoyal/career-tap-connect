"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Send, Calendar, Video, Phone, MoreVertical, Paperclip, Smile } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock chat data
const mockChats = [
  {
    id: 1,
    name: "TechCorp",
    role: "Frontend Developer Intern",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hi! We'd love to schedule an interview with you.",
    lastMessageTime: "2:30 PM",
    unreadCount: 2,
    online: true,
  },
  {
    id: 2,
    name: "StartupXYZ",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your interest! When are you available?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    online: false,
  },
  {
    id: 3,
    name: "Creative Agency",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Interview confirmed for tomorrow at 2 PM",
    lastMessageTime: "2 days ago",
    unreadCount: 0,
    online: true,
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: "recruiter",
    senderName: "Sarah from TechCorp",
    message: "Hi! We reviewed your profile and we're really impressed with your skills.",
    timestamp: "2:25 PM",
    type: "text",
  },
  {
    id: 2,
    senderId: "recruiter",
    senderName: "Sarah from TechCorp",
    message: "We'd love to schedule an interview with you for the Frontend Developer Intern position.",
    timestamp: "2:26 PM",
    type: "text",
  },
  {
    id: 3,
    senderId: "user",
    senderName: "You",
    message: "Thank you so much! I'm very excited about this opportunity.",
    timestamp: "2:28 PM",
    type: "text",
  },
  {
    id: 4,
    senderId: "user",
    senderName: "You",
    message: "I'm available for an interview anytime this week. What works best for you?",
    timestamp: "2:29 PM",
    type: "text",
  },
  {
    id: 5,
    senderId: "recruiter",
    senderName: "Sarah from TechCorp",
    message: "Perfect! How about tomorrow at 3 PM? We can do it over Google Meet.",
    timestamp: "2:30 PM",
    type: "text",
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [userType, setUserType] = useState<"seeker" | "recruiter">("seeker")
  const messagesEndRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: "user",
        senderName: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text" as const,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const selectedChatData = mockChats.find((chat) => chat.id === selectedChat)

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
            <Link href="/inbox" className="text-gray-600 hover:text-purple-600 transition-colors">
              Inbox
            </Link>
            <Link href="/chat" className="text-purple-600 font-medium">
              Chats
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
            <p className="text-sm text-gray-600">Your matched conversations</p>
          </div>

          <div className="overflow-y-auto">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? "bg-purple-50 border-r-2 border-r-purple-600" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.role}</p>
                    <p className="text-sm text-gray-500 truncate mt-1">{chat.lastMessage}</p>
                  </div>

                  {chat.unreadCount > 0 && (
                    <Badge className="bg-purple-600 text-white text-xs px-2 py-1">{chat.unreadCount}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedChatData.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedChatData.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedChatData.name}</h3>
                    <p className="text-sm text-gray-600">{selectedChatData.role}</p>
                  </div>
                  {selectedChatData.online && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Online</Badge>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${message.senderId === "user" ? "text-purple-100" : "text-gray-500"}`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="pr-10"
                    />
                    <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
                <p className="text-gray-600">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}