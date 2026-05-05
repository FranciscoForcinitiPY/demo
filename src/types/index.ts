export interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: "hombre" | "mujer" | "unisex" | "nicho";
  destacado?: boolean;
  descripcion?: string;
}
