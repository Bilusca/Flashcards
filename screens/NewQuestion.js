import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import PageView from '../components/ui/PageView';
import { Card } from '../components/ui/Card';
import { Text } from '../components/ui/Text';
import { AntDesign } from '@expo/vector-icons';
import { RoundButton } from '../components/ui/RoundButton';
import { red } from '../components/ui/_colors';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { KeyboardAvoidingView } from 'react-native';
import { submitQuestion } from '../config/api';
import { addCard } from '../actions/deckActions';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
  };

  submitQuestion() {
    const { question, answer } = this.state;
    const item = this.props.navigation.getParam('item');
    const { addCard, navigation } = this.props;

    if (!question) {
      return Alert.alert('Alert', 'Please, create a question.', [
        { text: 'Ok' },
      ]);
    }

    if (!answer) {
      return Alert.alert('Alert', 'Please, create a answer.', [{ text: 'Ok' }]);
    }

    addCard(item, { question, answer });

    submitQuestion(item, question, answer);

    this.setState({
      answer: '',
      question: '',
    });

    return navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

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
        <KeyboardAvoidingView behavior="padding" enabled>
          <Card>
            <Text size={25} center bold redText>
              New question of: {item}
            </Text>
            <Input
              style={{ marginBottom: 15 }}
              placeholder="Question"
              onChangeText={e => this.setState({ question: e })}
            />
            <Input
              style={{ marginBottom: 15 }}
              placeholder="Answer"
              onChangeText={e => this.setState({ answer: e })}
            />
            <Button onPress={() => this.submitQuestion()}>
              <Text center bold redText size={20} style={{ marginBottom: 0 }}>
                Create a question
              </Text>
            </Button>
          </Card>
        </KeyboardAvoidingView>
      </PageView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (deck, question) => dispatch(addCard(deck, question)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NewQuestion);
