import { API_URLS, apiRequest } from "./api";
import { decodeToken } from "react-jwt";

export const fetchImages = async () => {
  return apiRequest(API_URLS.images);
};

export const fetchImageById = async (imageId) => {
  return apiRequest(API_URLS.imageById(imageId));
};

export const fetchCreateImage = async (formData) => {
  try {
    const response = await fetch("http://localhost:8080/api/images", {
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
