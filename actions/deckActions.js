import {ADD_DECK} from '../types';

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}