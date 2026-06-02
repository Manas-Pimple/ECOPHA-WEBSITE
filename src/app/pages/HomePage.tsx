import { HeroSection } from '../components/HeroSection';
import { LiveMetrics } from '../components/LiveMetrics';
import { LifecycleJourney } from '../components/LifecycleJourney';
import { CupTrace } from '../components/CupTrace';
import { CatCupGame } from '../components/CatCupGame';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Leaf, Beaker, Lightbulb, Palette } from 'lucide-react';

const navCards = [
  {
    to: '/about',
    icon: '👨‍🔬',
    title: 'Our Story',
    sub: 'Meet Wilson & the Ecopha vision',
    color: 'from-primary/10 to-primary/5',
    border: 'border-primary/20',
    textColor: 'text-primary',
  },
  {
    to: '/technology',
    icon: '⚗️',
    title: 'Technology',
    sub: 'From Pongamia oil to cup',
    color: 'from-secondary/10 to-secondary/5',
    border: 'border-secondary/20',
    textColor: 'text-secondary',
  },
  {
    to: '/innovation',
    icon: '🔬',
    title: 'Innovation',
    sub: 'PHA science & sustainability breakthroughs',
    color: 'from-accent/10 to-accent/5',
    border: 'border-accent/20',
    textColor: 'text-accent',
  },
  {
    to: '/impact',
    icon: '🌍',
    title: 'Design & Impact',
    sub: 'Products, partnerships & outcomes',
    color: 'from-purple-500/10 to-purple-500/5',
    border: 'border-purple-500/20',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
];

function ExploreSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-primary font-display mb-3">
            Explore <em className="text-secondary">Ecopha</em>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dive deeper into our science, story, and sustainability impact.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {navCards.map((card, i) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={card.to}
                className={`group block rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className={`font-display font-600 ${card.textColor} mb-1`}>{card.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{card.sub}</p>
                <div className={`flex items-center gap-1.5 text-sm font-600 ${card.textColor} group-hover:gap-3 transition-all duration-200`}>
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-6xl mb-6">🌏</div>
          <h2 className="text-primary font-display mb-4">
            Ready to Choose <em className="text-secondary">Better</em>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join the growing community of cafés, businesses, and individuals making the switch
            to Ecopha's compostable packaging. Every cup is a vote for a healthier planet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@ecoph aworld.com.au"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary text-white font-600 hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 text-lg"
            >
              <Leaf className="w-5 h-5" />
              Partner With Us
            </a>
            <Link
              to="/technology"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-secondary text-secondary font-600 hover:bg-secondary/10 transition-all duration-300 text-lg"
            >
              Learn the Science
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {['EN 13432 Certified', 'AS 4736 Approved', 'TÜV OK Compost HOME', 'Made in Australia', 'Marine Biodegradable'].map(badge => (
              <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-white text-[10px]">✓</span>
                </div>
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <LiveMetrics />
      <LifecycleJourney />
      <CupTrace />
      <CatCupGame />
      <ExploreSection />
      <CTASection />
    </main>
  );
}
