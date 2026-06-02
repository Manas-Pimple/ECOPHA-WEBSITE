import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Coffee, Building2, Globe, TrendingUp, Users, Leaf } from 'lucide-react';

const products = [
  { name: 'Ecopha Classic Cup', size: '8oz / 250ml', color: '#0B72CC', tag: 'Bestseller',  desc: 'Perfect for espresso-based drinks. 85°C heat resistance. Secure lid seal.' },
  { name: 'Ecopha Tall Cup', size: '12oz / 350ml', color: '#2E9E4F', tag: 'Most Popular',  desc: 'The go-to for lattes and long blacks. Same compostability, extra capacity.' },
  { name: 'Ecopha Bowl', size: '500ml', color: '#F5A623', tag: 'New', desc: 'Salad bowls, açaí, and takeaway meals. Leak-proof, sturdy, compostable.' },
  { name: 'Ecopha Cold Cup', size: '16oz / 473ml', color: '#7C4DFF', tag: 'Coming Soon', desc: 'Crystal-clear PHA cold cup for iced beverages and smoothies.' },
];

const impacts = [
  { icon: Coffee, label: 'Café Partners', value: '280+', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Globe, label: 'Cities Covered', value: '12', color: 'text-secondary', bg: 'bg-secondary/10' },
  { icon: Users, label: 'Happy Customers', value: '650K+', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: TrendingUp, label: 'Growth This Year', value: '340%', color: 'text-primary', bg: 'bg-primary/10' },
];

const caseStudies = [
  {
    name: 'Barista Coffee Co.',
    location: 'Melbourne, VIC',
    emoji: '☕',
    cups: '45,000',
    saving: '81 kg CO₂',
    quote: 'Our customers notice. They appreciate that our cups actually go in their compost bin at home. It\'s become a brand differentiator.',
    person: 'Sarah M., Owner',
  },
  {
    name: 'Green Festival Sydney',
    location: 'Sydney, NSW',
    emoji: '🎪',
    cups: '28,000',
    saving: '50.4 kg CO₂',
    quote: 'We achieved a near-zero-waste festival using Ecopha cups. All 28,000 cups were collected and composted on-site.',
    person: 'Marcus L., Events Director',
  },
  {
    name: 'University of QLD',
    location: 'Brisbane, QLD',
    emoji: '🎓',
    cups: '120,000/year',
    saving: '216 kg CO₂',
    quote: 'Switching to Ecopha aligned with our sustainability charter and gave us measurable impact data through CupTrace™.',
    person: 'Dr. Priya S., Sustainability Lead',
  },
];

const designFeatures = [
  { title: 'Heat Resistance', value: '85°C', icon: '🌡️', desc: 'Holds hot beverages without deformation' },
  { title: 'Compostable', value: '90–180 days', icon: '🌱', desc: 'Home compost certified (OK Compost HOME)' },
  { title: 'Tensile Strength', value: '25 MPa', icon: '💪', desc: 'Comparable to conventional polypropylene' },
  { title: 'Carbon Footprint', value: '0.012 kg', icon: '💨', desc: 'CO₂e per cup (93% less than PE)' },
  { title: 'Water Resistance', value: '100%', icon: '💧', desc: 'No leaching, leak-proof seal' },
  { title: 'Food Safe', value: 'FDA/FSANZ', icon: '✅', desc: 'Certified food-contact grade' },
];

function ProductCard({ p }: { p: typeof products[0] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl bg-card border border-border overflow-hidden shadow-lg group"
    >
      {/* Product visual */}
      <div
        className="h-48 flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${p.color}15, ${p.color}30)` }}
      >
        <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
          
        </div>
        {/* Tag */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-700 text-white"
          style={{ backgroundColor: p.color }}
        >
          {p.tag}
        </div>
        {/* Ecopha branding on cup */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1 rounded-full">
            <Leaf className="w-3 h-3" style={{ color: p.color }} />
            <span className="text-xs font-700" style={{ color: p.color }}>Ecopha</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-foreground font-display font-600">{p.name}</h3>
          <span className="text-xs font-mono text-muted-foreground mt-1">{p.size}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
        <div className="flex flex-wrap gap-2">
          {['Compostable', 'Marine Safe', 'Food Grade'].map(badge => (
            <span
              key={badge}
              className="text-xs px-2.5 py-1 rounded-lg font-600"
              style={{ backgroundColor: `${p.color}15`, color: p.color }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SustainabilityDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const monthlyData = [
    { month: 'Jan', cups: 42000, co2: 504 },
    { month: 'Feb', cups: 55000, co2: 660 },
    { month: 'Mar', cups: 71000, co2: 852 },
    { month: 'Apr', cups: 89000, co2: 1068 },
    { month: 'May', cups: 108000, co2: 1296 },
    { month: 'Jun', cups: 134000, co2: 1608 },
  ];

  const maxCups = Math.max(...monthlyData.map(d => d.cups));

  return (
    <div ref={ref} className="rounded-3xl bg-card border border-border p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">
            Impact Dashboard
          </div>
          <h3 className="text-foreground font-display font-600">Monthly Cup Deployments</h3>
        </div>
        <div className="flex items-center gap-2 text-secondary text-sm font-600">
          <TrendingUp className="w-4 h-4" />
          +219% YoY
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-3 h-32 mb-4">
        {monthlyData.map((d, i) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-lg transition-all duration-1000 relative group cursor-pointer"
              style={{
                height: isInView ? `${(d.cups / maxCups) * 100}%` : '4px',
                backgroundColor: '#0B72CC',
                opacity: 0.6 + (i / monthlyData.length) * 0.4,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-2 py-1 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                {(d.cups / 1000).toFixed(0)}k cups
              </div>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{d.month}</span>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="font-mono text-xl font-700 text-primary">499K</div>
          <div className="text-xs text-muted-foreground">Cups H1 2026</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-xl font-700 text-secondary">5,988 kg</div>
          <div className="text-xs text-muted-foreground">CO₂ Saved H1</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-xl font-700 text-accent">280+</div>
          <div className="text-xs text-muted-foreground">Active Partners</div>
        </div>
      </div>
    </div>
  );
}

export function DesignImpactPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/4 via-transparent to-primary/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-sm font-600 mb-6">
              🎨 Design & Impact
            </div>
            <h1 className="text-primary font-display mb-4">
              Beautiful Products,<br />
              <em className="text-secondary">Meaningful Impact</em>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Ecopha packaging performs identically to conventional cups — but it's part of the earth's cycle.
              Discover our products, partnerships, and measurable environmental outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-12 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {impacts.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl ${item.bg} border border-border p-6 text-center`}
                >
                  <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                  <div className={`font-mono text-3xl font-700 ${item.color}`}>{item.value}</div>
                  <div className="text-muted-foreground text-sm mt-1">{item.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product range */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary font-display mb-3">
              The <em className="text-secondary">Ecopha</em> Range
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every product designed for performance, every material chosen for circularity.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard p={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design specs */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-primary font-display mb-3">Technical <em className="text-secondary">Specifications</em></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {designFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-2xl bg-card border border-border"
              >
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{f.title}</div>
                  <div className="font-mono font-700 text-primary text-lg">{f.value}</div>
                  <div className="text-muted-foreground text-xs mt-1">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SustainabilityDashboard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h2 className="text-primary font-display">Real <em className="text-secondary">Impact</em>, Real Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every Ecopha cup generates real-time impact data through CupTrace™. We publish
                our full sustainability metrics — because transparency is the foundation of trust.
              </p>
              {[
                { label: 'CO₂ saved per cup', value: '0.168 kg', sub: 'vs conventional PE cups' },
                { label: 'Compost conversion rate', value: '74%', sub: 'of traced cups confirmed composted' },
                { label: 'Landfill diversion', value: '12.4 tonnes', sub: 'Total waste kept from landfill' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border"
                >
                  <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-primary to-secondary flex-shrink-0" />
                  <div>
                    <div className="font-mono text-xl font-700 text-primary">{stat.value}</div>
                    <div className="text-foreground font-600 text-sm">{stat.label}</div>
                    <div className="text-muted-foreground text-xs">{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary font-display mb-3">Partner <em className="text-secondary">Stories</em></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Real outcomes from Ecopha's café and event partners across Australia.</p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="rounded-3xl bg-card border border-border p-6 shadow-lg"
              >
                <div className="text-4xl mb-4">{c.emoji}</div>
                <h3 className="text-foreground font-display font-600 mb-1">{c.name}</h3>
                <div className="text-muted-foreground text-sm mb-4 flex items-center gap-1.5">
                  📍 {c.location}
                </div>
                <blockquote className="text-foreground text-sm italic leading-relaxed mb-5 border-l-2 border-secondary pl-4">
                  "{c.quote}"
                </blockquote>
                <div className="text-muted-foreground text-xs mb-5">— {c.person}</div>
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl bg-primary/10 p-3 text-center">
                    <div className="font-mono font-700 text-primary text-lg">{c.cups}</div>
                    <div className="text-xs text-muted-foreground">Cups</div>
                  </div>
                  <div className="flex-1 rounded-xl bg-secondary/10 p-3 text-center">
                    <div className="font-mono font-700 text-secondary text-lg">{c.saving}</div>
                    <div className="text-xs text-muted-foreground">CO₂ Saved</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-6">🤝</div>
            <h2 className="text-primary font-display mb-4">
              Ready to Make the Switch?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join 280+ Australian businesses choosing Ecopha. We handle delivery, composting guidance,
              CupTrace™ setup, and staff training.
            </p>
            <a
              href="mailto:hello@ecoph aworld.com.au"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary text-white font-600 hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 text-lg"
            >
              <Building2 className="w-5 h-5" />
              Become a Partner
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
