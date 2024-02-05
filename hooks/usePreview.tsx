"use client";
import { Product } from "@/types";
import React, { createContext, useState } from "react";

interface PreviewProviderProps {
  children: React.ReactNode;
}

interface PreviewContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const previewContext = createContext<PreviewContextProps>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
});

export const PreviewProvider: React.FC<PreviewProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <previewContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </previewContext.Provider>
  );
};
