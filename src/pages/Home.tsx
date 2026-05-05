import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { Featured } from "../components/Featured";
import { Catalog } from "../components/Catalog";
import { Footer } from "../components/Footer";
import { AdminPanel } from "../components/AdminPanel";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <Featured products={products} />
        <Categories onSelectCategory={setSelectedCategory} />
        <Catalog 
          products={products} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </main>
      <Footer />
      
      <AdminPanel 
        products={products}
        onAdd={addProduct}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
}
