import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function AIChatbot({
  isOpen = true,
  onClose,
  isMinimized = false,
  onToggleMinimize,
}) {
  // ---- States ----
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! 👋 I'm MFU Assistant. I can help you with schedules, library info, dining, events, and more. You can also click any of the popular FAQs below 👇",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ---- Popular FAQs ----
  const faqs = [
    { question: "Where is the library?", key: "library" },
    { question: "How do I register for courses?", key: "register" },
    { question: "What dining options are available?", key: "dining" },
    { question: "How to request my transcript?", key: "transcript" },
    { question: "Who to contact for emergencies?", key: "emergency" },
  ];

  // ---- Scroll to bottom when new messages appear ----
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ---- Bot response logic ----
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("class") || message.includes("schedule"))
      return "📅 Here's your schedule for today:\n\n• 09:00–10:30: Computer Science 101 (A-201)\n• 11:00–12:30: Mathematics (B-105)\n• 14:00–15:30: English Literature (C-301)";

    if (message.includes("library"))
      return "📚 The MFU Library is in the main academic building, floors 2–4.\n🕒 Hours: Mon–Fri 7:00–22:00, Sat–Sun 9:00–18:00.";

    if (message.includes("register") || message.includes("course"))
      return "📝 Course Registration:\n• Opens: January 15th\n• Use the student portal: sis.mfu.ac.th\n• Need help? Contact Academic Advising.";

    if (message.includes("dining") || message.includes("food"))
      return "🍽️ Dining Options:\n• Main Cafeteria: 7:00–21:00\n• Coffee Corner: 6:30–22:00\n• Food Court: 11:00–20:00";

    if (message.includes("transcript"))
      return "📄 Transcript Request:\nVisit the Admin Building Room 201 or use the online request portal. Fee: 200 THB.";

    if (message.includes("emergency") || message.includes("help"))
      return "🚨 Emergency Contacts:\n• Campus Security: +66 53 916 911\n• Health Center: +66 53 916 234\n• Police: 191";

    if (message.includes("promotion") || message.includes("discount"))
      return "🎁 Current Offers:\n• 20% off textbooks\n• Free Microsoft Office 365 for students\n• Reduced parking fees";

    if (message.includes("hello") || message.includes("hi"))
      return "👋 Hi there! How can I help you today? You can ask about your schedule, dining, registration, or pick one of the FAQs below.";

    return "🤔 I’m not sure about that yet. Try one of the FAQs below or ask something about campus life, dining, registration, or library info!";
  };

  // ---- Send message (user or FAQ click) ----
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  // ---- Handle Enter key ----
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // ---- Handle FAQ click ----
  const handleFAQClick = (faq) => {
    sendMessage(faq.question);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ease-in-out ${
        isMinimized ? "scale-90 opacity-80" : "scale-100"
      }`}
    >
      <Card
        className={`backdrop-blur-lg bg-white/80 border border-gray-200 shadow-2xl rounded-2xl transition-all duration-300 overflow-hidden
          ${
            window.innerWidth < 400
              ? "w-[95vw] h-[80vh] rounded-xl"
              : isMinimized
              ? "w-72 h-14"
              : "w-[22rem] h-[34rem] sm:w-[24rem] sm:h-[36rem] md:w-[26rem] md:h-[38rem] lg:w-[28rem] lg:h-[40rem]"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#B80000] to-[#e22d2d] text-white shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg">
                MFU Assistant
              </h3>
              <p className="text-[10px] sm:text-xs opacity-80">
                AI Campus Helper • Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMinimize}
              className="text-white hover:bg-white/20 p-1 rounded-full"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-1 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 bg-gradient-to-b from-white to-gray-50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-[80%] ${
                      m.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`p-2 sm:p-3 rounded-2xl text-xs sm:text-sm shadow-sm whitespace-pre-line ${
                        m.sender === "user"
                          ? "bg-[#B80000] text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {m.content}
                      <div
                        className={`text-[10px] mt-1 text-right ${
                          m.sender === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {m.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-200 px-3 py-2 rounded-xl flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ---- FAQs Section ---- */}
            <div className="px-4 pb-3 border-t border-gray-200 bg-white/80">
              <p className="text-xs text-gray-500 mb-2">
                Popular FAQs 📘 — click to ask:
              </p>
              <div className="flex flex-wrap gap-2">
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-all duration-200"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-gray-200 p-4 bg-white/70 backdrop-blur-sm">
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything about campus..."
                  className="flex-1 p-1 sm:p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B80000] focus:border-transparent text-xs sm:text-sm bg-white/80"
                />
                <Button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[#B80000] hover:bg-[#991b1b] text-white p-2 rounded-full shadow-md"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
