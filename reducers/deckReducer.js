import { ADD_DECK, GET_DECK, ADD_CARD, GET_DECKS } from '../types';

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
    case GET_DECKS:
      return state;
    case GET_DECK:
      return {
        ...state,
        deck: state.decks[action.deck],
      };
    case ADD_CARD:
      const obj = {
        deck: {
          ...state.deck,
          questions: state.deck.questions.concat(action.question),
        },
        decks: {
          ...state.decks,
          [action.deck]: {
            ...state.decks[action.deck],
            questions: state.decks[action.deck].questions.concat(
              action.question
            ),
          },
        },
      };
      console.log(obj);
      return obj;
    default:
      return state;
  }
}
