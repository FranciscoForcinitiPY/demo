import { useState, useEffect } from "react";
import { Product } from "../types";
import { defaultProducts } from "../data/defaultProducts";

const STORAGE_KEY = "elixir_products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    }
  }, []);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: crypto.randomUUID() };
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    const newProducts = products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p));
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
