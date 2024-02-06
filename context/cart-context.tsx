"use client";

import { Product } from "@/types";
import { createContext, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}

type Item = {
  product: Product;
  amount: number;
};
interface CartContextProps {
  data: Item[];
  addItems: (value: Product) => void;
  removeItems: (id: string) => void;
  removeAll: (id: string) => void;
}

export const cartContext = createContext<CartContextProps>({
  data: [],
  addItems: (value: Product) => {},
  removeItems: (id: string) => {},
  removeAll: (id: string) => {},
});

export const CartContextProvider: React.FC<CartProviderProps> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItems = (value: Product) => {
    let updatedItems;
    const existedItemIndex = items.findIndex(
      (item) => item.product.id === value.id
    );

    if (existedItemIndex !== -1) {
      updatedItems = [...items];
      updatedItems[existedItemIndex] = {
        ...updatedItems[existedItemIndex],
        amount: updatedItems[existedItemIndex].amount + 1,
      };
      console.log(updatedItems);
    } else {
      updatedItems = [...items, { product: value, amount: 1 }];
    }

    setItems(updatedItems);
  };

  const removeItems = (id: string) => {
    let updatedItems;
    const removedItem = items.find((item) => item.product.id === id);
    const removedItemIndex = items.findIndex((item) => item.product.id === id);

    if (removedItem && removedItem.amount === 1) {
      updatedItems = items.filter((item) => item.product.id !== id);
    } else {
      updatedItems = [...items];
      updatedItems[removedItemIndex] = {
        ...updatedItems[removedItemIndex],
        amount: updatedItems[removedItemIndex].amount - 1,
      };
    }
    setItems(updatedItems);
  };

  const removeAll = (id: string) => {
    const updatedItems = items.filter((item) => item.product.id !== id);
    setItems(updatedItems);
  };
  return (
    <cartContext.Provider
      value={{ data: items, addItems, removeItems, removeAll }}
    >
      {children}
    </cartContext.Provider>
  );
};
