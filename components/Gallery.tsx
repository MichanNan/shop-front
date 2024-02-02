import { Product } from "@/types";
import React from "react";
import ProductImage from "./ProductImage";
import { Separator } from "./ui/separator";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface GalleryProps {
  product: Product;
}

const Gallery: React.FC<GalleryProps> = ({ product }) => {
  return (
    <div className="flex gap-5">
      <ProductImage images={product.images} />
      <div className="flex flex-col w-full">
        <h3>{product.name}</h3>
        <span>{product.price}</span>
        <Separator />
        <span>{product.size.name}</span>
        <span>{product.color.name}</span>
        <Button className="w-[150px] flex justify-evenly">
          Add to Cart <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Gallery;
