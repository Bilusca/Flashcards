import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PageView from '../components/ui/PageView';
import NoDecks from '../components/NoDecks';
import { getDecksResult, clearData } from '../config/api';
import { Text } from '../components/ui/Text';

export default class Decks extends Component {
  state = {
    decks: {},
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    getDecksResult().then(result => this.setState({decks: result}));
  };

  render() {
    const { decks } = this.state;

    if (!decks) {
      return (
        <PageView style={style.pageCenter}>
          <NoDecks onPress={() => this.props.navigation.navigate('NewDeck')} />
        </PageView>
      );
    }

    return (
      <PageView style={{ padding: 20 }}>
        <FlatList
          data={Object.keys(decks)}
          renderItem={({ item }) => <Text size={60} redText bold center>{decks[item].title}</Text>}
        />
      </PageView>
    );
  }
}

const style = StyleSheet.create({
  pageCenter: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
