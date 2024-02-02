import getProduct from "@/actions/get-product";
import Gallery from "@/components/Gallery";
import React from "react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  return (
    <div>
      <Gallery product={product} />{" "}
    </div>
  );
};

export default ProductPage;
