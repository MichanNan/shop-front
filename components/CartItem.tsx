"use client";

import { cartContext } from "@/context/cart-context";
import { Product } from "@/types";
import Image from "next/image";
import React, { useContext } from "react";
import IconButton from "./IconButton";
import Currency from "./Currency";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  item: { product: Product; amount: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const cartCtx = useContext(cartContext);

  const onAddItem = () => {
    cartCtx.addItems(item.product);
  };

  const onRemoveItem = () => {
    cartCtx.removeItems(item.product.id);
  };
  const onRemoveAll = () => {
    cartCtx.removeAll(item.product.id);
  };

  return (
    <li className="relative flex gap-8 flex-row py-6 border-b w-full md:justify-between">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={item.product.images[0].url}
          alt="image"
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-4 lg:gap-20 gap-2 items-center ">
        <div className="flex gap-2 md:gap-5 justify-evenly items-center">
          <IconButton icon={<Minus size={10} />} onClick={onRemoveItem} />
          <span>{item.amount}</span>
          <IconButton icon={<Plus size={10} />} onClick={onAddItem} />{" "}
        </div>
        <div className="flex justify-center items-center gap-2 md:gap-10">
          <span>Size: {item.product.size.name}</span>
          <span>Color:{item.product.color.name}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          Single price: <Currency value={item.product.price} />
        </div>
      </div>
      <div>
        <IconButton
          onClick={onRemoveAll}
          className="absolute top-4 right-0 md:right-4"
          icon={<X size={15} />}
        />
      </div>
    </li>
  );
};

export default CartItem;
