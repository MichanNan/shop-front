import { getCategories } from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ProductList";
import { Category } from "@/types";
import React from "react";

const CategoriesPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const products = await getProducts({ categoryId: params.categoryId });
  const categories = await getCategories();
  const category = categories.find(
    (category: Category) => category.id === params.categoryId
  );

  return (
    <div>
      <ProductList
        items={products}
        title={`Explore all products in the category ${category.name}`}
      />
    </div>
  );
};

export default CategoriesPage;
