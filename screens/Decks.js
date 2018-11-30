import React, { Component } from 'react';
import { StyleSheet, FlatList, Animated } from 'react-native';
import PageView from '../components/ui/PageView';
import NoDecks from '../components/NoDecks';
import { getDecksResult, clearData } from '../config/api';
import { Text } from '../components/ui/Text';
import { ListItem } from '../components/ui/ListItem';

export default class Decks extends Component {
  state = {
    decks: {},
    _opacity: new Animated.Value(0)
  };

  componentDidMount() {
    this.loadData();

    Animated.timing(this.state._opacity, {
      toValue: 1,
      duration: 600,
    }).start();
  }

  loadData = () => {
    getDecksResult().then(result => this.setState({ decks: result }));
  };

  render() {
    const { decks, _opacity } = this.state;
    const { navigation } = this.props;

    if (!decks) {
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
            <Animated.View style={{ opacity: _opacity, flex: 1 }}>
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
                  {decks[item].questions.length} questions
                </Text>
              </ListItem>
            </Animated.View>
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
