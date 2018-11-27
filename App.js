import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import MainNavigation from './config/routes'
import { StatusWrapper } from './components/ui/StatusWrapper';
import PageView from './components/ui/PageView';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <PageView>
        <StatusWrapper>
          <StatusBar translucent />
        </StatusWrapper>
        <MainNavigation />
      </PageView>
    );
  }
}
