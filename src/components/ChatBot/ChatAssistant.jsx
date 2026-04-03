import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Welcome to your sanctuary. I am the Heavenly Concierge. How may I assist with your stay today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // ✅ Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userInput = input;

    // add user message
    setMessages(prev => [...prev, { role: 'user', text: userInput }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/v1/chatbot/',
        { message: userInput }
      );

      const data = res.data;

      // ✅ Format response nicely
      let botText = data.message;

      if (data.results.length > 0) {
        botText += "\n\n🏨 Recommended Hotels:\n";

        data.results.forEach((h, index) => {
          botText += `
${index + 1}. ${h.name}
📍 ${h.location}
💰 $${h.price}/night
🛏 ${h.available_rooms} rooms available
`;
        });
      } else {
        botText += "\n\n❌ No hotels found. Try changing filters.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botText }]);

    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: "My apologies. The sanctuary registry is momentarily offline."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-[#1a1a1a] text-[#c5a059] border border-[#c5a059]/30 px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 z-50 flex items-center gap-3 uppercase tracking-[0.2em] text-[10px] font-bold"
        >
          Ask Concierge
        </button>
      )}

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* DRAWER */}
      <aside className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#0f0f0f] text-white z-[70] transform transition-transform duration-500 border-l border-[#c5a059]/20 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex flex-col h-full p-8 md:p-12">

          {/* HEADER */}
          <div className="flex justify-between mb-8">
            <h2 className="text-[#c5a059] text-xl">Heavenly Concierge</h2>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          {/* CHAT */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-6 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] text-xs p-3 ${
                  m.role === 'user'
                    ? 'bg-[#c5a059]/10 text-[#c5a059]'
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-xs text-[#c5a059] animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="mt-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Search hotels..."
              className="w-full bg-transparent border-b border-gray-700 py-2 outline-none"
            />
          </div>

        </div>
      </aside>
    </>
  );
};

export default ChatAssistant;