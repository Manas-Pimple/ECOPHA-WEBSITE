import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Trophy, Star, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

type BinType = 'compost' | 'recycling' | 'landfill' | 'organic';

interface Item {
  id: number;
  emoji: string;
  name: string;
  bin: BinType;
  fact: string;
}

const items: Item[] = [
  { id: 1, emoji: '☕', name: 'Ecopha PHA Cup', bin: 'compost', fact: 'I\'m 100% home compostable! Ready for soil in 90–180 days 🌱' },
  { id: 2, emoji: '🥤', name: 'Plastic Straw', bin: 'landfill', fact: 'I take 200+ years to break down. Never put me in recycling! 😢' },
  { id: 3, emoji: '🍌', name: 'Banana Peel', bin: 'compost', fact: 'Perfect compost material — rich in potassium for your garden! 🌺' },
  { id: 4, emoji: '🍶', name: 'Glass Bottle', bin: 'recycling', fact: 'Glass can be recycled infinitely without losing quality! ♻️' },
  { id: 5, emoji: '📰', name: 'Newspaper', bin: 'recycling', fact: 'Paper recycling saves 17 trees per tonne. Keep the loop going! 🌳' },
  { id: 6, emoji: '🥗', name: 'Food Scraps', bin: 'organic', fact: 'Food waste makes amazing compost — divert it from landfill! 🌿' },
  { id: 7, emoji: '🛍️', name: 'Plastic Bag', bin: 'landfill', fact: 'Most councils can\'t recycle soft plastics at kerbside. Check REDcycle! ♻️' },
  { id: 8, emoji: '📦', name: 'Cardboard Box', bin: 'recycling', fact: 'Flatten first, then recycle! Cardboard is recycled gold 📦' },
  { id: 9, emoji: '🥣', name: 'Ecopha Bowl', bin: 'compost', fact: 'Ecopha\'s PHA bowls biodegrade in home compost — zero waste! ♻️' },
  { id: 10, emoji: '☕', name: 'Regular Coffee Cup', bin: 'landfill', fact: 'Plastic-lined paper cups can\'t be recycled. Switch to Ecopha! 😞' },
];

const bins: { id: BinType; label: string; emoji: string; color: string; bg: string; border: string; hint: string }[] = [
  { id: 'compost', label: 'Compost', emoji: '🌿', color: '#2E9E4F', bg: 'bg-secondary/10', border: 'border-secondary/40', hint: 'Home compostable materials' },
  { id: 'recycling', label: 'Recycling', emoji: '♻️', color: '#0B72CC', bg: 'bg-primary/10', border: 'border-primary/40', hint: 'Clean recyclables' },
  { id: 'landfill', label: 'Landfill', emoji: '🗑️', color: '#8B6914', bg: 'bg-accent/10', border: 'border-accent/40', hint: 'Non-recyclable materials' },
  { id: 'organic', label: 'Organic Waste', emoji: '🍂', color: '#7C4DFF', bg: 'bg-purple-500/10', border: 'border-purple-500/40', hint: 'Food & garden organics' },
];

const badges = [
  { min: 10, label: 'Eco Novice', emoji: '🌱', color: 'text-secondary' },
  { min: 50, label: 'Green Warrior', emoji: '🌿', color: 'text-secondary' },
  { min: 80, label: 'Planet Protector', emoji: '🌍', color: 'text-primary' },
  { min: 100, label: 'Sustainability Hero', emoji: '⭐', color: 'text-accent' },
];

function HoneyGuide({ message, expression }: { message: string; expression: string }) {
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex items-start gap-3 bg-card border border-border rounded-2xl rounded-tl-none p-4 shadow-lg max-w-xs"
    >
      <div className="text-3xl flex-shrink-0">{expression}</div>
      <p className="text-foreground text-sm leading-relaxed font-500">{message}</p>
    </motion.div>
  );
}

export function CatCupGame() {
  const [shuffled] = useState(() => [...items].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Item | null>(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ correct: boolean; fact: string }[]>([]);
  const [lastResult, setLastResult] = useState<null | 'correct' | 'wrong'>(null);
  const [gameOver, setGameOver] = useState(false);
  const [honeyMsg, setHoneyMsg] = useState("Welcome! I'm Honey 🐱 Help me sort these items correctly! Click an item, then click its bin.");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const currentItem = shuffled[current];

  const handleBinClick = (bin: BinType) => {
    if (!currentItem || gameOver) return;
    const correct = currentItem.bin === bin;
    const newScore = correct ? score + 10 : Math.max(0, score - 3);
    setScore(newScore);
    setLastResult(correct ? 'correct' : 'wrong');
    setResults(r => [...r, { correct, fact: currentItem.fact }]);
    setHoneyMsg(correct
      ? `${currentItem.fact}`
      : `Oops! ${currentItem.name} goes in ${bins.find(b => b.id === currentItem.bin)?.label}. ${currentItem.fact}`
    );

    setTimeout(() => {
      setLastResult(null);
      if (current + 1 >= shuffled.length) {
        setGameOver(true);
      } else {
        setCurrent(c => c + 1);
      }
    }, 2000);
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setResults([]);
    setLastResult(null);
    setGameOver(false);
    setHoneyMsg("Let's go again! Can you beat your score? 🐱");
  };

  const earnedBadge = badges.slice().reverse().find(b => score >= b.min);
  const accuracy = results.length > 0 ? Math.round((results.filter(r => r.correct).length / results.length) * 100) : 0;

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-secondary) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-sm font-600 mb-4">
            🎮 Interactive Learning Game
          </div>
          <h2 className="text-primary font-display mb-3">
            CatCup <em className="text-secondary">Sort</em>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Help Honey sort packaging waste correctly! Learn which materials belong where, and why it matters.
          </p>
        </motion.div>

        {!gameOver ? (
          <div className="space-y-8">
            {/* Honey guide + score */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <HoneyGuide message={honeyMsg} expression={lastResult === 'correct' ? '😸' : lastResult === 'wrong' ? '😿' : '🐱'} />

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-mono text-3xl font-700 text-primary">{score}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Eco Points</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-3xl font-700 text-secondary">{current + 1}/{shuffled.length}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Items</div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                animate={{ width: `${((current) / shuffled.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Current item */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem?.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`text-center py-10 rounded-3xl border-2 transition-all duration-300 ${
                  lastResult === 'correct' ? 'border-secondary bg-secondary/10' :
                  lastResult === 'wrong' ? 'border-destructive bg-destructive/10' :
                  'border-border bg-card'
                }`}
              >
                <div className="text-8xl mb-4">{currentItem?.emoji}</div>
                <h3 className="text-foreground font-display font-600 text-2xl">{currentItem?.name}</h3>
                <p className="text-muted-foreground text-sm mt-2">Where does this go?</p>
                {lastResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-center gap-2 mt-4 ${lastResult === 'correct' ? 'text-secondary' : 'text-destructive'}`}
                  >
                    {lastResult === 'correct' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span className="font-600">{lastResult === 'correct' ? '+10 Eco Points!' : '-3 Points'}</span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bins */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {bins.map(bin => (
                <motion.button
                  key={bin.id}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBinClick(bin.id)}
                  disabled={lastResult !== null}
                  className={`rounded-2xl border-2 ${bin.border} ${bin.bg} p-5 text-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg group`}
                >
                  <div className="text-3xl mb-2">{bin.emoji}</div>
                  <div className="font-600 text-sm" style={{ color: bin.color }}>{bin.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{bin.hint}</div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          /* Game over screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 rounded-3xl bg-card border border-border shadow-2xl"
          >
            <div className="text-6xl mb-4">{earnedBadge?.emoji ?? '🌱'}</div>
            <h3 className="text-primary font-display text-3xl mb-2">
              {earnedBadge?.label ?? 'Good Start!'}
            </h3>
            <div className="text-muted-foreground mb-8">
              You sorted {results.filter(r => r.correct).length} out of {results.length} items correctly!
            </div>

            <div className="flex justify-center gap-8 mb-10">
              <div>
                <div className="font-mono text-4xl font-700 text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Eco Points</div>
              </div>
              <div>
                <div className="font-mono text-4xl font-700 text-secondary">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="font-mono text-4xl font-700 text-accent">🏅</div>
                <div className="text-sm text-muted-foreground">Badge Earned</div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-8">
              {[1,2,3].map(i => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${i <= Math.ceil(accuracy / 34) ? 'text-accent fill-accent' : 'text-muted-foreground'}`}
                />
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-600 hover:bg-primary/90 transition-all duration-200 shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                Play Again
              </button>
              <a
                href="#lifecycle"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-secondary text-secondary font-600 hover:bg-secondary/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
