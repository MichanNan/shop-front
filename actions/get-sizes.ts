import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;
export const getSizes = async () => {
  const res = await axios.get(URL);

  return res.data;
};
