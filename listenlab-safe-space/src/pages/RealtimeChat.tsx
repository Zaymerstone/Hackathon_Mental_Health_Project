import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heart, 
  Send, 
  Loader2, 
  MessageCircle, 
  X,
  ArrowLeft
} from "lucide-react";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RealtimeChat = () => {
  const navigate = useNavigate();
  const { user, userType } = useAuth();
  const {
    status,
    session,
    messages,
    isLoading,
    joinQueue,
    leaveQueue,
    findSeeker,
    sendMessage,
    endSession,
    reset
  } = useRealtimeChat();

  const [inputMessage, setInputMessage] = useState("");
  const [showEndDialog, setShowEndDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    await sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleBack = () => {
    if (status === "connected") {
      setShowEndDialog(true);
    } else if (status === "waiting") {
      leaveQueue();
      navigate(-1);
    } else {
      navigate(-1);
    }
  };

  const handleEndChat = async () => {
    await endSession();
    setShowEndDialog(false);
  };

  const handleNewChat = () => {
    reset();
  };

  // Render waiting state for seekers
  if (status === "waiting") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span>Leave Queue</span>
              </button>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-semibold">ListenLab</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Finding a Listener...</h2>
            <p className="text-muted-foreground mb-6">
              You're in the queue. A caring listener will connect with you shortly. 
              Please stay on this page.
            </p>
            <Button variant="outline" onClick={handleBack}>
              Leave Queue
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Render ended state
  if (status === "ended") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-semibold">ListenLab</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Chat Ended</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for using ListenLab. We hope this conversation was helpful.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Button variant="hero" onClick={handleNewChat}>
                {userType === "student" ? "Find Another" : "Find a Listener"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render idle state (start chat)
  if (status === "idle") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-semibold">ListenLab</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {userType === "student" ? "Ready to Listen?" : "Ready to Talk?"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {userType === "student"
                ? "Connect with someone who needs support. Your conversation will be completely anonymous."
                : "Connect with a trained listener who's here to support you. Your identity will remain anonymous."}
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={userType === "student" ? findSeeker : joinQueue}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  {userType === "student" ? "Start Listening" : "Find a Listener"}
                  <Heart className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Render connecting state (students) - prevents showing chat UI until truly connected
  if (status === "connecting") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-semibold">ListenLab</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Connecting...</h2>
            <p className="text-muted-foreground mb-6">
              Looking for someone in the queue. You'll enter the chat once you're matched.
            </p>
            <Button variant="outline" onClick={handleBack}>
              Cancel
            </Button>
          </div>
        </main>
      </div>
    );
  }
  // Render connected state (active chat)
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {userType === "student" ? "Anonymous User" : "Listener"}
                </p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowEndDialog(true)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4 mr-2" />
              End Chat
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="container mx-auto max-w-2xl space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">
                {userType === "student" 
                  ? "You're now connected. Start by saying hello and letting them know you're here to listen."
                  : "You're now connected with a listener. Feel free to share what's on your mind."}
              </p>
            </div>
          )}
          {messages.map((message) => {
            const isOwn = message.sender_id === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    isOwn
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="bg-card border-t border-border/50 p-4">
        <form onSubmit={handleSend} className="container mx-auto max-w-2xl flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            autoFocus
          />
          <Button type="submit" disabled={!inputMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End this conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end the chat session for both participants. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEndChat} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              End Chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RealtimeChat;
