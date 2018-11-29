import { AsyncStorage } from 'react-native';
import { STORAGE_DECK_KEY } from './decks';

export function submitDeck(deck) {
    getDecksResult()
        .then(results => {
            if(results) {
                const deckObject = Object.assign(results, deck) 
                return AsyncStorage.setItem(STORAGE_DECK_KEY, JSON.stringify(deckObject))
            }

            return AsyncStorage.setItem(STORAGE_DECK_KEY, JSON.stringify(deck))
        })
}

export function getDecksResult() {
    return AsyncStorage.getItem(STORAGE_DECK_KEY)
        .then(decks => JSON.parse(decks))
}

export function clearData() {
    return AsyncStorage.clear();
}