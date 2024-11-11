import { API_URLS, apiRequest } from "./api";

export const fetchUserByUserId = async (userId) => {
  return apiRequest(API_URLS.userByUserId(userId));
};

export const fetchUpdateUser = async (userId, data) => {
  return apiRequest(API_URLS.userByUserId(userId), "PUT", data);
};

export const fetchCreateAddress = async (data) => {
  return apiRequest(API_URLS.address, "POST", data);
};

export const fetchAddresses = async () => {
  return apiRequest(API_URLS.address, "GET");
};
