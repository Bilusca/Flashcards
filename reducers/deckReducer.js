import { ADD_DECK, GET_DECK, ADD_CARD } from '../types';

const INITIAL_STATE = {
  decks: {},
  deck: {},
};

export function deckReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        decks: Object.assign(state.decks, action.deck),
      };
    case GET_DECK:
      return {
        ...state,
        deck: state.decks[action.deck],
      };
    case ADD_CARD:
      return {
        ...state,
        decks: {
          [action.deck]: {
            ...[action.deck],
            questions: [action.deck].questions.concat(action.question),
          },
        },
      };
    default:
      return state;
  }
}
