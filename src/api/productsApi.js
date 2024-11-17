import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const fetchProducts = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const urlWithParams = `${API_URLS.products}?${queryString}`;
  return apiRequest(urlWithParams);
};
export const fetchProductById = async (productId) => {
  console.log(API_URLS.productById(productId));
  return apiRequest(API_URLS.productById(productId));
};

export const fetchUpdateProduct = async (productId, data) => {
  return apiRequest(API_URLS.productById(productId), "PUT", data);
};

export const fetchProductCreate = async (data) => {
  return apiRequest(API_URLS.products, "POST", data);
};
