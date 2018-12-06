import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageView from '../components/ui/PageView';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RoundButton } from '../components/ui/RoundButton';
import { AntDesign } from '@expo/vector-icons';
import { red } from '../components/ui/_colors';
import { getDeck } from '../actions/deckActions';

class Deck extends Component {
  componentDidMount() {
    const { navigation, getDeck } = this.props;
    const item = navigation.getParam('item');

    getDeck(item)
  }

  render() {
    const { navigation, deck } = this.props;
    return (
      <PageView style={{ padding: 20 }}>
        <RoundButton onPress={() => navigation.goBack()}>
          <AntDesign
            name="left"
            size={20}
            style={{ marginRight: 5 }}
            color={red}
          />
        </RoundButton>
        <Card style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text size={50} center redText bold>
            {deck.title}
          </Text>
          <Text size={30} center redText>
            {deck.questions && deck.questions.length} cards
          </Text>
          <View style={styles.container}>
            <Button style={{ marginBottom: 20 }}>
              <Text style={{ marginBottom: 0 }} center size={20} redText bold>
                Quiz
              </Text>
            </Button>
            <Button
              blueButton
              onPress={() =>
                navigation.navigate('NewQuestion', {
                  item: deck.title,
                })
              }
            >
              <Text style={{ marginBottom: 0 }} center size={20} blueText bold>
                New question
              </Text>
            </Button>
          </View>
        </Card>
      </PageView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
  },
});

function mapStateToProps({ deckReducer }) {
  return {
    deck: deckReducer.deck,
  };
}

function mapDispatchToProps(dispatch) {
  return { getDeck: deck => dispatch(getDeck(deck)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
