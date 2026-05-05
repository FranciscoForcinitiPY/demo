import { motion } from "framer-motion";
import { Product } from "../types";

interface FeaturedProps {
  products: Product[];
}

export function Featured({ products }: FeaturedProps) {
  const featuredProducts = products.filter(p => p.destacado).slice(0, 4);

  if (featuredProducts.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="destacados" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Destacados</h2>
            <div className="w-16 h-0.5 bg-primary"></div>
          </div>
          <p className="text-muted-foreground mt-4 md:mt-0 max-w-sm">
            Nuestras fragancias mas exclusivas, seleccionadas por maestros perfumistas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
              data-testid={`card-featured-${product.id}`}
            >
              <div className="relative aspect-[3/4] bg-card overflow-hidden mb-6 border border-border transition-colors duration-500 group-hover:border-primary/40">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60"></div>
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/favicon.svg";
                  }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="text-primary font-medium tracking-wide">{formatPrice(product.precio)}</span>
                </div>
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-2">{product.nombre}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
