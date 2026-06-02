import { motion } from 'motion/react';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.png';
import img6 from '../../assets/6.png';

const products = [
  { id: 1, src: img1, name: 'Product 1' },
  { id: 2, src: img2, name: 'Product 2' },
  { id: 3, src: img3, name: 'Product 3' },
  { id: 4, src: img4, name: 'Product 4' },
  { id: 5, src: img5, name: 'Product 5' },
  { id: 6, src: img6, name: 'Product 6' },
];

export function ShopPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Shop
          </span>
          <h1 className="text-foreground mb-4">Our Products</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Ecopha PHA bioplastic packaging — compostable, marine-safe, and beautiful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={p.src}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
