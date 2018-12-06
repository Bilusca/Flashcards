import { ADD_DECK, GET_DECK, ADD_CARD } from '../types';

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
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
