import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Bot, Send, User, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const ChatBot: React.FC<ChatBotProps> = ({ open, onClose }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "1",
          text: t("chatbotWelcome"),
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [open, t, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt =
        language === "fr"
          ? `Tu es un assistant médical francophone. Réponds poliment et clairement à : "${userMessage}"`
          : `أنت مساعد طبي. أجب بلغة عربية واضحة وودودة على: "${userMessage}"`;

      const result = await model.generateContent(prompt);
      return result.response.text() || "Je n’ai pas compris votre question.";
    } catch (error) {
      console.error("Gemini API error:", error);
      return language === "fr"
        ? "Désolé, une erreur s’est produite. Veuillez réessayer."
        : "عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const aiText = await getGeminiResponse(inputValue);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiText,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* ✅ Scrollable dialog layout */}
      <DialogContent
        className="flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden p-0"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {/* Fixed header */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            {t("chatbotTitle")}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable middle content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" ref={scrollRef}>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {t("chatbotDisclaimer")}
            </AlertDescription>
          </Alert>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString(
                    language === "fr" ? "fr-FR" : "ar-TN",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <p className="text-sm text-gray-600">{t("chatbotTyping")}</p>
              </div>
            </div>
          )}
        </div>

        {/* Fixed footer */}
        <div className="px-6 py-4 border-t bg-white shrink-0">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("chatbotPlaceholder")}
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
