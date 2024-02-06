"use client";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

interface ProductImageProps {
  images: ImageType[];
}

const ProductImage: React.FC<ProductImageProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0].url);

  return (
    <div className="flex flex-col gap-5 w-auto items-center md:items-start">
      <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative flex cursor-pointer items-center justify-center rounded-md bg-white">
        <Image
          className="object-cover object-center rounded-md"
          src={activeImage}
          fill
          alt="product image"
        />
      </div>

      <div className=" flex cursor-pointer items-center justify-start gap-3">
        {images.map((image) => (
          <span
            key={image.id}
            className={cn(
              "w-[100px] h-[100px] relative aspect-square overflow-hidden rounded-md",
              activeImage === image.url ? "border-2 border-gray-900" : ""
            )}
          >
            <Image
              onClick={() => setActiveImage(image.url)}
              key={image.id}
              src={image.url}
              alt="product iamge"
              fill
              className={cn(
                "object-cover object-center rounded-lg transition-all",
                activeImage === image.url ? "p-1" : ""
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
