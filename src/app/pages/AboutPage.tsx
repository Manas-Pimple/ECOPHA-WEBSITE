import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Heart, Award, Globe, Lightbulb, Leaf, ArrowRight } from 'lucide-react';
import wilsonImg from '../../assets/wilson.webp';


const milestones = [
  {
    year: '2020',
    title: 'The Vision',
    desc: 'Wilson discovers PHA bioplastics research during his environmental science studies. Horrified by ocean plastic statistics, he commits to finding a circular packaging solution.',
    icon: '💡',
    color: '#F5A623',
  },
  {
    year: '2021',
    title: 'Pongamia Discovery',
    desc: 'A breakthrough moment — Wilson connects with Pongamia oil researchers and realises the native Australian tree is the perfect PHA feedstock. Ecopha is born.',
    icon: '🌳',
    color: '#2E9E4F',
  },
  {
    year: '2022',
    title: 'First Prototype',
    desc: 'After months of fermentation trials and material testing, the first Ecopha PHA cup prototype rolls off the line. Wilson shares coffee from it and cries happy tears.',
    icon: '☕',
    color: '#0B72CC',
  },
  {
    year: '2023',
    title: 'Certifications',
    desc: 'Ecopha achieves EN 13432, AS 4736, and TÜV OK Compost HOME certifications. The science is validated by the world\'s most rigorous compostability standards.',
    icon: '✅',
    color: '#7C4DFF',
  },
  {
    year: '2024',
    title: 'First Café Partnerships',
    desc: '50 Melbourne cafés adopt Ecopha cups. Customers love them — indistinguishable from plastic, but they compost in their backyard bins. The movement begins.',
    icon: '🤝',
    color: '#2E9E4F',
  },
  {
    year: '2025',
    title: 'CupTrace™ Launch',
    desc: 'Ecopha launches the world\'s first cup-level lifecycle tracking system. Every cup gets a QR code. Transparency becomes a feature, not a buzzword.',
    icon: '📱',
    color: '#0B72CC',
  },
  {
    year: '2026',
    title: 'Global Ambition',
    desc: 'Over 847,000 cups traced. Ecopha begins international expansion into NZ, Southeast Asia, and the UK. The circular packaging revolution scales.',
    icon: '🌏',
    color: '#F5A623',
  },
];

const values = [
  {
    icon: Leaf,
    title: 'Regenerative by Design',
    desc: 'Every product we make is designed to return more to the earth than it takes. Not just sustainable — regenerative.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Globe,
    title: 'Radical Transparency',
    desc: 'CupTrace™ exists because we believe you deserve to see exactly where your packaging goes. No greenwashing, just truth.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Lightbulb,
    title: 'Science-First',
    desc: 'Every claim is backed by peer-reviewed research, third-party certification, and rigorous material testing.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Heart,
    title: 'Community Rooted',
    desc: 'Ecopha grows with the communities that adopt it — farmers, cafés, composters, and conscious consumers.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
];

function MilestoneItem({ m, i }: { m: typeof milestones[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = i % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex-1 max-w-xs lg:max-w-sm"
        style={{ textAlign: isLeft ? 'right' : 'left' }}
      >
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
          {m.year}
        </div>
        <h3 className="text-foreground font-display font-600 mb-2">{m.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
      </motion.div>

      {/* Center node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg z-10"
        style={{ backgroundColor: `${m.color}20`, border: `2px solid ${m.color}50` }}
      >
        {m.icon}
      </motion.div>

      {/* Spacer */}
      <div className="flex-1 max-w-xs lg:max-w-sm" />
    </div>
  );
}

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <main className="pt-24">
      {/* Hero */}
      <section ref={heroRef} className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/4 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-600 mb-6">
              <Heart className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-primary font-display mb-6">
              Meet <em className="text-secondary">Wilson</em>,<br />
              the man who bet on bacteria.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Wilson founded Ecopha with one obsessive question: what if packaging could improve the planet
              instead of destroying it? The answer was hiding in a native Australian tree and
              the microbes that love its oil.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, Ecopha is Australia's leading PHA bioplastics company — producing compostable cups
              that home compost in 90 days, biodegrade in the ocean, and turn into soil nutrients rather
              than microplastic poison.
            </p>
          </motion.div>

          {/* Founder portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-border flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
                <img src={wilsonImg} alt="Wilson" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <div className="text-primary font-display font-700 text-2xl">Wilson</div>
                <div className="text-muted-foreground text-sm">Founder & Chief Sustainability Officer</div>
                <div className="text-muted-foreground text-xs mt-1">Brisbane, Queensland</div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 w-full">
                <p className="text-foreground text-sm italic leading-relaxed text-center font-display">
                  "I want my grandchildren to live in a world where packaging returns to the earth.
                  That's not a dream — that's what Ecopha makes real, cup by cup."
                </p>
              </div>
            </div>
            {/* Award badges */}
            <div className="absolute -bottom-4 -right-4 flex flex-col gap-2">
              {['🏆 2024 CleanTech Award', '🌿 B Corp Pending', '🇦🇺 Australian Innovation'].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-card border border-border rounded-xl px-3 py-1.5 text-xs font-600 text-foreground shadow-lg"
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary font-display mb-3">
              The <em className="text-secondary">Ecopha</em> Journey
            </h2>
            <p className="text-muted-foreground">From a university lab to a global movement.</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-20 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <MilestoneItem key={m.year} m={m} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary font-display mb-3">What We <em className="text-secondary">Stand For</em></h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl ${v.bg} border border-border p-6`}
                >
                  <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${v.color}`} />
                  </div>
                  <h3 className={`font-display font-600 ${v.color} mb-2`}>{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Award className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-primary font-display mb-6">Our Mission</h2>
            <p className="text-xl text-foreground font-display italic leading-relaxed mb-8">
              "To make single-use packaging part of the circular economy — where every cup, bowl,
              and container becomes compost, not pollution."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@ecoph aworld.com.au"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-600 hover:bg-primary/90 transition-all shadow-lg"
              >
                Work With Us <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
