import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions/deckActions';
import PageView from '../components/ui/PageView';
import NoDecks from '../components/NoDecks';
import { getDecksResult, clearData } from '../config/api';
import { Text } from '../components/ui/Text';
import { ListItem } from '../components/ui/ListItem';
import { AppLoading } from 'expo';

class Decks extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    getDecksResult()
      .then(result => this.props.addDeck(result))
      .then(() => this.setState({ ready: true }))
      .then(() => this.setState({ ready: true }));
  };

  render() {
    const { navigation, decks } = this.props;
    const { ready } = this.state;

    if (!ready) {
      return (
        <PageView>
          <AppLoading />
        </PageView>
      );
    }

    if (!Object.keys(decks).length) {
      return (
        <PageView style={style.pageCenter}>
          <NoDecks onPress={() => navigation.navigate('NewDeck')} />
        </PageView>
      );
    }

    return (
      <PageView style={{ padding: 20 }}>
        <FlatList
          data={Object.keys(decks)}
          renderItem={({ item }) => (
            <ListItem
              onPress={() =>
                navigation.navigate('Deck', {
                  item,
                })
              }
            >
              <Text size={35} redText bold center style={{ marginBottom: 5 }}>
                {decks[item].title}
              </Text>
              <Text size={15} redText center style={{ marginBottom: 0 }}>
                {decks[item].questions.length} cards
              </Text>
            </ListItem>
          )}
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

function mapStateToProps({ decks }) {
  return { decks };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: deck => dispatch(addDeck(deck)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);
