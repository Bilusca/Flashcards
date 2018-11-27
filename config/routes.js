import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import Decks from '../screens/Decks';
import NewDeck from '../screens/NewDeck';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Decks: Decks,
    NewDeck: NewDeck,
  },
  {
    tabBarOptions: {
      tabStyle: {
        backgroundColor: '#f43b47',
      },
      indicatorStyle: {
        backgroundColor: '#453a94'
      }
    }
  }
);

const MainNavigation = createStackNavigator(
  {
    Home: {
      screen: TabNavigator,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export default createAppContainer(MainNavigation);
