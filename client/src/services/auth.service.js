import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (payload) => {
  const res = await API.post("/auth/sign-up", payload);
  return res.data;
};

export const signin = async (payload) => {
  const res = await API.post("/auth/sign-in", payload);
  return res.data;
};

export default API;
