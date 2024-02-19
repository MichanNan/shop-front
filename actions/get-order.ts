import axios from "axios";

export const getOrders = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ORDER_API_URL}/orders`
  );

  return res.data;
};
