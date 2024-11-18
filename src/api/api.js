import API_BASE_URL from "../utils/API_BASE_URL";
import { useJwt } from "react-jwt";

export const API_URLS = {
  login: "/auth/login",
  register: "/auth/register",
  userByUserId: (userId) => `/users/${userId}`,
  products: "/products",
  addProduct: "/orderItems/addProduct",
  productById: (productId) => `/products/${productId}`,

  order: "/orders",
  orderItemsByOrderId: (orderId) => `/order/${orderId}/orderItems`,
  orderById: (orderId) => `/orders/${orderId}`,
  orderItemsById: (orderItemId) => `/orderItems/${orderItemId}`,
  allOrders: "/orders/all",

  comments: (productId) => `/product/${productId}/comment`,
  addComment: "/comment",

  address: "/addresses",

  category: "/category",

  images: "/images",
  imageById: (imageId) => `/images/${imageId}`,

  promotion: "/promotions",
};

export const apiRequest = async (
  url,
  method = "GET",
  body = null,
  param = null
) => {
  const token = localStorage.getItem("token");
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  console.log(body);
  try {
    const response = await fetch(API_BASE_URL + url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    console.log(response.url);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      return result;
    }

    return true;
  } catch (error) {
    console.error("API request failed:", {
      error,
      url: API_BASE_URL + url,
      method,
      body,
    });
    throw error;
  }
};
