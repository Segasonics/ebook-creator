import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: "welcome", text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messageRef = useRef(null);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const typeBotMessage = (fullText) => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    const safeText = fullText ?? "";
    const tokens = safeText.split(/(\s+)/).filter((t) => t !== "");
    const messageId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const step = tokens.length > 400 ? 5 : 2;

    setMessages((prev) => [...prev, { id: messageId, text: "", sender: "bot" }]);

    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      index = Math.min(tokens.length, index + step);
      const nextText = tokens.slice(0, index).join("");
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, text: nextText } : msg
        )
      );

      if (index >= tokens.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }, 30);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (inputValue.trim()) {
        const userMessage = {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          text: inputValue.trim(),
          sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setLoading(true);
        const res = await axiosInstance.post(API_PATHS.CHAT.AI, {
          message: userMessage.text,
        });

        const data =
          res?.data?.data?.[0]?.output ??
          res?.data?.data?.output ??
          res?.data?.data ??
          "";
        setLoading(false);
        typeBotMessage(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-120 bg-white/90 rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200/80 backdrop-blur">
          <div className="bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-t-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Chat Support</h3>
                <p className="text-violet-100 text-sm">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/15 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            {messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-sm"
                      : "bg-white text-slate-800 rounded-bl-sm shadow-sm"
                  }`}
                >
                  <span className="whitespace-pre-wrap">{message.text}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-2 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 bg-slate-400/80 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-slate-400/80 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-slate-400/80 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageRef}></div>
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-200 rounded-b-2xl"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white"
              />
              <button
                type="submit"
                className="bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-full p-2 hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputValue.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-50"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
