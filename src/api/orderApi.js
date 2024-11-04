import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const fetchOrderItems = async (orderId) => {
  return apiRequest(API_URLS.order(orderId));
};

export const fetchOrders = async () => {
  return apiRequest(API_URLS.order);
};
