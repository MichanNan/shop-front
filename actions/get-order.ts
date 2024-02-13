import axios from "axios";

const getOrders = async () => {
  const res = await axios.get(`http://localhost:3000/api/orders`);

  return res.data;
};

export default getOrders;
