import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";

export default function AiChat() {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: chatHistory = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat"],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat"] });
      setMessage("");
    },
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  return (
    <Card className="bg-white shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 flex items-center">
          <Bot className="text-ibm-blue mr-2" size={20} />
          AI Climate Assistant
        </CardTitle>
        <p className="text-sm text-neutral-700">Get real-time climate insights</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 h-64 overflow-y-auto mb-4">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          ) : chatHistory.length === 0 ? (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-ibm-blue rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={16} />
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm">
                    Hello! I'm your AI climate assistant. I can help you analyze carbon data, suggest credit allocations, and provide policy recommendations.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div key={chat.id} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <User className="text-white" size={16} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">{chat.message}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-ibm-blue rounded-full flex items-center justify-center">
                      <Bot className="text-white" size={16} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm">{chat.response}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask about climate data, policies, or carbon credits..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={sendMessageMutation.isPending}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={sendMessageMutation.isPending || !message.trim()}
            className="bg-ibm-blue hover:bg-blue-700"
          >
            <Send size={16} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
