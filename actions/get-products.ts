import { Product } from "@/types";
import axios from "axios";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query | null): Promise<Product[]> => {
  console.log(query);
  let url;
  if (query) {
    url = qs.stringifyUrl({
      url: URL,
      query: {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });
  } else {
    url = URL;
  }

  const res = await axios.get(url);
  return res.data;
};

export default getProducts;
