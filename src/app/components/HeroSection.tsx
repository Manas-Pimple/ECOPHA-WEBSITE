import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Leaf, Droplets, Recycle } from 'lucide-react';
import ecophaCup from '../../assets/ecopha-compostable-cup.jpeg';

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 8,
  size: 4 + Math.random() * 12,
  type: i % 3 === 0 ? 'leaf' : i % 3 === 1 ? 'bubble' : 'dot',
}));

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.2 + Math.random() * 0.5),
      r: 2 + Math.random() * 5,
      alpha: 0.1 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? '#0B72CC' : '#2E9E4F',
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
}

export function HeroSection() {
  const [honeyMsg, setHoneyMsg] = useState(0);
  const msgs = [
    '"Choose Better, Choose Ecopha!"',
    '"Our cups compost in 90 days 🌱"',
    '"PHA bioplastics from Pongamia trees!"',
    '"Zero plastic, full flavour ☕"',
  ];

  useEffect(() => {
    const t = setInterval(() => setHoneyMsg(m => (m + 1) % msgs.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <ParticleCanvas />

      {/* Background organic blobs */}
      <div className="absolute top-20 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.06] bg-primary animate-morph pointer-events-none" />
      <div className="absolute -bottom-20 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.05] bg-secondary animate-morph pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.03] bg-accent pointer-events-none" style={{ animation: 'morph 12s ease-in-out infinite' }} />

      {/* Floating leaf particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: '-20px',
            animation: `leaf-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.type === 'leaf'
            ? <Leaf style={{ width: p.size, height: p.size, color: '#2E9E4F', opacity: 0.3 }} />
            : p.type === 'bubble'
              ? <div style={{ width: p.size, height: p.size, borderRadius: '50%', backgroundColor: '#0B72CC', opacity: 0.2 }} />
              : <div style={{ width: p.size * 0.5, height: p.size * 0.5, borderRadius: '50%', backgroundColor: '#F5A623', opacity: 0.3 }} />
          }
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Text Content */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-600"
          >
            <Recycle className="w-4 h-4" />
            Australia's PHA Bioplastics Pioneer
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-primary font-display leading-[1.05]">
              The Future of<br />
              <span className="text-secondary italic">Compostable</span><br />
              Packaging
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-foreground/70 text-lg leading-relaxed max-w-lg"
          >
            Ecopha transforms <strong className="text-secondary">Pongamia oil</strong> into PHA bioplastic cups that
            home compost in 90 days, biodegrade in the ocean, and regenerate the soil.
            Nature's full circle — beautifully engineered.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Leaf, label: 'Home Compostable', color: 'text-secondary bg-secondary/10' },
              { icon: Droplets, label: 'Marine Biodegradable', color: 'text-primary bg-primary/10' },
              { icon: Recycle, label: 'Circular Economy', color: 'text-accent bg-accent/10' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 ${color}`}>
                <Icon className="w-4 h-4" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#lifecycle"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-primary text-white font-600 hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-primary/30 hover:-translate-y-1 animate-pulse-glow"
            >
              Explore Our Story
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#cuptrace"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border-2 border-secondary text-secondary font-600 hover:bg-secondary/10 transition-all duration-300"
            >
              Trace Your Cup™
            </a>
          </motion.div>
        </div>

        {/* Right: Ecopha cup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Speech bubble */}
          <motion.div
            key={honeyMsg}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="relative bg-card border border-border rounded-2xl rounded-bl-none px-6 py-4 shadow-xl max-w-xs text-center"
          >
            <p className="text-foreground font-display text-lg italic leading-snug">
              {msgs[honeyMsg]}
            </p>
            {/* Bubble tail */}
            <div className="absolute -bottom-3 left-6 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
          </motion.div>

          {/* Static product image */}
          <img
            src={ecophaCup}
            alt="Ecopha compostable plant-based cup"
            className="w-full max-w-[360px] rounded-3xl object-contain shadow-xl"
          />

          {/* Product label */}
          <div className="text-center">
            <div className="text-primary font-display font-700 text-xl">Ecopha Cup</div>
            <div className="text-muted-foreground text-sm">Plant-Based. Compostable. Made to Disappear.</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
