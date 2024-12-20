import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const fetchOrderItems = async (orderId) => {
  return apiRequest(API_URLS.orderItemsByOrderId(orderId));
};

export const fetchOrders = async () => {
  return apiRequest(API_URLS.order);
};

export const fetchAddProduct = async (productId, quantity) => {
  return apiRequest(API_URLS.addProduct, "POST", {
    productId,
    quantity,
  });
};

export const featchCreateOrder = async () => {
  return apiRequest(API_URLS.order, "POST");
};

export const fetchUpdateOrderItem = async (orderItemId, data) => {
  console.log("data", data);
  return apiRequest(API_URLS.orderItemsById(orderItemId), "PUT", data);
};

export const fetchDeleteOrderItem = async (orderItemId) => {
  return apiRequest(API_URLS.orderItemsById(orderItemId), "DELETE");
};

export const fetchOrderById = async (orderId) => {
  return apiRequest(API_URLS.orderById(orderId));
};

export const fetchUpdateOrder = async (orderId, data) => {
  return apiRequest(API_URLS.orderById(orderId), "PUT", data);
};

export const fetchAllOrders = async (orderId) => {
  return apiRequest(API_URLS.allOrders);
};
