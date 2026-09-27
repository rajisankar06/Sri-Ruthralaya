import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, HelpCircle, ChevronDown } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import MudraIcon from '../common/MudraIcon';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Namaskaram! 🙏 I am your **Sri Ruthralaya AI Assistant**. How may I guide your Bharatanatyam journey today?',
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user, isAuthenticated } = useAuth();

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Suggested prompt chips based on authentication status
  const studentSuggestions = [
    "What's my attendance this month?",
    "When is my next class?",
    "Is my tuition fee due?",
    "Grade exam certification details",
  ];

  const guestSuggestions = [
    "Class timings & batches",
    "Monthly fee structure",
    "About Guru V. Suriya Sathian's legacy",
    "How do I enroll as a beginner?",
    "Salangai Pooja & Arangetram",
  ];

  const suggestions = isAuthenticated && user?.role === 'student' ? studentSuggestions : guestSuggestions;

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chatbot/message', { message: textToSend.trim() });
      if (res.data.success && res.data.data?.response) {
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: res.data.data.response,
          time: new Date(res.data.data.timestamp || Date.now()),
          isStudentContext: res.data.data.isStudentContext,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'Apologies, our divine assistant is momentarily meditating. Please try asking again shortly.',
        time: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text) => {
    // Basic Markdown parser for bold and bullet lists
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold parse **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-temple-gold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm my-0.5">
            {formattedParts}
          </li>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2"></div>;
      }

      return (
        <p key={idx} className="text-xs sm:text-sm my-0.5">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-2.5 rounded-full bg-[#111111] text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] border-2 border-[#d4af37] hover:scale-105 active:scale-95 transition-all flex items-center justify-center w-14 h-14"
          aria-label="Open Academy AI Chatbot"
        >
          <div className="absolute -inset-1 rounded-full bg-[#d4af37]/20 blur-sm group-hover:bg-[#d4af37]/40 transition-all animate-pulse"></div>
          <img src="/logo.png" alt="Sri Ruthralaya AI" className="w-9 h-9 object-contain relative z-10" />
          
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd700] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#d4af37] border border-[#111111]"></span>
          </span>

          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#0f0f0f] text-[#d4af37] border border-[#333333] text-xs font-cinzel whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            Ask Sri Ruthralaya AI
          </span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[550px] max-h-[85vh] bg-[#0f0f0f] rounded-2xl shadow-2xl border border-[#333333] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#111111] px-4 py-3.5 text-white border-b border-[#333333] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#d4af37] bg-[#080808] flex items-center justify-center p-1 shadow-[0_0_10px_rgba(212,175,55,0.3)] overflow-hidden">
                <img src="/logo.png" alt="Sri Ruthralaya Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-cinzel font-bold text-sm text-[#d4af37] tracking-wide">
                    Sri Ruthralaya AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[10px] text-[#aaaaaa] font-cormorant tracking-wider">
                  {isAuthenticated && user?.role === 'student'
                    ? `Disciple Mode: ${user.name}`
                    : 'Academy Guide & FAQ Assistant'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#aaaaaa] hover:text-white transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0f0f0f]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#111111] text-[#d4af37] border border-[#333333] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#d4af37] text-[#111111] font-medium rounded-br-none'
                      : 'bg-[#161616] text-[#eeeeee] rounded-bl-none border border-[#333333]'
                  }`}
                >
                  <div>{renderFormattedText(msg.text)}</div>
                  <div
                    className={`text-[9px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-[#111111]/70' : 'text-[#777777]'
                    }`}
                  >
                    {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#d4af37] text-[#111111] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm text-xs font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Loader */}
            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#d4af37] font-cinzel">
                <div className="w-6 h-6 rounded-full bg-[#111111] text-[#d4af37] border border-[#333333] flex items-center justify-center animate-spin">
                  <MudraIcon name="alapadma" className="w-3.5 h-3.5" />
                </div>
                <span>Consulting Natyashastra...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2 bg-[#111111] border-t border-[#222222] overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                disabled={loading}
                className="px-2.5 py-1 rounded-full text-[11px] bg-[#1a1a1a] border border-[#333333] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] transition-all shadow-xs flex-shrink-0"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#111111] border-t border-[#333333] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAuthenticated && user?.role === 'student' ? 'Ask about your attendance, fees, next class...' : 'Ask about classes, Guru, timings, fees...'}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#333333] focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#666666]"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#d4af37] text-[#111111] hover:bg-[#ffd700] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
