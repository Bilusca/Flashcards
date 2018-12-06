import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigation from './config/routes';
import { StatusWrapper } from './components/ui/StatusWrapper';
import PageView from './components/ui/PageView';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer, applyMiddleware(logger));

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PageView>
          <StatusWrapper>
            <StatusBar translucent />
          </StatusWrapper>
          <MainNavigation />
        </PageView>
      </Provider>
    );
  }
}
