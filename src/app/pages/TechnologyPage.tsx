import { useRef, useState } from 'react';
import React from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const processSteps = [
  {
    id: 1, icon: '🌳', title: 'Pongamia Trees',
    subtitle: 'The Source',
    color: '#2E9E4F',
    desc: 'Pongamia pinnata grows in marginal Australian land, requiring no irrigation, no pesticides, and no competition with food crops. A single tree produces seeds for 50+ years.',
    facts: ['Native Australian species', '50+ year productive life', 'Grows in degraded land', 'No food crop competition'],
    visual: 'tree',
  },
  {
    id: 2, icon: '🌰', title: 'Seed Harvesting',
    subtitle: 'Zero-Waste Collection',
    color: '#F5A623',
    desc: 'Seeds fall naturally when ripe. Our zero-waste collection process uses every part: oil for PHA fermentation, seed cake for animal feed or organic fertiliser.',
    facts: ['Natural seed fall collection', '100% seed utilisation', 'No agricultural machinery', 'Local farmer partnerships'],
    visual: 'seeds',
  },
  {
    id: 3, icon: '💧', title: 'Oil Extraction',
    subtitle: 'Cold-Press Technology',
    color: '#0B72CC',
    desc: 'Pongamia seeds yield ~35% oil through cold-press extraction — preserving the oil\'s quality and bioavailability for bacterial fermentation without chemical solvents.',
    facts: ['35% oil yield per seed', 'Cold-press extraction', 'No chemical solvents', 'Food-safe processing'],
    visual: 'extraction',
  },
  {
    id: 4, icon: '🦠', title: 'Bacterial Fermentation',
    subtitle: 'Nature\'s Bioreactor',
    color: '#7C4DFF',
    desc: 'Cupriavidus necator bacteria consume Pongamia oil as their carbon source. Under nutrient-limited conditions, they accumulate PHA biopolymer inside their cells — up to 80% of their body weight!',
    facts: ['Cupriavidus necator bacteria', 'Up to 80% PHB accumulation', 'Aerobic fermentation', '48–72 hour batch cycle'],
    visual: 'bacteria',
  },
  {
    id: 5, icon: '⚗️', title: 'PHA Extraction',
    subtitle: 'Molecular Harvest',
    color: '#0B72CC',
    desc: 'Cells are gently lysed and PHA is extracted via solvent-free mechanical disruption and aqueous separation, yielding pure PHB/PHBV polymer with MW >500,000 Da.',
    facts: ['Solvent-free extraction', 'MW >500,000 Da', 'PHB/PHBV blend', '>95% purity'],
    visual: 'extract',
  },
  {
    id: 6, icon: '🔩', title: 'Compounding',
    subtitle: 'Performance Engineering',
    color: '#F5A623',
    desc: 'PHA is compounded with natural additives (nucleating agents, plasticisers from plant sources) to achieve the flexibility, heat resistance, and processability needed for food packaging.',
    facts: ['Plant-based additives only', 'Heat resistance to 85°C', 'Optimised melt flow', 'EN 13432 compliant'],
    visual: 'compound',
  },
  {
    id: 7, icon: '🏭', title: 'Cup Manufacturing',
    subtitle: 'Precision Thermoforming',
    color: '#2E9E4F',
    desc: 'PHA pellets are thermoformed into smooth, food-grade cups on standard processing equipment. No special machinery needed — Ecopha integrates seamlessly into existing production lines.',
    facts: ['Standard thermoforming', 'Food-grade certification', 'Custom shapes & sizes', 'Australian made'],
    visual: 'manufacture',
  },
  {
    id: 8, icon: '☕', title: 'Consumer Use',
    subtitle: 'Performance Meets Purpose',
    color: '#F5A623',
    desc: 'Your barista pours a perfect flat white. The Ecopha cup feels identical to conventional plastic — same grip, same seal, same durability — but it\'s part of the earth\'s cycle.',
    facts: ['Identical to plastic UX', 'No flavour transfer', 'Leak-proof seal', 'Holds hot & cold'],
    visual: 'consumer',
  },
  {
    id: 9, icon: '🌿', title: 'Composting',
    subtitle: 'The Beautiful Return',
    color: '#2E9E4F',
    desc: 'Into your home compost bin. Microorganisms recognise PHA as a natural substrate and begin digesting it. In 90–180 days, the cup is entirely transformed into CO₂, water, and organic matter.',
    facts: ['90–180 days home compost', 'No microplastics', 'No toxic residues', 'Certified compostable'],
    visual: 'compost',
  },
  {
    id: 10, icon: '🌱', title: 'Soil Regeneration',
    subtitle: 'Full Circle Complete',
    color: '#2E9E4F',
    desc: 'The composted material enriches your garden soil with carbon and organic matter. The same nutrients that grew the Pongamia tree now feed your tomatoes. The circle is complete.',
    facts: ['Carbon-enriched compost', 'Improves soil structure', 'Feeds next plant generation', 'Zero net waste'],
    visual: 'soil',
  },
];

function ProcessVisual({ type, color }: { type: string; color: string }) {
  const shapes: Record<string, React.ReactElement> = {
    tree: (
      <svg viewBox="0 0 100 120" className="w-full h-full">
        <rect x="44" y="80" width="12" height="30" fill="#8B4513" rx="2" />
        <ellipse cx="50" cy="50" rx="35" ry="40" fill={color} opacity="0.7" />
        <ellipse cx="50" cy="35" rx="25" ry="28" fill={color} opacity="0.9" />
        <ellipse cx="50" cy="22" rx="18" ry="20" fill={color} />
        {[30,50,65,42,58].map((x, i) => (
          <circle key={i} cx={x} cy={45 + (i % 3) * 10} r="4" fill="white" opacity="0.2" />
        ))}
      </svg>
    ),
    seeds: (
      <svg viewBox="0 0 100 80" className="w-full h-full">
        {[[20,20],[50,15],[75,25],[35,45],[60,50],[80,40]].map(([cx,cy], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="12" ry="16" fill={color} opacity={0.6 + i * 0.07} transform={`rotate(${i*20} ${cx} ${cy})`} />
            <circle cx={cx} cy={cy} r="3" fill="white" opacity="0.4" />
          </g>
        ))}
      </svg>
    ),
    bacteria: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[[25,25],[55,20],[75,45],[40,60],[65,65],[20,65]].map(([cx,cy], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="14" ry="9" fill={color} opacity={0.5 + i*0.08}
              transform={`rotate(${i*30} ${cx} ${cy})`} />
            <circle cx={cx} cy={cy} r="5" fill={color} opacity="0.9" />
            {/* Flagella */}
            <path d={`M ${cx+14} ${cy} Q ${cx+22} ${cy-8} ${cx+18} ${cy-16}`}
              stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
          </g>
        ))}
        {/* PHB granule visualization */}
        <circle cx="50" cy="50" r="8" fill="white" opacity="0.3" />
        <text x="50" y="54" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PHB</text>
      </svg>
    ),
    default: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill={color} opacity="0.2" />
        <circle cx="50" cy="50" r="25" fill={color} opacity="0.4" />
        <circle cx="50" cy="50" r="12" fill={color} opacity="0.8" />
      </svg>
    ),
  };
  return shapes[type] || shapes.default;
}

function MolecularDiagram() {
  return (
    <div className="rounded-3xl bg-card border border-border p-8 shadow-xl">
      <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">PHA Molecular Structure</div>
      <svg viewBox="0 0 300 120" className="w-full">
        {/* Polymer chain backbone */}
        {[0,1,2,3].map(i => (
          <g key={i} transform={`translate(${i * 70}, 0)`}>
            {/* Carbon backbone */}
            <line x1="20" y1="60" x2="50" y2="45" stroke="#0B72CC" strokeWidth="2.5" />
            <line x1="50" y1="45" x2="80" y2="60" stroke="#0B72CC" strokeWidth="2.5" />
            {/* Ester linkage */}
            <line x1="80" y1="60" x2="90" y2="60" stroke="#2E9E4F" strokeWidth="2.5" strokeDasharray="4,2" />
            {/* Side chains */}
            <line x1="50" y1="45" x2="50" y2="15" stroke="#F5A623" strokeWidth="2" />
            {/* Atoms */}
            <circle cx="20" cy="60" r="8" fill="#0B72CC" />
            <circle cx="50" cy="45" r="8" fill="#7C4DFF" />
            <circle cx="80" cy="60" r="8" fill="#0B72CC" />
            <circle cx="50" cy="15" r="6" fill="#F5A623" />
            {/* Labels */}
            <text x="20" y="64" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">C</text>
            <text x="50" y="49" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">C</text>
            <text x="80" y="64" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">C</text>
            <text x="50" y="18" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">O</text>
          </g>
        ))}
        {/* Oxygen bridge */}
        <circle cx="88" cy="60" r="7" fill="#2E9E4F" />
        <text x="88" y="64" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">O</text>
        {/* Repeat bracket */}
        <text x="10" y="100" fill="#0B72CC" fontSize="18" fontWeight="bold">[</text>
        <text x="283" y="100" fill="#0B72CC" fontSize="18" fontWeight="bold">]</text>
        <text x="290" y="105" fill="#muted-foreground" fontSize="8">n</text>
        <text x="145" y="110" textAnchor="middle" fill="#5A7A65" fontSize="8">Polyhydroxybutyrate (PHB) — Ecopha's PHA</text>
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { color: '#0B72CC', label: 'Carbon (C)' },
          { color: '#2E9E4F', label: 'Oxygen (O)' },
          { color: '#F5A623', label: 'Carbonyl (C=O)' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechnologyPage() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const step = processSteps[activeStep];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-secondary/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-600 mb-6">
              ⚗️ Science & Process
            </div>
            <h1 className="text-primary font-display mb-4">
              From <em className="text-secondary">Pongamia Oil</em><br />to Cup
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              A 10-step journey from native Australian trees to home-compostable cups —
              guided by bacteria, engineered for circularity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Process Steps */}
      <section ref={sectionRef} className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Step selector */}
          <div className="overflow-x-auto pb-4 mb-8">
            <div className="flex gap-3 min-w-max mx-auto">
              {processSteps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(i)}
                  className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border transition-all duration-200 flex-shrink-0 ${
                    activeStep === i
                      ? 'border-primary bg-primary/10 shadow-lg scale-105'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-muted'
                  }`}
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-[11px] font-600 text-foreground/80 max-w-[70px] text-center leading-tight">{s.title}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${activeStep === i ? 'bg-primary' : 'bg-transparent'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Step detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Visual */}
            <div
              className="rounded-3xl border-2 p-8 aspect-square max-w-md mx-auto w-full flex items-center justify-center"
              style={{ borderColor: `${step.color}40`, backgroundColor: `${step.color}08` }}
            >
              <div className="w-full h-full max-w-xs max-h-xs">
                <ProcessVisual type={step.visual} color={step.color} />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      Step {step.id} of 10 — {step.subtitle}
                    </div>
                    <h2 className="text-foreground font-display" style={{ color: step.color }}>{step.title}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {step.facts.map(fact => (
                  <div
                    key={fact}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{ backgroundColor: `${step.color}10`, border: `1px solid ${step.color}25` }}
                  >
                    <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: step.color }}>
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                    <span className="text-foreground">{fact}</span>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-600 text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === processSteps.length - 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-600 text-sm hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-8 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
              animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* Molecular Science Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary font-display mb-3">
              The <em className="text-secondary">Science</em> Behind PHA
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Understanding the molecular structure that makes Ecopha cups compostable — and what makes them perform like plastic.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <MolecularDiagram />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              {[
                { title: 'Natural Origin', desc: 'PHB is a completely natural polyester found in many bacteria. It\'s nature\'s own biopolymer — identical structure to what microbes have produced for billions of years.', color: '#2E9E4F' },
                { title: 'Hydrolytic Degradation', desc: 'Water molecules cleave the ester bonds in the polymer chain. This process is catalysed by soil microbes that have evolved to digest PHA over millions of years.', color: '#0B72CC' },
                { title: 'Complete Mineralisation', desc: 'Unlike petroleum plastics, PHA leaves zero persistent residues. It mineralises fully to CO₂, water, and biomass — the same atoms that built the Pongamia tree.', color: '#F5A623' },
                { title: 'Performance Comparable to PE', desc: 'Ecopha\'s PHBV blend achieves tensile strength of 25 MPa and Tg of 60°C — matching conventional polyethylene for food service applications.', color: '#7C4DFF' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-card border border-border"
                >
                  <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-600 text-foreground mb-1" style={{ color: item.color }}>{item.title}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
