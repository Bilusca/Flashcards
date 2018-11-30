import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PageView from '../components/ui/PageView';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { submitDeck } from '../config/api';

export default class NewDeck extends Component {
  state = {
    deck: '',
  };

  onSubmitDeck = () => {
    const { deck } = this.state;
    const objectToSubmit = {
      [deck]: {
        title: deck,
        questions: [],
      },
    };

    submitDeck(objectToSubmit);
    alert(`Deck created.`);
    this.props.navigation.navigate('Decks');
    this.setState({ deck: '' });
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
