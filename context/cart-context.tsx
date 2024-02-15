"use client";

import { Product } from "@/types";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

interface CartProviderProps {
  children: React.ReactNode;
}

type Item = {
  product: Product;
  amount: number;
};
interface CartContextProps {
  data: Item[];
  isMax: boolean;
  addItems: (value: Product) => void;
  removeItems: (id: string) => void;
  removeAll: (id: string) => void;
}

export const cartContext = createContext<CartContextProps>({
  data: [],
  isMax: false,
  addItems: (value: Product) => {},
  removeItems: (id: string) => {},
  removeAll: (id: string) => {},
});

export const CartContextProvider: React.FC<CartProviderProps> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isMaxAmount, setIsMaxAmount] = useState(false);

  const addItems = (value: Product) => {
    let updatedItems;
    const existedItemIndex = items.findIndex(
      (item) => item.product.id === value.id
    );

    if (existedItemIndex !== -1) {
      updatedItems = [...items];

      if (
        updatedItems[existedItemIndex].amount ===
        updatedItems[existedItemIndex].product.amount - 1
      ) {
        setIsMaxAmount(true);
      } else if (
        updatedItems[existedItemIndex].amount <
        updatedItems[existedItemIndex].product.amount - 1
      ) {
        setIsMaxAmount(false);
      }
      if (
        updatedItems[existedItemIndex].amount ===
        updatedItems[existedItemIndex].product.amount
      ) {
        toast.error("You have added the max Amount of the product!");
      }

      if (!isMaxAmount) {
        updatedItems[existedItemIndex] = {
          ...updatedItems[existedItemIndex],
          amount: updatedItems[existedItemIndex].amount + 1,
        };
      }
    } else {
      updatedItems = [...items, { product: value, amount: 1 }];
    }

    setItems(updatedItems);
  };

  const removeItems = (id: string) => {
    setIsMaxAmount(false);
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
    setIsMaxAmount(false);
    const updatedItems = items.filter((item) => item.product.id !== id);
    setItems(updatedItems);
  };
  return (
    <cartContext.Provider
      value={{
        data: items,
        isMax: isMaxAmount,
        addItems,
        removeItems,
        removeAll,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
