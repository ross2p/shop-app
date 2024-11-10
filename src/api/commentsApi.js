import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const fetchComments = async (productId) => {
  return apiRequest(API_URLS.comments(productId));
};

export const fetchAddComment = async (comment) => {
  return apiRequest(API_URLS.addComment, "POST", comment);
};
