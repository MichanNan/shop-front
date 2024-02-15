import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;
export const getColors = async () => {
  const res = await axios.get(URL);

  return res.data;
};
