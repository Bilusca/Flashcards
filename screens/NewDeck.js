import React, { Component } from 'react';
import { Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions/deckActions';
import { KeyboardAvoidingView } from 'react-native';
import PageView from '../components/ui/PageView';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { submitDeck } from '../config/api';

class NewDeck extends Component {
  state = {
    deck: '',
  };

  onSubmitDeck = () => {
    const { dispatch, navigation } = this.props;
    const { deck } = this.state;

    if (!deck) {
        return Alert.alert('Alert', 'Please, choose the name of the deck.', [
          { text: 'Ok'}
        ]);
    }

    const objectToSubmit = {
      [deck]: {
        title: deck,
        questions: [],
      },
    };

    dispatch(addDeck(objectToSubmit));
    submitDeck(objectToSubmit);
    Keyboard.dismiss();
    this.setState({ deck: '' });
    navigation.navigate('Decks', {
      render: true,
    });
  };

  render() {
    const { deck } = this.state;

    return (
      <PageView
        style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <Card>
            <Text size={35} style={{ marginBottom: 35 }} center redText bold>
              Create new deck
            </Text>
            <Input
              placeholder="Name of deck"
              style={{ marginBottom: 20 }}
              value={deck}
              onChangeText={e => this.setState({ deck: e })}
            />
            <Button onPress={() => this.onSubmitDeck()}>
              <Text center redText bold size={20} style={{ marginBottom: 0 }}>
                Create deck
              </Text>
            </Button>
          </Card>
        </KeyboardAvoidingView>
      </PageView>
    );
  }
}

export default connect()(NewDeck);
