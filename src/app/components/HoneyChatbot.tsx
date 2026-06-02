import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import honeyAvatar from '../../assets/honey.jpeg';

interface Message {
  id: number;
  from: 'user' | 'honey';
  text: string;
  time: string;
}

const kb: { patterns: RegExp[]; response: string }[] = [
  {
    patterns: [/pha|bioplastic|polyhydroxy/i],
    response: "PHA stands for Polyhydroxyalkanoate — a natural biopolymer produced by bacteria when they're fed Pongamia oil! It's like nature's own plastic, formed inside bacterial cells. Unlike petroleum plastics, PHA returns to nature in months, not centuries. 🔬🌿",
  },
  {
    patterns: [/compost|compostable|home compost/i],
    response: "Ecopha cups are certified home compostable! In your backyard compost bin, they break down in just 90–180 days — no special industrial facility needed. They leave behind zero microplastics and actually enrich your compost with carbon. 🌱",
  },
  {
    patterns: [/marine|ocean|sea|water/i],
    response: "One of Ecopha's proudest achievements — our cups are marine biodegradable! If accidentally lost to the ocean, they break down in 3–6 months, unlike conventional plastics that last 400+ years. 🌊",
  },
  {
    patterns: [/pongamia|tree|plant|oil/i],
    response: "Pongamia pinnata is an Australian native tree. Its oil feeds bacteria to produce PHA bioplastic. Every cup starts with a tree! ",
  },
  {
    patterns: [/hello|hi|hey|g'day|howdy/i],
    response: "G'day!  I'm Honey! Ask me anything about Ecopha and sustainability ",
  },
];

function getResponse(input: string): string {
  const match = kb.find(k => k.patterns.some(p => p.test(input)));
  return match?.response ?? "Great question! Reach out at hello@ecophaworld.com.au ";
}

function now() {
  return new Date().toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function HoneyChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'honey',
      text: "G'day!  I'm Honey! Ask me anything ",
      time: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now(),
      from: 'user',
      text,
      time: now(),
    };

    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      const honeyMsg: Message = {
        id: Date.now() + 1,
        from: 'honey',
        text: getResponse(text),
        time: now(),
      };

      setMessages(m => [...m, honeyMsg]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-2xl">
              <img
                src={honeyAvatar}
                alt="Honey"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] bg-white rounded-3xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-green-500 text-white rounded-t-3xl">
              <img
                src={honeyAvatar}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="font-bold">Honey</div>
                <div className="text-xs opacity-80">Ecopha Assistant</div>
              </div>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.from === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.from === 'honey' && (
                    <img
                      src={honeyAvatar}
                      className="w-7 h-7 rounded-xl mr-2"
                    />
                  )}

                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${
                      msg.from === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] opacity-60 mt-1">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-2">
                  <img
                    src={honeyAvatar}
                    className="w-7 h-7 rounded-xl"
                  />
                  <div className="bg-gray-100 px-3 py-2 rounded-2xl text-sm">
                    typing...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                className="flex-1 px-3 py-2 border rounded-xl"
                placeholder="Ask Honey..."
              />
              <button
                onClick={send}
                className="bg-green-500 text-white px-3 rounded-xl"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}