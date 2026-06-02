import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { QrCode, CheckCircle, Clock, Leaf, MapPin, Recycle, Coffee, Sprout } from 'lucide-react';

const lifecycleStages = [
  { id: 1, icon: Coffee, label: 'Purchased', sub: 'Barista Coffee Co, Melbourne', date: '2 Jun 2026', done: true, color: '#0B72CC' },
  { id: 2, icon: QrCode, label: 'Scanned', sub: 'CupTrace™ activated', date: '2 Jun 2026', done: true, color: '#2E9E4F' },
  { id: 3, icon: MapPin, label: 'In Use', sub: 'Enjoy your coffee!', date: 'Now', done: true, color: '#F5A623', active: true },
  { id: 4, icon: Recycle, label: 'Composted', sub: 'Drop at compost point', date: 'Pending', done: false, color: '#7C4DFF' },
  { id: 5, icon: Sprout, label: 'Regenerated', sub: 'Soil nutrients returned', date: 'Pending', done: false, color: '#2E9E4F' },
];

const mockCupData = {
  id: 'ECO-2026-847293',
  manufacture: 'Ecopha Facility, Brisbane QLD',
  batch: 'PHA-BATCH-2026-Q2-088',
  material: 'PHB/PHBV Biopolymer — 100% Pongamia-derived',
  certifications: ['EN 13432', 'AS 4736', 'TÜV OK Compost HOME'],
  carbonFootprint: '0.012 kg CO₂e (vs 0.18 kg for PE cup)',
};

function QRDisplay() {
  return (
    <div className="relative w-44 h-44 rounded-2xl bg-white p-3 shadow-2xl mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* QR code visual pattern */}
        <rect width="100" height="100" fill="white" />
        {/* Corner squares */}
        {[[5,5],[65,5],[5,65]].map(([x,y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="30" height="30" fill="#0A0A0A" rx="3" />
            <rect x={x+4} y={y+4} width="22" height="22" fill="white" rx="1" />
            <rect x={x+8} y={y+8} width="14" height="14" fill="#0A0A0A" rx="1" />
          </g>
        ))}
        {/* Data modules (randomised pattern) */}
        {[
          [40,5],[45,5],[50,5],[55,5],
          [40,10],[50,10],[55,10],
          [45,15],[50,15],
          [40,20],[55,20],
          [70,40],[75,40],[80,40],[85,40],[90,40],
          [70,45],[80,45],[90,45],
          [75,50],[80,50],[85,50],
          [70,55],[75,55],[85,55],[90,55],
          [5,40],[10,40],[15,40],[20,40],[25,40],[30,40],
          [5,45],[15,45],[25,45],
          [10,50],[15,50],[20,50],[30,50],
          [5,55],[20,55],[25,55],[30,55],
          [40,70],[45,70],[50,70],[55,70],[60,70],
          [40,75],[50,75],[60,75],
          [45,80],[50,80],[55,80],[60,80],
          [40,85],[45,85],[55,85],
          [40,90],[50,90],[55,90],[60,90],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="5" height="5" fill="#0A0A0A" />
        ))}
        {/* Ecopha logo in center */}
        <rect x="42" y="42" width="16" height="16" rx="3" fill="#0B72CC" />
        <text x="50" y="53" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">E</text>
      </svg>
      {/* Scan ripple */}
      <div className="absolute inset-0 rounded-2xl border-2 border-primary animate-ping opacity-20" />
    </div>
  );
}

export function CupTrace() {
  const [traced, setTraced] = useState(false);
  const [activeStage, setActiveStage] = useState(3);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cuptrace" ref={ref} className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-600 mb-4">
            <QrCode className="w-4 h-4" />
            CupTrace™ Technology
          </div>
          <h2 className="text-primary font-display mb-4">
            Track Every Cup's <em className="text-secondary">Journey</em>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Scan the QR code on any Ecopha cup to see exactly where it is in its sustainability lifecycle —
            from café to compost.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: QR + scan demo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative rounded-3xl bg-card border border-border p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Scan to Trace
                </div>
                <QRDisplay />
                <div className="mt-4 text-xs text-muted-foreground font-mono">
                  Each Ecopha cup has a unique QR code
                </div>
              </div>

              {!traced ? (
                <button
                  onClick={() => setTraced(true)}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-600 hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  Simulate Cup Trace
                </button>
              ) : (
                <div className="rounded-xl bg-secondary/10 border border-secondary/20 p-4">
                  <div className="flex items-center gap-2 text-secondary font-600 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    Cup Successfully Traced!
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cup ID</span>
                      <span className="font-mono text-foreground">{mockCupData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material</span>
                      <span className="text-foreground text-right max-w-48">PHA Biopolymer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbon Footprint</span>
                      <span className="text-secondary font-600">{mockCupData.carbonFootprint.split(' ')[0]} kg CO₂e</span>
                    </div>
                  </div>
                  {/* Certifications */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {mockCupData.certifications.map(cert => (
                      <span key={cert} className="text-xs px-2 py-1 rounded-lg bg-secondary/20 text-secondary font-600">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Lifecycle tracker */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="rounded-3xl bg-card border border-border p-8 shadow-xl">
              <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                Lifecycle Status
              </div>

              <div className="space-y-4">
                {lifecycleStages.map((stage, i) => {
                  const Icon = stage.icon;
                  const isActive = stage.id === activeStage;
                  return (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        isActive ? 'bg-accent/10 border border-accent/30' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setActiveStage(stage.id)}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${stage.color}20`, border: `1px solid ${stage.color}40` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: stage.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-600 text-sm ${stage.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {stage.label}
                          </span>
                          {isActive && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-600">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{stage.sub}</div>
                      </div>
                      <div className="flex-shrink-0">
                        {stage.done ? (
                          <CheckCircle className="w-5 h-5 text-secondary" />
                        ) : (
                          <Clock className="w-5 h-5 text-muted-foreground/50" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Timeline progress bar */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Purchase</span>
                  <span>Composted</span>
                  <span>Regenerated</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '48%' } : {}}
                    transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1.5 text-right">
                  Stage 3 of 5 — In Use
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
