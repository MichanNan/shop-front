import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
export const getCategories = async () => {
  const res = await axios.get(URL);
  const categories = res.data.map((category: any) => ({
    id: category.id,
    name: category.name,
  }));

  return categories;
};
