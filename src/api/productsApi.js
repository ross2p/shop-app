import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const featchProducts = async () => {
  return apiRequest(API_URLS.products);
};

export const fetchProductById = async (productId) => {
  console.log(API_URLS.productById(productId));
  return apiRequest(API_URLS.productById(productId));
};

export const fetchUpdateProduct = async (productId, data) => {
  return apiRequest(API_URLS.productById(productId), "PUT", data);
};

export const fetchProductCreate = async (formData) => {
  try {
    const response = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      body: formData, // передаємо FormData, яка містить дані продукту та файли
    });

    if (!response.ok) {
      throw new Error("Не вдалося створити продукт. Спробуйте ще раз.");
    }

    const createdProduct = await response.json();
    return createdProduct;
  } catch (error) {
    console.error("Помилка при створенні продукту:", error);
    throw error; // перекидаємо помилку, щоб її можна було обробити у компоненті
  }
};
