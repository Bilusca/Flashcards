import { ADD_DECK, GET_DECK, ADD_CARD, GET_DECKS } from '../types';

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function getDecks() {
  return {
    type: GET_DECKS,
  };
}

export function getDeck(deck) {
  return {
    type: GET_DECK,
    deck,
  };
}

export function addCard(deck, question) {
  return {
    type: ADD_CARD,
    deck,
    question,
  };
}
