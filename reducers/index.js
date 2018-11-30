import {combineReducers} from 'redux';
import {deckReducer} from './deckReducer'

export const rootReducer = combineReducers({
    decks: deckReducer
});