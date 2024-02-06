"use client";
import { Product } from "@/types";
import React from "react";
import ProductImage from "./ProductImage";
import { Separator } from "../ui/separator";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Currency from "./Currency";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface GalleryProps {
  product: Product | undefined;
  isPreview: boolean | null;
}

const Gallery: React.FC<GalleryProps> = ({ product, isPreview }) => {
  const router = useRouter();

  if (!product) return;
  return (
    <div className="flex flex-col md:flex-row md:mt-12">
      {!isPreview && (
        <ArrowLeft
          className="w-8 h-8 mr-2 mb-2 md:mr-4 hover:cursor-pointer"
          onClick={() => router.push("/")}
        />
      )}
      <div
        className={cn(
          "mb-12 flex flex-col w-full gap-10",
          isPreview ? "" : "md:flex-row  justify-evenly"
        )}
      >
        <ProductImage images={product.images} />
        <div
          className={cn(
            "flex flex-col items-center md:items-start gap-4 w-full ",
            isPreview ? "" : "md:ml-5 lg:ml-[100px]"
          )}
        >
          <h3 className="font-bold text-4xl">{product.name}</h3>
          <span className="text-2xl">
            <Currency value={product.price} />
          </span>
          <Separator />
          <span className="text-xl">Size: {product.size.name}</span>
          <span className="text-xl">Color: {product.color.name}</span>
          <Button
            variant="outline"
            className="w-[180px] flex justify-evenly text-lg rounded-md bg-gray-100 hover:bg-gray-300"
          >
            Add to Cart <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
