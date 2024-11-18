import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const fetchPromotionCreate = async (data) => {
  return apiRequest(API_URLS.promotion, "POST", data);
};
