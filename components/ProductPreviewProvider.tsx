"use client";
import React, { useContext } from "react";
import ProductPreview from "./ProductPreview";
import { previewContext } from "@/context/preview-context";

const ProductPreviewProvider = () => {
  const previewCtx = useContext(previewContext);

  return <ProductPreview item={previewCtx.data[0]} />;
};

export default ProductPreviewProvider;
