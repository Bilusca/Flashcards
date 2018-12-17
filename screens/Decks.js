import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { addDeck, getDecks } from '../actions/deckActions';
import PageView from '../components/ui/PageView';
import NoDecks from '../components/NoDecks';
import { getDecksResult, clearData, setLocalNotification } from '../config/api';
import { Text } from '../components/ui/Text';
import { ListItem } from '../components/ui/ListItem';
import { AppLoading } from 'expo';

class Decks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      _opacity: new Animated.Value(0),
      _translate: new Animated.ValueXY({ x: 0, y: 100 }),
    };
  }

  componentDidMount() {
    setLocalNotification();
    this.loadData();
  }

  loadData = () => {
    getDecksResult()
      .then(result => this.props.addDeck(result))
      .then(() => this.props.getDecks())
      .then(() => {
        this.setState({ ready: true });

        Animated.parallel([
          Animated.spring(this.state._translate.y, {
            toValue: 0,
            speed: 2,
            bounciness: 0,
            useNativeDriver: true,
          }),
          Animated.timing(this.state._opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]).start();
      });
  };

  render() {
    const { navigation, decks } = this.props;
    const { ready, _opacity, _translate } = this.state;

    console.log(decks);

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
          <NoDecks
            animatedValues={{
              transform: [..._translate.getTranslateTransform()],
              opacity: _opacity,
            }}
            onPress={() => navigation.navigate('NewDeck')}
          />
        </PageView>
      );
    }

    return (
      <PageView style={{ padding: 20 }}>
        {Object.keys(decks).length > 0 && (
          <FlatList
            data={Object.keys(decks)}
            renderItem={({ item }) => (
              <ListItem
                style={{
                  transform: [..._translate.getTranslateTransform()],
                  opacity: _opacity,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Deck', {
                      deck: item,
                    })
                  }
                >
                  <Text
                    size={35}
                    redText
                    bold
                    center
                    style={{ marginBottom: 5 }}
                  >
                    {decks[item].title}
                  </Text>
                  <Text size={15} redText center style={{ marginBottom: 0 }}>
                    {decks[item].questions.length} cards
                  </Text>
                </TouchableOpacity>
              </ListItem>
            )}
          />
        )}
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

function mapStateToProps({ deckReducer }) {
  return { decks: deckReducer.decks };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: deck => dispatch(addDeck(deck)),
    getDecks: () => dispatch(getDecks()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);
