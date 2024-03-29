"use client";

import { Product } from "@/types";

import Image from "next/image";
import React, { MouseEventHandler, useContext } from "react";
import IconButton from "./IconButton";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./Currency";
import { useRouter } from "next/navigation";
import { previewContext } from "@/context/preview-context";
import { cartContext } from "@/context/cart-context";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();

  const previewCtx = useContext(previewContext);

  const cartCtx = useContext(cartContext);

  const session = useSession();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewCtx.onOpen(item);
  };

  const handleAddItem: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!session.data?.user) {
      toast.error("Please login first!");
    } else {
      cartCtx.addItems(item);
    }
  };

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-3"
      onClick={() => {
        router.push(`/products/${item.id}`);
      }}
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={item?.images[0].url}
          alt="Image"
          fill
          className="aspect-square rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 trasition absolute w-full px-6 bottom-5 ">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              icon={<Expand size={20} className="text-gray-600" />}
              onClick={onPreview}
            />
            <IconButton
              onClick={handleAddItem}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{item.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={item?.price} />
      </div>
      <div className="flex gap-x-6 justify-center"></div>
    </div>
  );
};

export default ProductCard;
