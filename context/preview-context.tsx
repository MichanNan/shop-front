"use client";
import { Product } from "@/types";
import React, { createContext, useState } from "react";

interface PreviewProviderProps {
  children: React.ReactNode;
}

interface PreviewContextProps {
  data: Product[];
  isOpen: boolean;
  onOpen: (value: Product) => void;
  onClose: () => void;
}
export const previewContext = createContext<PreviewContextProps>({
  data: [],
  isOpen: false,
  onOpen: (value: Product) => {},
  onClose: () => {},
});

export const PreviewProvider: React.FC<PreviewProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const onOpen = (data: Product) => {
    setProducts((prev) => [...prev, data]);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <previewContext.Provider
      value={{ data: products, isOpen, onOpen, onClose }}
    >
      {children}
    </previewContext.Provider>
  );
};
