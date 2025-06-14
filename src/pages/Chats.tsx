import NavBar from "@/components/NavBar";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Phone, Video, CalendarDays, MoreHorizontal, Paperclip } from "lucide-react";
import { ConversationListItem } from "@/components/ConversationListItem";
import { ChatMessage } from "@/components/ChatMessage.tsx";
import { mockConversations, mockMessages } from "@/utils/mockData";
import { Badge } from "@/components/ui/badge";

const Chats = () => {
  const { id: activeConvId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConversation = mockConversations.find(c => c.id === activeConvId);

  useEffect(() => {
    if (activeConvId) {
      setMessages(mockMessages[activeConvId] || []);
    }
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !activeConvId) return;

    const newMsg = {
        id: messages.length + 1,
        from: "self" as const,
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
  }

  return (
    <div className="h-screen max-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/3 max-w-sm border-r bg-white flex flex-col">
          <header className="p-4 border-b">
            <h2 className="text-xl font-bold">Messages</h2>
            <p className="text-sm text-gray-500">Your matched conversations</p>
          </header>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {mockConversations.map((conv) => (
              <ConversationListItem
                key={conv.id}
                name={conv.company}
                role={conv.role}
                lastMessage={conv.lastMessage}
                time={conv.time}
                online={conv.online}
                unreadCount={conv.unread}
                avatar={conv.avatar}
                isActive={activeConvId === conv.id}
                onClick={() => navigate(`/chats/${conv.id}`)}
              />
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              <header className="flex items-center justify-between p-3 border-b bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{activeConversation.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{activeConversation.company}</h3>
                    <p className="text-sm text-gray-500">{activeConversation.role}</p>
                  </div>
                  {activeConversation.online && <Badge variant="outline" className="text-green-600 border-green-300">Online</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Phone /></Button>
                  <Button variant="ghost" size="icon"><Video /></Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"><CalendarDays className="mr-2" />Schedule</Button>
                  <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                </div>
              </header>
              <div className="flex-1 overflow-y-auto p-6">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} {...msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-white flex items-center gap-2">
                <Button variant="ghost" size="icon" type="button"><Paperclip /></Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  autoComplete="off"
                />
                <Button type="submit" size="icon" className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full h-11 w-11">
                  <Send />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Chats;