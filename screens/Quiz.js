import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated, View } from 'react-native';
import PageView from '../components/ui/PageView';
import { RoundButton } from '../components/ui/RoundButton';
import { AntDesign } from '@expo/vector-icons';
import { red } from '../components/ui/_colors';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';

class Quiz extends Component {
  state = {
    _rotate: new Animated.Value(0),
    questionIndex: 0,
    showAnswer: false,
    quizLength: 0,
  };

  componentDidMount() {
    this.setState({
      quizLength: this.props.questions.length,
    });
  }

  flipCard() {
    const { _rotate } = this.state;

    Animated.timing(_rotate, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        showAnswer: true,
      });
    });
  }

  renderQuestion(index) {
    const quiz = this.props.questions[index];
    return (
      <View>
        <Text center size={35} redText>
          {quiz.question}
        </Text>
        <Button noBorder onPress={() => this.flipCard()}>
          <Text size={20} redText center style={{ marginBottom: 0 }}>
            Show answer
          </Text>
        </Button>
      </View>
    );
  }

  renderAnswer(index) {
    const quiz = this.props.questions[index];
    return (
      <View
        style={{
          transform: [{ rotateY: '180deg' }],
          width: '100%',
        }}
      >
        <Text center size={35} redText>
          {quiz.answer}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <RoundButton
            style={{
              borderColor: '#dedede',
              borderWidth: 1,
              marginBottom: 0,
              elevation: 2,
            }}
            onPress={() => this.nextQuestion(index)}
          >
            <AntDesign name="close" size={20} color={red} />
          </RoundButton>
          <RoundButton
            style={{
              borderColor: '#dedede',
              borderWidth: 1,
              marginBottom: 0,
              elevation: 2,
            }}
            onPress={() => this.nextQuestion(index)}
          >
            <AntDesign name="check" size={20} color={'#45ab7e'} />
          </RoundButton>
        </View>
      </View>
    );
  }

  nextQuestion(index) {
    this.setState(prevState => ({
      questionIndex: prevState++,
      showAnswer: false,
    }));
  }

  render() {
    const { _rotate, showAnswer, questionIndex } = this.state;
    const { navigation } = this.props;

    const interpolateValue = _rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

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
        <Card
          style={{
            transform: [
              {
                rotateY: interpolateValue,
              },
            ],
          }}
        >
          {showAnswer
            ? this.renderAnswer(questionIndex)
            : this.renderQuestion(questionIndex)}
        </Card>
      </PageView>
    );
  }
}

function mapStateToProps({ deckReducer }) {
  return {
    questions: deckReducer.deck.questions,
  };
}

export default connect(mapStateToProps)(Quiz);
