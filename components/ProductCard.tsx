"use client";

import { Product } from "@/types";

import Image from "next/image";
import React, { MouseEventHandler, useContext } from "react";
import IconButton from "./IconButton";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./Currency";
import { useRouter } from "next/navigation";
import { previewContext } from "@/hooks/usePreview";

interface ProductCardProps {
  item: Product;
  setProduct: (value: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, setProduct }) => {
  const router = useRouter();

  const previewCtx = useContext(previewContext);
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewCtx.onOpen();
    setProduct(item);
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
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 trasition absolute w-full px-6 bottom-5 ">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              icon={<Expand size={20} className="text-gray-600" />}
              onClick={onPreview}
            />
            <IconButton
              onClick={() => {}}
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
