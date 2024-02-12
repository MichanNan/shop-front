import getProducts from "@/actions/get-products";
import ProductList from "@/components/ProductList";
import ProductPreviewProvider from "@/components/ProductPreviewProvider";
import Image from "next/image";

export default async function Home() {
  const featuredProduct = await getProducts({ isFeatured: true });
  const products = await getProducts({});
  return (
    <div className="flex flex-col mt-5">
      <ProductPreviewProvider />
      <div className="mx-auto w-full">
        <Image
          className="rounded-lg mx-auto"
          src="/rocknwool-5EbAeycIhyA-unsplash.jpg"
          alt="billboard"
          width={1200}
          height={100}
        />
      </div>
      <div className="m-10">
        <ProductList title="Featured Products" items={featuredProduct} />
      </div>
      <div className="m-10">
        <ProductList title="Explore all Products" items={products} />
      </div>
    </div>
  );
}
