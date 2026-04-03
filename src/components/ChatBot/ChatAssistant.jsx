import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiMapPin, FiDollarSign,
         FiMessageSquare, FiSend, FiExternalLink } from 'react-icons/fi';
import { ChevronDown, } from 'lucide-react';

const API = 'https://hotel-heaven-backend.vercel.app/api/v1/chatbot/';

const SUGGESTIONS = [
  "Cheap hotels in Cox's Bazar under $150",
  "Luxury hotels in Dhaka",
  "Hotels with 50+ rooms",
  "Resorts in Sylhet",
];

// ── Hotel result card ──────────────────────────────────────────────────
function HotelCard({ hotel, index }) {
  return (
    <a
      href={`/hotels/${hotel.id}`}
      className="block mt-2 rounded-xl overflow-hidden border border-white/10
        hover:border-[#c5a059]/40 transition-all duration-200 group"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      {/* Image */}
      {hotel.image && (
        <div className="h-28 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-3">
        {/* Name + link icon */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-white text-xs font-semibold leading-tight">
            {index + 1}. {hotel.name}
          </p>
          <FiExternalLink size={11} className="text-[#c5a059] flex-shrink-0 mt-0.5" />
        </div>

        {/* Description */}
        <p className="text-white/40 text-[10px] leading-relaxed mb-2 line-clamp-2">
          {hotel.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#c5a059] text-[10px]">
            <FiMapPin size={9} /> {hotel.location}
          </span>
          <span className="flex items-center gap-1 text-green-400 text-[10px] font-semibold">
            <FiDollarSign size={9} /> ${hotel.price}/night
          </span>
          <span className="flex items-center gap-1 text-white/50 text-[10px]">
            <ChevronDown size={9} /> {hotel.available_rooms} rooms
          </span>
        </div>

        {/* Tax note */}
        <p className="text-white/25 text-[9px] mt-1">
          ${hotel.price_with_tax} with tax
        </p>
      </div>
    </a>
  );
}

// ── Bot message renderer ───────────────────────────────────────────────
function BotMessage({ msg }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%]">
        {/* Avatar + text */}
        <div className="flex items-start gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40
            flex items-center justify-center text-[#c5a059] text-[9px] font-bold flex-shrink-0 mt-0.5">
            AI
          </div>
          <div
            className="text-[11px] text-gray-300 leading-relaxed px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {msg.text}
          </div>
        </div>

        {/* Hotel cards */}
        {msg.hotels && msg.hotels.length > 0 && (
          <div className="ml-8 flex flex-col gap-2">
            {msg.hotels.map((hotel, i) => (
              <HotelCard key={hotel.id} hotel={hotel} index={i} />
            ))}
          </div>
        )}

        {/* No results */}
        {msg.hotels && msg.hotels.length === 0 && (
          <div className="ml-8 text-[10px] text-white/30 italic mt-1">
            Try different search terms.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────
const ChatAssistant = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Welcome! I'm your Hotel Concierge. Tell me your budget, location, or preferences and I'll find the perfect hotel for you.",
      hotels: null,
    }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend(text) {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    try {
      const res = await axios.post(API, { message: msg });
      const data = res.data;

      setMessages(prev => [
        ...prev,
        {
          role:   'bot',
          text:   data.message,
          hotels: data.results,
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role:   'bot',
          text:   '⚠️ Something went wrong. Please try again.',
          hotels: null,
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Trigger Button ──────────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50
            bg-[#1a1a1a] text-[#c5a059] border border-[#c5a059]/30
            px-6 py-3 rounded-full shadow-2xl
            hover:scale-105 transition-all duration-300
            flex items-center gap-3
            uppercase tracking-[0.2em] text-[10px] font-bold"
        >
          <FiMessageSquare size={14} />
          Ask Concierge
        </button>
      )}

      {/* ── Backdrop ────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Drawer ──────────────────────────────────────────────── */}
      <aside
        className={`
          fixed right-0 top-0 h-full w-full md:w-[440px]
          bg-[#0f0f0f] text-white z-[70]
          transform transition-transform duration-500
          border-l border-[#c5a059]/20 shadow-2xl
          flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6
          border-b border-white/8 flex-shrink-0">
          <div>
            <h2 className="text-[#c5a059] text-lg font-light tracking-wide">
              Hotel Concierge
            </h2>
            <p className="text-white/30 text-[10px] tracking-widest uppercase mt-0.5">
              AI-powered hotel search
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4
            scrollbar-thin scrollbar-thumb-white/10"
        >
          {/* Suggestion chips — show only at start */}
          {messages.length === 1 && (
            <div className="flex flex-col gap-2 mb-2">
              <p className="text-white/25 text-[10px] uppercase tracking-widest">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-[10px] px-3 py-1.5 rounded-full
                      border border-[#c5a059]/25 text-[#c5a059]
                      hover:bg-[#c5a059]/10 transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            m.role === 'user' ? (
              // User bubble
              <div key={i} className="flex justify-end">
                <div
                  className="max-w-[80%] text-[11px] px-4 py-2.5 rounded-xl
                    text-[#c5a059] border border-[#c5a059]/20"
                  style={{ background: 'rgba(197,160,89,0.08)' }}
                >
                  {m.text}
                </div>
              </div>
            ) : (
              // Bot message + cards
              <BotMessage key={i} msg={m} />
            )
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-center gap-2 ml-8">
              <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-6 py-5 border-t border-white/8 flex-shrink-0">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl
              border border-white/10 focus-within:border-[#c5a059]/40
              transition-colors duration-200"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g. cheap hotel in Cox's Bazar under $200..."
              className="flex-1 bg-transparent text-white text-[12px]
                outline-none placeholder:text-white/20"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className={`transition-colors p-1 ${
                input.trim() && !loading
                  ? 'text-[#c5a059] hover:text-white cursor-pointer'
                  : 'text-white/15 cursor-not-allowed'
              }`}
            >
              <FiSend size={15} />
            </button>
          </div>
          <p className="text-white/15 text-[9px] text-center mt-2 tracking-wider uppercase">
            Powered by AI · Live hotel data
          </p>
        </div>
      </aside>
    </>
  );
};

export default ChatAssistant;