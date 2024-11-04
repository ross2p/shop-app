import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const featchProducts = async () => {
  return apiRequest(API_URLS.products);
};
