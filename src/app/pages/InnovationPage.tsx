import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Waves, Layers, Home } from 'lucide-react';

import type { ReactNode } from 'react';

type Environment = 'ocean' | 'soil' | 'compost' | 'landfill';

const envData: Record<Environment, {
  label: string; icon: ReactNode; color: string; bg: string;
  ecophaDays: number; ecophaDaysLabel: string;
  plasticYears: number; plasticLabel: string;
  ecophaDesc: string; plasticDesc: string;
  fact: string;
}> = {
  ocean: {
    label: 'Ocean', icon: <Waves className="w-5 h-5" />, color: '#0B72CC', bg: 'bg-primary/10',
    ecophaDays: 150, ecophaDaysLabel: '3–6 months',
    plasticYears: 400, plasticLabel: '400+ years',
    ecophaDesc: 'Marine microorganisms recognise PHA as food. The cup is enzymatically degraded and fully mineralised — leaving zero microplastics.',
    plasticDesc: 'Conventional plastic photodegrades into billions of microplastic fragments, entering the food chain and persisting indefinitely.',
    fact: '8 million tonnes of plastic enter the ocean annually. Ecopha cups leave nothing behind.',
  },
  soil: {
    label: 'Soil', icon: <Layers className="w-5 h-5" />, color: '#2E9E4F', bg: 'bg-secondary/10',
    ecophaDays: 90, ecophaDaysLabel: '2–4 months',
    plasticYears: 450, plasticLabel: '450+ years',
    ecophaDesc: 'Soil bacteria (Bacillus, Streptomyces) depolymerise PHA via extracellular PHA depolymerases — returning carbon to the soil food web.',
    plasticDesc: 'Plastic fragments accumulate in soil, disrupting earthworm activity, water retention, and plant root systems for centuries.',
    fact: 'Ecopha\'s PHA actually improves soil carbon content as it biodegrades.',
  },
  compost: {
    label: 'Home Compost', icon: <Home className="w-5 h-5" />, color: '#2E9E4F', bg: 'bg-secondary/10',
    ecophaDays: 135, ecophaDaysLabel: '90–180 days',
    plasticYears: 1000, plasticLabel: 'Never fully',
    ecophaDesc: 'In your backyard compost bin at ambient temperatures, Ecopha cups break down completely within one compost cycle — producing rich, stable humus.',
    plasticDesc: '"Compostable" bioplastics (PLA, PBAT) require industrial facilities at 60°C+. Ecopha PHA is certified for home compost conditions.',
    fact: 'Ecopha is one of very few packaging materials certified for HOME composting — not just industrial.',
  },
  landfill: {
    label: 'Landfill', icon: <Layers className="w-5 h-5" />, color: '#8B6914', bg: 'bg-accent/10',
    ecophaDays: 730, ecophaDaysLabel: '1–2 years',
    plasticYears: 500, plasticLabel: '500–1000 years',
    ecophaDesc: 'Even in oxygen-limited landfill conditions, Ecopha PHA biodegrades significantly faster than conventional plastic — though composting remains the preferred pathway.',
    plasticDesc: 'In landfill anaerobic conditions, plastics are virtually immortal — releasing methane precursors while persisting across hundreds of human generations.',
    fact: 'Composting is always preferred — but even in landfill, Ecopha dramatically outperforms conventional plastic.',
  },
};

const phaFacts = [
  { title: 'Home Compostable', desc: 'Certified OK Compost HOME — the world\'s most stringent compostability standard for ambient-temperature breakdown.', icon: '🏡', color: '#2E9E4F' },
  { title: 'Marine Biodegradable', desc: 'Recognised by the UN Environment Programme as a marine biodegradable bioplastic. Unique among packaging materials.', icon: '🌊', color: '#0B72CC' },
  { title: 'Soil Beneficial', desc: 'Biodegradation in soil produces CO₂, water, and organic matter — improving soil carbon and microbial diversity.', icon: '🌱', color: '#2E9E4F' },
  { title: 'Zero Microplastics', desc: 'PHA degrades to molecular level via enzymatic pathways — never fragmenting into persistent microplastic particles.', icon: '✅', color: '#0B72CC' },
  { title: 'Natural Origin', desc: '100% bio-based from Pongamia oil — no petroleum derivatives. Carbon neutral at end of life.', icon: '🌳', color: '#F5A623' },
  { title: 'Food Safe', desc: 'EU and Australian food-contact certified. No leaching of harmful compounds into food or beverages.', icon: '☕', color: '#7C4DFF' },
];

function DecompositionBar({ ecophaDays, plasticYears, color }: { ecophaDays: number; plasticYears: number; color: string }) {
  const maxDays = plasticYears * 365;
  const ecophaWidth = Math.min((ecophaDays / maxDays) * 100, 3);
  const plasticWidth = 100;

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-600" style={{ color }}>Ecopha Cup</span>
          <span className="font-mono font-600" style={{ color }}>
            {ecophaDays < 365 ? `${ecophaDays} days` : `${Math.round(ecophaDays / 365)} years`}
          </span>
        </div>
        <div className="h-6 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(ecophaWidth + 2, 8)}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full flex items-center px-2"
            style={{ backgroundColor: color }}
          >
            <span className="text-white text-xs font-700 whitespace-nowrap">
              {ecophaDays < 365 ? `${ecophaDays}d` : `${Math.round(ecophaDays/365)}yr`}
            </span>
          </motion.div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-600 text-muted-foreground">Conventional Plastic</span>
          <span className="font-mono font-600 text-muted-foreground">{plasticYears}+ years</span>
        </div>
        <div className="h-6 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-full rounded-full bg-gray-400 flex items-center justify-end px-3"
          >
            <span className="text-white text-xs font-700">{plasticYears}+ yrs</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable() {
  const rows = [
    { property: 'Material origin', ecopha: 'Pongamia oil (plant-based)', plastic: 'Petroleum / fossil fuels' },
    { property: 'Home compostable', ecopha: '✅ Yes — 90–180 days', plastic: '❌ Never' },
    { property: 'Marine biodegradable', ecopha: '✅ Yes — 3–6 months', plastic: '❌ 400+ years of fragments' },
    { property: 'Microplastics', ecopha: '✅ Zero — full mineralisation', plastic: '❌ Billions of fragments' },
    { property: 'Carbon footprint', ecopha: '0.012 kg CO₂e per cup', plastic: '0.18 kg CO₂e per cup' },
    { property: 'Food safety', ecopha: '✅ No leaching', plastic: '⚠️ Potential BPA/phthalates' },
    { property: 'Performance', ecopha: 'Identical to conventional cups', plastic: 'Industry standard' },
    { property: 'End of life', ecopha: 'Composted → soil nutrients', plastic: 'Landfill or ocean' },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-xl">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left px-5 py-3 text-sm font-600 text-muted-foreground">Property</th>
            <th className="text-left px-5 py-3 text-sm font-700 text-secondary">Ecopha PHA</th>
            <th className="text-left px-5 py-3 text-sm font-600 text-muted-foreground">Conventional Plastic</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.property} className={`border-t border-border ${i % 2 === 0 ? 'bg-card' : 'bg-background'}`}>
              <td className="px-5 py-3 text-sm text-muted-foreground">{row.property}</td>
              <td className="px-5 py-3 text-sm font-600 text-secondary">{row.ecopha}</td>
              <td className="px-5 py-3 text-sm text-muted-foreground">{row.plastic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InnovationPage() {
  const [activeEnv, setActiveEnv] = useState<Environment>('ocean');
  const env = envData[activeEnv];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/4 via-transparent to-primary/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-600 mb-6">
              🔬 Innovation
            </div>
            <h1 className="text-primary font-display mb-4">
              PHA Bioplastics:<br />
              <em className="text-secondary">Nature's Circular Solution</em>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Ecopha's innovations in PHA bioplastics are redefining what packaging can be —
              materials that improve the planet rather than pollute it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is PHA */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary font-display mb-6">What is <em className="text-secondary">PHA</em>?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Polyhydroxyalkanoate (PHA)</strong> is a family of natural biopolyesters
                  synthesised by microorganisms as energy storage compounds. They've existed in nature for billions of years.
                </p>
                <p>
                  Unlike petroleum plastics engineered to last forever, PHA is recognised by soil and marine microbes as a
                  natural substrate — they have enzymes specifically designed to digest it.
                </p>
                <p>
                  Ecopha uses <strong className="text-foreground">PHB/PHBV</strong> (polyhydroxybutyrate-co-hydroxyvalerate) —
                  the highest-performance PHA variant, offering excellent mechanical properties comparable to polypropylene
                  while remaining fully compostable.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {phaFacts.map((fact, i) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl bg-card border border-border p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl mb-2">{fact.icon}</div>
                  <div className="font-600 text-sm mb-1" style={{ color: fact.color }}>{fact.title}</div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{fact.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decomposition Explorer */}
      <section ref={ref} className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-primary font-display mb-3">
              Decomposition <em className="text-secondary">Timeline Explorer</em>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how Ecopha cups compare to conventional plastic across different environments.
            </p>
          </motion.div>

          {/* Environment selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(Object.keys(envData) as Environment[]).map((envKey) => {
              const e = envData[envKey];
              return (
                <button
                  key={envKey}
                  onClick={() => setActiveEnv(envKey as Environment)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all duration-200 font-600 text-sm ${
                    activeEnv === envKey
                      ? 'shadow-lg scale-105'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                  style={activeEnv === envKey ? {
                    borderColor: e.color,
                    backgroundColor: `${e.color}15`,
                    color: e.color,
                  } : {}}
                >
                  {e.icon}
                  {e.label}
                </button>
              );
            })}
          </div>

          {/* Environment detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEnv}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Timeline comparison */}
              <div className="rounded-3xl bg-card border border-border p-8 shadow-xl">
                <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                  Decomposition Timeline — {env.label}
                </div>
                <DecompositionBar
                  ecophaDays={env.ecophaDays}
                  plasticYears={env.plasticYears}
                  color={env.color}
                />
                <div className="mt-6 p-4 rounded-2xl text-sm italic text-muted-foreground" style={{ backgroundColor: `${env.color}10` }}>
                  💡 {env.fact}
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-5">
                <div
                  className="rounded-2xl border p-6"
                  style={{ borderColor: `${env.color}30`, backgroundColor: `${env.color}08` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-700"
                      style={{ backgroundColor: env.color }}>E</div>
                    <span className="font-700" style={{ color: env.color }}>Ecopha — {env.ecophaDaysLabel}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{env.ecophaDesc}</p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-700">P</div>
                    <span className="font-700 text-muted-foreground">Conventional Plastic — {env.plasticLabel}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{env.plasticDesc}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl text-center p-4 border border-border bg-card">
                    <div className="font-mono text-2xl font-700" style={{ color: env.color }}>
                      {env.ecophaDaysLabel}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Ecopha breakdown</div>
                  </div>
                  <div className="rounded-xl text-center p-4 border border-border bg-card">
                    <div className="font-mono text-2xl font-700 text-gray-400">
                      {env.plasticLabel}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Plastic breakdown</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-primary font-display mb-3">
              Ecopha vs <em className="text-secondary">Conventional Plastic</em>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Side by side, the difference is clear.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ComparisonTable />
          </motion.div>
        </div>
      </section>

      {/* Circular Economy */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-display mb-6">
              The <em className="text-secondary">Circular Economy</em> in Action
            </h2>
            {/* Circular flow diagram */}
            <div className="relative w-full max-w-lg mx-auto aspect-square mb-10">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#2E9E4F" opacity="0.6" />
                  </marker>
                </defs>
                {/* Circle */}
                <circle cx="200" cy="200" r="140" fill="none" stroke="#2E9E4F" strokeWidth="2" strokeDasharray="8,4" opacity="0.3" />

                {/* Nodes */}
                {[
                  { label: '🌳 Tree', sub: 'Pongamia', angle: 270, color: '#2E9E4F' },
                  { label: '🦠 Bacteria', sub: 'PHA production', angle: 342, color: '#7C4DFF' },
                  { label: '☕ Cup', sub: 'Consumer use', angle: 54, color: '#0B72CC' },
                  { label: '🌿 Compost', sub: '90–180 days', angle: 126, color: '#2E9E4F' },
                  { label: '🌱 Soil', sub: 'Nutrients', angle: 198, color: '#F5A623' },
                ].map(({ label, sub, angle, color }) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 200 + 140 * Math.cos(rad);
                  const cy = 200 + 140 * Math.sin(rad);
                  return (
                    <g key={label}>
                      <circle cx={cx} cy={cy} r="34" fill={color} opacity="0.15" />
                      <circle cx={cx} cy={cy} r="28" fill={color} opacity="0.25" />
                      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="16">{label.split(' ')[0]}</text>
                      <text x={cx} y={cy + 9} textAnchor="middle" fill={color} fontSize="8" fontWeight="bold">{label.split(' ').slice(1).join(' ')}</text>
                      <text x={cx} y={cy + 20} textAnchor="middle" fill="#888" fontSize="7">{sub}</text>
                    </g>
                  );
                })}

                {/* Center */}
                <circle cx="200" cy="200" r="45" fill="#0B72CC" opacity="0.1" />
                <text x="200" y="196" textAnchor="middle" fill="#0B72CC" fontSize="11" fontWeight="bold">Circular</text>
                <text x="200" y="210" textAnchor="middle" fill="#0B72CC" fontSize="11" fontWeight="bold">Economy</text>
              </svg>
            </div>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Every Ecopha cup is part of a closed loop — from Pongamia tree to café to compost bin
              to rich garden soil, and back to the beginning. No waste, no pollution, no compromise.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
