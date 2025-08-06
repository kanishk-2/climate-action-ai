import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Key, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const updateKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      const response = await apiRequest("POST", "/api/update-api-key", { apiKey: key });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "OpenAI API key updated successfully. AI features are now active.",
        duration: 5000,
      });
      setApiKey("");
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update API key. Please check the key and try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    updateKeyMutation.mutate(apiKey.trim());
  };

  const openOpenAIDocs = () => {
    window.open("https://platform.openai.com/api-keys", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="text-ibm-blue" size={20} />
            Update OpenAI API Key
          </DialogTitle>
          <DialogDescription>
            Configure your OpenAI API key to enable AI features like the climate assistant and smart recommendations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ExternalLink className="text-ibm-blue mt-0.5" size={16} />
              <div>
                <p className="text-sm font-medium text-ibm-blue mb-1">
                  Need an API Key?
                </p>
                <p className="text-sm text-neutral-700 mb-2">
                  Get your OpenAI API key from the official platform
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openOpenAIDocs}
                  className="text-ibm-blue border-ibm-blue hover:bg-blue-50"
                >
                  <ExternalLink className="mr-2" size={14} />
                  Get API Key
                </Button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="apiKey" className="text-sm font-medium">
                OpenAI API Key
              </Label>
              <div className="relative mt-1">
                <Input
                  id="apiKey"
                  type={showKey ? "text" : "password"}
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-1 top-1 h-8 w-16 text-xs"
                >
                  {showKey ? "Hide" : "Show"}
                </Button>
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                Your API key is securely stored and never shared
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={updateKeyMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateKeyMutation.isPending || !apiKey.trim()}
                className="bg-ibm-blue hover:bg-blue-700"
              >
                {updateKeyMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2" size={16} />
                    Update Key
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}