import API from "./business.service";

export const createOrder = async (payload) => {
  const res = await API.post("/api/order", payload);
  return res.data;
};

export const getOrders = async () => {
  const res = await API.get("/api/order");
  return res.data.data; 
};
export const getUserOrder = async () => {
  const res = await API.get("/api/order/user");
  return res.data.data; 
};

//order cycles
//user
export const cancelOrder = async (orderId) => {
  const res = await API.post(`/api/order/${orderId}/cancel`);
  return res.data;
};
//business
export const confirmOrder = async (orderId) => {
  const res = await API.post(`/api/order/${orderId}/confirm`);
  return res.data;
};

export const markOrderReady = async (orderId) => {
  const res = await API.post(`/api/order/${orderId}/ready`);
  return res.data;
};

export const collectOrder = async (orderId) => {
  const res = await API.post(`/api/order/${orderId}/collect`);
  return res.data;
};



