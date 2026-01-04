import API from "./business.service";

export const createOrder = async (payload) => {
  const res = await API.post("/api/order", payload);
  return res.data;
};

export const getOrders = async () => {
  const res = await API.get("/api/order");
  return res.data.data; 
};

