import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Welcome to your sanctuary. I am the Heavenly Concierge. How may I assist with your stay today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 🔹 IMPORTANT: Using your Vercel URL
      const response = await axios.post('https://hotel-heaven-backend.vercel.app/api/v1/concierge/', {
        message: input
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error("Concierge Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "My apologies. The sanctuary registry is momentarily offline." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON (Floating) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-[#1a1a1a] text-[#c5a059] border border-[#c5a059]/30 px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 z-50 flex items-center gap-3 uppercase tracking-[0.2em] text-[10px] font-bold"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a059]"></span>
          </span>
          Ask Concierge
        </button>
      )}

      {/* DRAWER OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* CHAT DRAWER */}
      <aside className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#0f0f0f] text-white z-[70] transform transition-transform duration-500 ease-in-out border-l border-[#c5a059]/20 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 md:p-12">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-serif italic text-[#c5a059]">Heavenly</h2>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500 mt-1">Concierge Service</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-stone-600 hover:text-[#c5a059] transition-colors text-sm uppercase tracking-widest"
            >
              Close [×]
            </button>
          </div>

          {/* CHAT BODY */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto space-y-8 pr-4 no-scrollbar scroll-smooth"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] text-[12px] leading-relaxed tracking-wide p-4 rounded-sm ${
                  m.role === 'user' 
                  ? 'bg-[#c5a059]/10 text-[#c5a059] italic border-r-2 border-[#c5a059]' 
                  : 'bg-stone-900/50 text-stone-300 border-l-2 border-stone-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] animate-pulse">
                Consulting the registry...
              </div>
            )}
          </div>

          {/* INPUT FIELD */}
          <div className="mt-8 border-t border-stone-800 pt-8">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="How may I guide you?"
                className="w-full bg-transparent border-b border-stone-800 py-3 text-sm focus:border-[#c5a059] outline-none transition-all placeholder:text-stone-700"
              />
              <button 
                onClick={handleSend}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#c5a059] hover:scale-110 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatAssistant;