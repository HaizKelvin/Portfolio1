import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("GEMINI_API_KEY is missing. AI Assistant will be limited.");
    return null;
  }
  return new GoogleGenAI({ apiKey: key });
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "KV-SYSTEM-SYNC: Digital Twin online. Request data points or project logs." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<ReturnType<typeof getAI>>(null);

  useEffect(() => {
    aiRef.current = getAI();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    if (!aiRef.current) {
      setMessages(prev => [...prev, { role: "bot", text: "ERROR: LOGICAL_DISCONNECT" }]);
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

      const response = await aiRef.current.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction: `You are the technical AI Assistant for Kelvin Wachira's portfolio. 
          Rules:
          1. Answer professionally and concisely.
          2. NEVER use markdown characters like asterisks (*) or bolding.
          3. Return only plain text.
          4. Answer as Kelvin's assistant.`
        },
      });

      let botResponse = response.text || "SYSTEM_IDLE: UNKNOWN_INPUT";
      botResponse = botResponse.replace(/[*_]/g, ''); 
      
      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "SYNC_INTERRUPTED: Retry in T-minus 10s." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Fixed Bottom Command Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-black/5 dark:border-white/10 px-6 py-2.5 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2 text-accent">
            <Bot size={13} className={isTyping ? "animate-pulse" : ""} />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">KV-Assistant</span>
          </div>
          
          <div className="h-3 w-[1px] bg-black/10 dark:bg-white/10 hidden sm:block" />
          
          <div className="relative flex-1 group hidden sm:block">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Query project logs or system specs..."
              className="w-full bg-transparent border-none outline-none text-[11px] font-mono placeholder:text-secondary/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-secondary hover:text-accent transition-colors"
          >
            {isOpen ? "[ Minimize ]" : "[ View Console ]"}
            <MessageSquare size={11} />
          </button>
          
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="text-accent hover:scale-110 transition-transform disabled:opacity-30 sm:block hidden"
          >
            <Send size={13} />
          </button>
        </div>
      </div>

      {/* Expanded Console View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-[48px] right-6 w-[400px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] glass rounded-3xl shadow-2xl z-[999] flex flex-col border border-white/10 overflow-hidden"
          >
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-accent/5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold">System Console v1.0.44</span>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[90%] font-mono text-[11px] leading-relaxed ${
                    m.role === "user" 
                    ? "text-accent text-right italic" 
                    : "text-primary/80 dark:text-white/80"
                  }`}>
                    <span className="text-[9px] opacity-40 mr-2 uppercase tracking-tighter">
                      {m.role === "user" ? "USR >" : "SYS >"}
                    </span>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="font-mono text-[10px] text-accent/50 animate-pulse uppercase tracking-[0.2em]">
                    Processing...
                  </div>
                </div>
              )}
            </div>

            {/* Mobile/Expanded Input */}
            <div className="sm:hidden p-4 border-t border-white/5 bg-black/5 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Query system..."
                className="flex-1 bg-transparent border-none outline-none text-[11px] font-mono"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="text-accent"
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
