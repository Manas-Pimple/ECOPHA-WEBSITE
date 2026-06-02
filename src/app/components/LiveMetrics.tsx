import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const metrics = [
  {
    icon: '☕',
    value: 847293,
    label: 'Cups Traced',
    suffix: '',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    desc: 'Tracked through our CupTrace™ system',
  },
  {
    icon: '🌱',
    value: 623841,
    label: 'Cups Composted',
    suffix: '',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    desc: 'Successfully composted & returned to earth',
  },
  {
    icon: '💨',
    value: 284,
    label: 'Tonnes CO₂ Saved',
    suffix: 't',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    desc: 'Carbon emissions avoided vs single-use plastic',
  },
  {
    icon: '♻️',
    value: 12.4,
    label: 'Tonnes Diverted',
    suffix: 't',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    desc: 'Waste diverted from landfill',
    decimals: 1,
  },
];

function useCountUp(target: number, duration = 2000, active = false, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const raf = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress >= 1) clearInterval(raf);
    }, 16);
    return () => clearInterval(raf);
  }, [active, target, duration]);
  return decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
}

function MetricCard({ metric, active }: { metric: typeof metrics[0]; active: boolean }) {
  const val = useCountUp(metric.value, 2200, active, metric.decimals);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl border ${metric.border} ${metric.bg} p-6 group hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* Background glow */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${metric.bg} opacity-60 group-hover:scale-150 transition-transform duration-500`} />

      <div className="relative">
        <div className="text-3xl mb-3">{metric.icon}</div>
        <div className={`font-mono text-4xl font-700 ${metric.color} leading-none mb-1`}>
          {val}{metric.suffix}
        </div>
        <div className="text-foreground font-600 mb-1">{metric.label}</div>
        <div className="text-muted-foreground text-sm">{metric.desc}</div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-xs text-muted-foreground font-mono">LIVE</span>
      </div>
    </motion.div>
  );
}

export function LiveMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 bg-muted/30 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-600 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Real-Time Impact Dashboard
          </div>
          <h2 className="text-foreground font-display">
            Our Cups, <span className="text-primary">Our Planet</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Every Ecopha cup tells a story. Watch our collective impact grow in real time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <MetricCard metric={m} active={isInView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
