
import NavBar from "@/components/NavBar";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

const Chats = () => {
  const { id: conversationId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      if (!conversationId) return [];

      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", parseInt(conversationId, 10))
        .order("created_at", { ascending: true });

      if (messagesError) throw new Error(messagesError.message);
      if (!messagesData) return [];

      const senderIds = [...new Set(messagesData.map((m) => m.sender_id))];

      if (senderIds.length === 0) {
        return messagesData.map((m) => ({ ...m, profiles: null }));
      }

      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", senderIds);

      if (profilesError) throw new Error(profilesError.message);

      const profilesById = profilesData.reduce(
        (acc, p) => {
          acc[p.id] = p;
          return acc;
        },
        {} as Record<string, { id: string; full_name: string | null }>,
      );

      return messagesData.map((m) => ({
        ...m,
        profiles: profilesById[m.sender_id] || null,
      }));
    },
    enabled: !!conversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!conversationId || !user) return;
      const { error } = await supabase.from("messages").insert({
        conversation_id: parseInt(conversationId, 10),
        sender_id: user.id,
        content: content,
      });

      if (error) {
        toast({
          title: "Error sending message",
          description: error.message,
          variant: "destructive",
        });
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      setNewMessage("");
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessageMutation.mutate(newMessage.trim());
    }
  };

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["messages", conversationId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
        </header>
        <div className="flex-1 bg-white border rounded-lg flex flex-col p-4 space-y-4 overflow-y-auto h-96">
          {isLoading && <p className="text-center">Loading messages...</p>}
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                message.sender_id === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender_id !== user?.id && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.profiles?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-xl ${
                  message.sender_id === user?.id
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            disabled={sendMessageMutation.isPending}
          />
          <Button type="submit" disabled={sendMessageMutation.isPending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
