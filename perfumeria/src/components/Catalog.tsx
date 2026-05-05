import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Product } from "../types";

interface CatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function Catalog({ products, selectedCategory, onSelectCategory }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.categoria === selectedCategory;
      const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (p.descripcion?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const categories = [
    { id: "all", name: "Todos" },
    { id: "hombre", name: "Hombre" },
    { id: "mujer", name: "Mujer" },
    { id: "unisex", name: "Unisex" },
    { id: "nicho", name: "Nicho" },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="catalogo" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Nuestro Catalogo</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 text-sm uppercase tracking-wider transition-all border ${
                    selectedCategory === cat.id
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                  data-testid={`filter-${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Buscar fragancias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                data-testid="input-search"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-background border border-border hover:border-primary/50 transition-colors flex flex-col"
                  data-testid={`card-product-${product.id}`}
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary/30 p-6 flex items-center justify-center">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/favicon.svg";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 border border-border bg-background/80 backdrop-blur-sm text-muted-foreground">
                        {product.categoria}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif mb-2 text-foreground">{product.nombre}</h3>
                    <p className="text-xs text-muted-foreground mb-4 flex-grow line-clamp-2">
                      {product.descripcion}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="text-primary font-medium">{formatPrice(product.precio)}</span>
                      <button className="text-xs uppercase tracking-wider text-foreground hover:text-primary transition-colors" data-testid={`button-ver-mas-${product.id}`}>
                        Ver mas
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl font-serif text-muted-foreground">No se encontraron productos.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                onSelectCategory("all");
              }}
              className="mt-4 text-primary hover:underline underline-offset-4"
              data-testid="button-clear-filters"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
