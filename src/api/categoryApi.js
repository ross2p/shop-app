import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";
import { fetchUserByUserId } from "./userApi";

export const featchAllCategory = async () => {
  return apiRequest(API_URLS.category);
};

export const featchCreateCategory = async (data) => {
  return apiRequest(API_URLS.category, "POST", data);
};
