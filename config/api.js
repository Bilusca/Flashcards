import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { STORAGE_DECK_KEY, STORAGE_DECK_NOTIFICATION_KEY } from './decks';

export function submitDeck(deck) {
  getDecksResult().then(results => {
    if (results) {
      const deckObject = Object.assign(results, deck);
      return AsyncStorage.setItem(STORAGE_DECK_KEY, JSON.stringify(deckObject));
    }

    return AsyncStorage.setItem(STORAGE_DECK_KEY, JSON.stringify(deck));
  });
}

export function getDecksResult() {
  return AsyncStorage.getItem(STORAGE_DECK_KEY).then(decks =>
    JSON.parse(decks)
  );
}

export function submitQuestion(deck, question, answer) {
  getDecksResult().then(results => {
    results[deck].questions.push({ question, answer });

    return AsyncStorage.setItem(STORAGE_DECK_KEY, JSON.stringify(results));
  });
}

export function clearData() {
  return AsyncStorage.clear();
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(STORAGE_DECK_NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

export function cretateNotification() {
  return {
    title: 'Hello buddy.',
    body: '🖖 Get smart today, take a quiz!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(STORAGE_DECK_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(18);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(
              cretateNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            );
            AsyncStorage.setItem(
              STORAGE_DECK_NOTIFICATION_KEY,
              JSON.stringify(true)
            );
          }
        });
      }
    });
}
