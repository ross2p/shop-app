import { API_URLS, apiRequest } from "./api";

export const fetchCards = async (deck_id) => {
  return apiRequest(API_URLS.cards(deck_id));
};
