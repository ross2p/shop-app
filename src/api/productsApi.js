import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const featchProducts = async () => {
  return apiRequest(API_URLS.products);
};

export const fetchProductById = async (productId) => {
  console.log(API_URLS.productById(productId));
  return apiRequest(API_URLS.productById(productId));
};
