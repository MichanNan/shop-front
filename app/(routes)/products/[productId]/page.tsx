import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/Gallery";
import ProductList from "@/components/ProductList";
import { Separator } from "@/ui/separator";
import React from "react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  const relatedProducts = await getProducts({
    categoryId: product.category?.id,
  });

  return (
    <div className="m-2 md:mt-4 flex-col xl:ml-12 space-y-12">
      <Gallery product={product} isPreview={false} />
      <Separator />
      <ProductList title="Related Products" items={relatedProducts} />
    </div>
  );
};

export default ProductPage;
