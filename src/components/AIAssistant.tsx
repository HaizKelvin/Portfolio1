import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  // Safe environment variable retrieval
  const key = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY;
  if (!key) {
    console.warn("GEMINI_API_KEY is missing. AI Assistant will be limited.");
    return null;
  }
  return new GoogleGenAI({ apiKey: key });
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! I'm Kelvin's digital twin. Ask me about his projects, skills, or Computer Science background." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<ReturnType<typeof getAI>>(null);

  useEffect(() => {
    try {
      aiRef.current = getAI();
    } catch (e) {
      console.error("AI Initialization failed:", e);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    if (!aiRef.current) {
      setMessages(prev => [...prev, { role: "bot", text: "I'm currently recalibrating my neural links. Please ensure VITE_GEMINI_API_KEY is set in the environment." }]);
      return;
    }

    const userMessage = input.trim();
    setInput("");
    
    const newMessages = [...messages, { role: "user" as const, text: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const contents = newMessages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const model = aiRef.current.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await model.generateContent({
        contents,
        systemInstruction: `You are the technical AI Assistant for Kelvin Wachira's portfolio. 
        Respond as Kelvin's digital twin. Be professional, technical, and helpful.
        Rules:
        1. Answer in pure plain text. No markdown.
        2. Focus on Kelvin's CS background and Nairobi-based engineering projects.`
      });

      const result = await response.response;
      let botResponse = result.text() || "SYSTEM_SYNC_ERROR: UNKNOWN_INPUT";
      botResponse = botResponse.replace(/[*_]/g, ''); 
      
      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "SYNC_INTERRUPTED: Connection to intelligence nexus failed. Please retry." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[1000000] flex flex-col items-end gap-3 transition-none">
      {!isOpen && (
        <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md px-3 py-1 rounded-full border border-black/10 dark:border-white/10 shadow-lg mb-2">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-secondary font-black italic">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            KV-SYNC_ACTIVE
          </div>
        </div>
      )}

      {isOpen && (
        <div className="w-[340px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[70vh] bg-white dark:bg-black border border-accent/30 rounded-[2rem] shadow-[0_40px_120px_-20px_rgba(0,112,243,0.3)] flex flex-col overflow-hidden mb-3">
          {/* Header */}
          <div className="p-6 bg-accent/5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight text-primary dark:text-white">KV-SYSTEMS</h3>
                <span className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-mono mt-0.5 block">Nairobi_Static_Link</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-secondary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] p-5 rounded-[1.5rem] text-[14px] leading-relaxed shadow-sm ${
                  m.role === "user" 
                  ? "bg-accent text-white" 
                  : "bg-neutral-100 dark:bg-white/5 text-primary dark:text-white border border-black/5 dark:border-white/5"
                }`}>
                  <span className="block text-[8px] opacity-40 mb-1 uppercase tracking-tighter font-mono font-bold">
                    {m.role === "user" ? "USER_ID" : "SYS_RES"}
                  </span>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 dark:bg-white/5 p-5 rounded-[1.5rem] flex items-center gap-3">
                  <Loader2 size={14} className="animate-spin text-accent" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-secondary">Analyzing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-black/5 dark:border-white/5 bg-accent/5">
            <div className="flex gap-3">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Query system database..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-secondary/40 text-primary dark:text-white"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center hover:bg-accent/80 transition-all disabled:opacity-30 shadow-lg shadow-accent/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-accent text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/30 transition-all border-2 border-white/20 hover:scale-105 active:scale-95"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={20} className="sm:size-[24px]" /> : <MessageSquare size={20} className="sm:size-[24px]" />}
      </button>
    </div>
  );
}
