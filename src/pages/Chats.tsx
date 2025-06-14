import NavBar from "@/components/NavBar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Video, Calendar, MoreHorizontal, Paperclip, Smile, Send } from "lucide-react";

// Mock data to replicate the UI from the image
const mockConversations = [
  {
    id: "1",
    name: "TechCorp",
    title: "Frontend Developer Intern",
    lastMessage: "Hi! We'd love to schedule ...",
    timestamp: "2:30 PM",
    unreadCount: 2,
    avatar: "/placeholder.svg",
    online: true,
  },
  {
    id: "2",
    name: "StartupXYZ",
    title: "Full Stack Developer",
    lastMessage: "Thanks for your interest! When ...",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar: "/placeholder.svg",
    online: false,
  },
  {
    id: "3",
    name: "Creative Agency",
    title: "UI/UX Designer",
    lastMessage: "Interview confirmed for tomorro...",
    timestamp: "2 days ago",
    unreadCount: 0,
    avatar: "/placeholder.svg",
    online: false,
  },
];

const mockMessages = {
  "1": [
    { id: "m1", from: "them", text: "Hi! We reviewed your profile and we're really impressed with your skills.", time: "2:25 PM" },
    { id: "m2", from: "them", text: "We'd love to schedule an interview with you for the Frontend Developer Intern position.", time: "2:26 PM" },
    { id: "m3", from: "me", text: "Thank you so much! I'm very excited about this opportunity.", time: "2:28 PM" },
    { id: "m4", from: "me", text: "I'm available for an interview anytime this week. What works best for you?", time: "2:29 PM" },
    { id: "m5", from: "them", text: "Perfect! How about tomorrow at 3 PM? We can do it over Google Meet.", time: "2:30 PM" },
  ],
  "2": [
    { id: "m6", from: 'them', text: 'Thanks for your interest! When would be a good time to chat?', time: 'Yesterday'}
  ],
  "3": [
    { id: "m7", from: 'them', text: 'Interview confirmed for tomorrow at 10 AM. See you then!', time: '2 days ago'}
  ]
};

const Chats = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(mockConversations[0].id);

  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);
  const messages = selectedConversation ? mockMessages[selectedConversationId] || [] : [];

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 flex overflow-hidden">
        <ConversationList
          conversations={mockConversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
        />
        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
        />
      </main>
    </div>
  );
};

function ConversationList({ conversations, selectedConversationId, onSelectConversation }) {
  return (
    <div className="hidden md:flex w-full md:w-1/3 lg:w-1/4 border-r flex-col bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Messages</h2>
        <p className="text-sm text-muted-foreground">Your matched conversations</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <ConversationListItem
            key={conv.id}
            conversation={conv}
            isSelected={conv.id === selectedConversationId}
            onClick={() => onSelectConversation(conv.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ConversationListItem({ conversation, isSelected, onClick }) {
  const { name, title, lastMessage, timestamp, unreadCount, avatar, online } = conversation;
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 flex gap-4 items-center cursor-pointer border-l-4",
        isSelected ? "bg-primary/5 border-primary" : "border-transparent hover:bg-gray-50"
      )}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        {online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-baseline">
          <p className="font-bold truncate">{name}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
        <p className="text-sm text-muted-foreground truncate">{title}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-muted-foreground truncate w-10/12">{lastMessage}</p>
          {unreadCount > 0 && (
            <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatWindow({ conversation, messages }) {
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground bg-slate-50">
        <p>Select a conversation to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
      <ChatHeader conversation={conversation} />
      <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
}

function ChatHeader({ conversation }) {
  const { name, title, online } = conversation;
  return (
    <div className="p-4 border-b bg-white flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={conversation.avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">{name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            {online && <div className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full font-semibold">Online</div>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
        <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
        <Button className="bg-primary hover:bg-primary/90 hidden sm:flex">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule
        </Button>
        <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
      </div>
    </div>
  );
}

function ChatMessage({ message }) {
  const { from, text, time } = message;
  const isMe = from === 'me';
  const otherUserInitial = "T"; // Placeholder for the other user's initial
  return (
    <div className={cn("flex items-end gap-2", isMe ? "justify-end" : "justify-start")}>
      {!isMe && <Avatar className="w-8 h-8"><AvatarFallback>{otherUserInitial}</AvatarFallback></Avatar>}
      <div className={cn(
          "max-w-md p-3 rounded-xl shadow-sm",
          isMe
            ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-br-none"
            : "bg-white text-foreground rounded-bl-none"
        )}>
        <p className="text-sm">{text}</p>
        <p className={cn("text-xs mt-1 text-right", isMe ? "text-purple-200/80" : "text-muted-foreground")}>{time}</p>
      </div>
    </div>
  );
}

function ChatInput() {
  return (
    <div className="p-4 border-t bg-white">
      <div className="relative">
        <Input placeholder="Type your message..." className="pr-28" />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5 text-muted-foreground" /></Button>
          <Button variant="ghost" size="icon"><Smile className="w-5 h-5 text-muted-foreground" /></Button>
          <Button size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chats;