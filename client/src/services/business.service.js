import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (payload) => {
  const res = await API.post("/api/Business/sign-up", payload);
  return res.data;
};

export const signin = async (payload) => {
  const res = await API.post("/api/Business/sign-in", payload);
  return res.data;
};

export default API;
