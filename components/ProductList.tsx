"use client";

import { Product } from "@/types";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductPreview from "./ProductPreview";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  const [product, setProduct] = useState<Product | undefined>();
  return (
    <>
      <ProductPreview item={product} />
      <div className="space-y-4">
        <h3 className="font-bold text-3xl pb-4">{title}</h3>
        {items.length === 0 && <p>No Product</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} setProduct={setProduct} />
          ))}
        </div>
      </div>{" "}
    </>
  );
};

export default ProductList;
