import { ADD_DECK } from '../types';

export function deckReducer(state = {}, action) {
    switch(action.type) {
        case ADD_DECK:
            return Object.assign(state, action.deck)
        default:
            return state;
    }
}