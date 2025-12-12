import { api } from "./api";

export const createOrder = (orderData) => {
  return api.post("/orders", orderData);
};

export const getMyOrders = () => {
  return api.get("/orders");
};
