import { motion } from "framer-motion";

interface CategoriesProps {
  onSelectCategory: (category: "hombre" | "mujer" | "unisex" | "nicho" | "all") => void;
}

export function Categories({ onSelectCategory }: CategoriesProps) {
  const categories = [
    { id: "hombre", name: "Hombre", image: "/cat-hombre.png" },
    { id: "mujer", name: "Mujer", image: "/cat-mujer.png" },
    { id: "unisex", name: "Unisex", image: "/cat-unisex.png" },
    { id: "nicho", name: "Nicho", image: "/cat-nicho.png" },
  ];

  const handleCategoryClick = (id: string) => {
    onSelectCategory(id as any);
    const element = document.getElementById("catalogo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categorias" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Colecciones</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-sm"
              onClick={() => handleCategoryClick(cat.id)}
              data-testid={`card-category-${cat.id}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              
              <div className="absolute inset-0 border border-primary/0 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.2)]"></div>
              
              <div className="absolute bottom-8 left-0 w-full text-center">
                <h3 className="text-2xl font-serif text-white tracking-wider mb-2 transition-transform duration-500 group-hover:-translate-y-2">{cat.name}</h3>
                <span className="text-primary text-xs uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-2 inline-block">
                  Explorar
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
