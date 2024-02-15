"use client";

import { Color, Product, Size } from "@/types";
import React from "react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

interface ProductListProps {
  title: string;
  items: Product[];
  allProduct?: boolean;
  colors?: Color[] | undefined;
  sizes?: Size[] | undefined;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  allProduct,
  colors,
  sizes,
}) => {
  return (
    <>
      <div className="space-y-4">
        <h3 className="font-bold text-3xl pb-4">{title}</h3>
        {allProduct && <Filter colors={colors} sizes={sizes} />}
        {items.length === 0 && <p>No Product</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>{" "}
    </>
  );
};

export default ProductList;
