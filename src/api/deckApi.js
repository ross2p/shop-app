import { API_URLS, apiRequest } from "./api";

// Fetch all decks
export const fetchDecks = async () => {
  return apiRequest(API_URLS.decks);
};

// Fetch all user`s decks
export const fetchDecksByUserId = async (userId) => {
  return apiRequest(API_URLS.deckByUserId(userId));
};

// Fetch a single deck by ID
export const fetchDeckById = async (deckId) => {
  return apiRequest(API_URLS.deckById(deckId));
};

// Create a new deck
export const createDeck = async (deckData) => {
  return apiRequest(API_URLS.deck, "POST", deckData);
};

// Update a deck by ID
export const updateDeck = async (deckId, deckData) => {
  return apiRequest(API_URLS.deckById(deckId), "PUT", deckData);
};

// Delete a deck by ID
export const deleteDeck = async (deckId) => {
  return apiRequest(API_URLS.deckById(deckId), "DELETE");
};

// Add new collaborator
export const addCollaborator = async (deckId, collaborator) => {
  return apiRequest(API_URLS.deckById(deckId), "POST", collaborator);
};
