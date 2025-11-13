import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { AIChatbot } from "./AIChatbot";

export const AIChatbotWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // 🔹 Add this useEffect
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("openChatbot", handleOpenChat);
    return () => window.removeEventListener("openChatbot", handleOpenChat);
  }, []);

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-[#B80000] to-[#DC2626] hover:from-[#991b1b] hover:to-[#B91C1C]
                       rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                       flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden"
            style={{
              boxShadow:
                "0 20px 40px rgba(184, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#B80000] to-[#DC2626] opacity-90"></div>
            <div className="relative z-10 flex flex-col items-center">
              <MessageCircle className="h-8 w-8 text-white mb-1" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </Button>
        </div>
      )}

      <AIChatbot
        isOpen={isOpen}
        isMinimized={isMinimized}
        onClose={() => setIsOpen(false)}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
    </>
  );
};
