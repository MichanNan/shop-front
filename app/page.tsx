import { getColors } from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import { getSizes } from "@/actions/get-sizes";
import ProductList from "@/components/ProductList";
import ProductPreviewProvider from "@/components/ProductPreviewProvider";
import Image from "next/image";

interface ProductPageProds {
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const Home: React.FC<ProductPageProds> = async ({ searchParams }) => {
  const featuredProduct = await getProducts({ isFeatured: true });
  const products = await getProducts({
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const colors = await getColors();
  const sizes = await getSizes();

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
        <ProductList
          title="Explore all Products"
          items={products}
          allProduct
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default Home;
