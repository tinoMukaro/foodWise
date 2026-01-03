import API from "./business.service";

export const createOrder = async (payload) => {
  const res = await API.post("/api/order", payload);
  return res.data;
};
