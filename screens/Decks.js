import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PageView from '../components/ui/PageView';
import NoDecks from '../components/NoDecks';

export default class Decks extends Component {
  render() {
    return (
      <PageView style={style.page}>
        <NoDecks onPress={() => this.props.navigation.navigate('NewDeck')}/>
      </PageView>
    );
  }
}

const style = StyleSheet.create({
  page: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
