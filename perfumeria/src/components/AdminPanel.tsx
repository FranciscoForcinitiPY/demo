import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit2, Trash2, Plus, Save } from "lucide-react";
import { Product } from "../types";

interface AdminPanelProps {
  products: Product[];
  onAdd: (product: Omit<Product, "id">) => void;
  onUpdate: (id: string, product: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

export function AdminPanel({ products, onAdd, onUpdate, onDelete }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    nombre: "",
    precio: 0,
    imagen: "",
    categoria: "unisex",
    destacado: false,
    descripcion: ""
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      categoria: product.categoria,
      destacado: product.destacado || false,
      descripcion: product.descripcion || ""
    });
  };

  const handleSave = () => {
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      onDelete(id);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nombre: "",
      precio: 0,
      imagen: "",
      categoria: "unisex",
      destacado: false,
      descripcion: ""
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card border border-border w-full max-w-5xl rounded-sm shadow-2xl relative my-auto"
        >
          <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center z-10">
            <h2 className="text-2xl font-serif text-primary tracking-widest">ELIXIR ADMIN</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-close-admin"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1 bg-background p-6 border border-border">
              <h3 className="text-lg font-serif mb-4 text-foreground border-b border-border pb-2">
                {editingId ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Nombre</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                    data-testid="admin-input-nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Precio (ARS)</label>
                  <input
                    type="number"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                    className="w-full bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                    data-testid="admin-input-precio"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">URL Imagen</label>
                  <input
                    type="text"
                    value={formData.imagen}
                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                    className="w-full bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                    data-testid="admin-input-imagen"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Categoria</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
                    className="w-full bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                    data-testid="admin-select-categoria"
                  >
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="unisex">Unisex</option>
                    <option value="nicho">Nicho</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Descripcion</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground h-20 resize-none"
                    data-testid="admin-input-descripcion"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="destacado"
                    checked={formData.destacado}
                    onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                    className="accent-primary w-4 h-4"
                    data-testid="admin-checkbox-destacado"
                  />
                  <label htmlFor="destacado" className="text-sm text-foreground cursor-pointer">Destacado</label>
                </div>
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-primary text-primary-foreground py-2 text-sm font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    data-testid="admin-button-save"
                  >
                    {editingId ? <Save size={16} /> : <Plus size={16} />}
                    {editingId ? "Guardar" : "Agregar"}
                  </button>
                  {editingId && (
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 border border-border text-foreground hover:bg-secondary transition-colors text-sm"
                      data-testid="admin-button-cancel"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-xs tracking-wider uppercase text-muted-foreground font-medium">Img</th>
                    <th className="py-3 px-4 text-xs tracking-wider uppercase text-muted-foreground font-medium">Nombre</th>
                    <th className="py-3 px-4 text-xs tracking-wider uppercase text-muted-foreground font-medium">Precio</th>
                    <th className="py-3 px-4 text-xs tracking-wider uppercase text-muted-foreground font-medium">Cat</th>
                    <th className="py-3 px-4 text-xs tracking-wider uppercase text-muted-foreground font-medium">Dest</th>
                    <th className="py-3 px-4 text-xs tracking-wider uppercase text-muted-foreground font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <img src={product.imagen} alt={product.nombre} className="w-10 h-10 object-cover bg-secondary" />
                      </td>
                      <td className="py-3 px-4 text-sm font-serif">{product.nombre}</td>
                      <td className="py-3 px-4 text-sm text-primary">${product.precio}</td>
                      <td className="py-3 px-4 text-xs uppercase text-muted-foreground">{product.categoria}</td>
                      <td className="py-3 px-4 text-sm">
                        {product.destacado ? <span className="text-primary">★</span> : "-"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            data-testid={`admin-button-edit-${product.id}`}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            data-testid={`admin-button-delete-${product.id}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
