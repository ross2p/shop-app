import API_BASE_URL from "../utils/API_BASE_URL";
import { useJwt } from "react-jwt";

export const API_URLS = {
  login: "/auth/login",
  register: "/auth/register",

  user: "/user",
  userByUserId: (user_id) => `/user/${user_id}`,

  decks: `/public/decks`,
  deck: "/deck",
  deckByUserId: (user_id) => `/user/${user_id}/deck`,
  deckById: (deck_id) => `/deck/${deck_id}`,

  cards: (deck_id) => `/deck/${deck_id}/cards`,
};

export const apiRequest = async (url, method = "GET", body = null) => {
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
  try {
    const response = await fetch(API_BASE_URL + url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
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
