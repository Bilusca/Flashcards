import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Decks from '../screens/Decks';
import Deck from '../screens/Deck';
import NewDeck from '../screens/NewDeck';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import NewQuestion from '../screens/NewQuestion';
import Quiz from '../screens/Quiz';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
          let color;

          if (focused) {
            color = '#fff';
          } else {
            color = 'rgba(255, 255, 255, 0.5)';
          }

          return (
            <MaterialCommunityIcons
              name="cards-outline"
              size={20}
              color={color}
            />
          );
        },
      }),
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
          let color;

          if (focused) {
            color = '#fff';
          } else {
            color = 'rgba(255, 255, 255, 0.5)';
          }

          return (
            <Ionicons name="md-add-circle-outline" size={20} color={color} />
          );
        },
      }),
    },
  },
  {
    activeColor: '#fff',
    inactiveColor: 'rgba(255, 255, 255, 0.5)',
    barStyle: { backgroundColor: '#453a94' },
  }
);

const MainNavigation = createStackNavigator(
  {
    Home: {
      screen: TabNavigator,
    },
    Deck: {
      screen: Deck,
    },
    NewQuestion: {
      screen: NewQuestion,
    },
    Quiz: {
      screen: Quiz,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export default createAppContainer(MainNavigation);
