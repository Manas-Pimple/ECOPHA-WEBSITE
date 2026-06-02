import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const stages = [
  {
    id: 1,
    icon: '🌳',
    title: 'Pongamia Forests',
    subtitle: 'It starts with nature',
    desc: 'Native Pongamia trees grow across Australia, thriving in marginal land without competing with food crops. Their oil-rich seeds are the key to everything.',
    color: '#2E9E4F',
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
  },
  {
    id: 2,
    icon: '🌾',
    title: 'Seed Harvest',
    subtitle: 'Zero-waste collection',
    desc: 'Seeds fall naturally and are collected sustainably. The entire seed is utilised — oil for PHA production, cake as animal feed or fertiliser.',
    color: '#F5A623',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
  },
  {
    id: 3,
    icon: '🔬',
    title: 'PHA Fermentation',
    subtitle: 'Bacteria do the heavy lifting',
    desc: 'Specialist bacteria (Cupriavidus necator) consume Pongamia oil and produce polyhydroxyalkanoate (PHA) — a natural biopolymer inside their cells.',
    color: '#0B72CC',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
  },
  {
    id: 4,
    icon: '⚗️',
    title: 'Biopolymer Processing',
    subtitle: 'Nature meets engineering',
    desc: 'PHA is extracted and compounded into food-grade pellets, maintaining its natural compostability while achieving the performance of conventional plastics.',
    color: '#7C4DFF',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
  {
    id: 5,
    icon: '☕',
    title: 'Beautiful Cups',
    subtitle: 'Crafted for your café',
    desc: 'PHA pellets are thermoformed into smooth, heat-resistant cups. Indistinguishable from plastic — except they\'re part of nature\'s cycle.',
    color: '#0B72CC',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
  },
  {
    id: 6,
    icon: '🏪',
    title: 'Café & Consumer',
    subtitle: 'Your daily ritual, reimagined',
    desc: 'Baristas pour, customers sip. The Ecopha cup does its job brilliantly — keeping drinks hot, hands cool, and your conscience clear.',
    color: '#F5A623',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
  },
  {
    id: 7,
    icon: '🌿',
    title: 'Home Composting',
    subtitle: 'The beautiful end',
    desc: 'In your home compost bin, the Ecopha cup breaks down in 90–180 days. No microplastics. No toxic residues. Just rich, garden-ready compost.',
    color: '#2E9E4F',
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
  },
];

function StageCard({ stage, index }: { stage: typeof stages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative flex gap-6 items-start">
      {/* Timeline line + node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`w-16 h-16 rounded-2xl ${stage.bg} border-2 ${stage.border} flex items-center justify-center text-2xl shadow-lg z-10`}
        >
          {stage.icon}
        </motion.div>
        {index < stages.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-0.5 h-16 mt-2 origin-top"
            style={{ backgroundColor: stage.color, opacity: 0.3 }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`flex-1 rounded-2xl border ${stage.border} ${stage.bg} p-5 mb-4 group hover:shadow-lg transition-shadow duration-300`}
      >
        <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: stage.color }}>
          Stage {stage.id} — {stage.subtitle}
        </div>
        <h3 className="text-foreground font-display font-600 mb-2">{stage.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{stage.desc}</p>

        {/* Stage number badge */}
        <div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
          <span className="text-xs font-mono font-600 text-muted-foreground">{stage.id}</span>
        </div>
      </motion.div>
    </div>
  );
}

function CupIllustration({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 80 100" className="w-full h-full">
      <defs>
        <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B72CC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2E9E4F" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path d="M 15 15 L 25 85 L 55 85 L 65 15 Z" fill="url(#cupGrad)" rx="4" />
      <rect x="15" y="13" width="50" height="5" rx="2" fill="#0B72CC" opacity="0.9" />
      {/* Cup shine */}
      <path d="M 22 20 L 26 75" stroke="white" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
      {/* Progress indicator - leaves growing from bottom */}
      {progress > 0.7 && (
        <g>
          <path d="M 40 90 Q 30 75 35 65 Q 45 75 40 90" fill="#2E9E4F" opacity="0.6" />
          <path d="M 40 90 Q 50 75 55 65 Q 45 75 40 90" fill="#45C66A" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}

export function LifecycleJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="lifecycle" ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-80 h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, var(--color-secondary) 0, var(--color-secondary) 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-600 mb-4">
            🌍 The Full Circle
          </div>
          <h2 className="text-primary font-display mb-4">
            Life of an <em className="text-secondary">Ecopha</em> Cup
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From Pongamia seed to compost-ready matter — a journey that restores more than it consumes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_200px] gap-12 items-start">
          {/* Journey stages */}
          <div className="relative">
            <div className="space-y-0">
              {stages.map((stage, i) => (
                <StageCard key={stage.id} stage={stage} index={i} />
              ))}
            </div>
          </div>

          {/* Sticky cup illustration */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="w-48 h-48 mx-auto"
              >
                <CupIllustration progress={0.8} />
              </motion.div>
              <div className="text-center mt-4">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">The Ecopha Cup</div>
                <div className="text-sm text-secondary font-600 mt-1">Home Compostable</div>
              </div>

              {/* Circular flow indicator */}
              <div className="mt-8 p-4 rounded-2xl bg-secondary/10 border border-secondary/20 text-center">
                <div className="text-2xl mb-2">♻️</div>
                <div className="text-xs font-mono text-secondary uppercase tracking-wide">Circular by Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
