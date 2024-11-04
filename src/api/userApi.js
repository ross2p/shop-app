import { API_URLS, apiRequest } from "./api";

export const fetchUserByUserId = async (userId) => {
  return apiRequest(API_URLS.userByUserId(userId));
};
