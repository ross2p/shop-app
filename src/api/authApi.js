import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";
import { fetchUserByUserId } from "./userApi";

export const fetchLogin = async (userData) => {
  apiRequest(API_URLS.login, "POST", userData)
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.token);
      return response.token;
    })
    .then((token) => decodeToken(token))
    .then((decodedToken) => localStorage.setItem("user_id", decodedToken.id));
};

export const fetchRegister = async (userData) => {
  return apiRequest(API_URLS.register, "POST", userData);
};

export const fetchUser = async () => {
  const userId = localStorage.getItem("user_id");
  return fetchUserByUserId(userId);
};

export const fetchSignOut = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
};
