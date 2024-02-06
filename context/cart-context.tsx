"use client";

import { Product } from "@/types";
import { createContext, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContextProps {
  data: Product[];
  addItems: (value: Product) => void;
  removeItems: (id: string) => void;
}

export const cartContext = createContext<CartContextProps>({
  data: [],
  addItems: (value: Product) => {},
  removeItems: (id: string) => {},
});

export const CartContextProvider: React.FC<CartProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addItems = (data: Product) => {
    setProducts((prev) => [...prev, data]);
  };

  const removeItems = (id: string) => {
    const updatedItems = products.filter((item) => item.id !== id);
    setProducts(updatedItems);
  };
  return (
    <cartContext.Provider value={{ data: products, addItems, removeItems }}>
      {children}
    </cartContext.Provider>
  );
};
