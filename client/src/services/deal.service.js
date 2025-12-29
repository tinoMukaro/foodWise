// services/deal.service.js
import API from "./business.service";

export const createDeal = async (payload) => {
  const res = await API.post("/api/deals", payload);
  return res.data;
};

export const getBusinessDeals = async () => {
  const res = await API.get("/api/deals/");
  return res.data; 
};

export const getDealsForUser = async () => {
  const res = await API.get("/api/deals/all");
  return res.data; 
}