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
    _opacity: new Animated.Value(0),
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
    const { _rotate, _opacity } = this.state;

    Animated.parallel([
      Animated.timing(_rotate, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(_opacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(_opacity, {
        toValue: 2,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();

    this.setState({
      showAnswer: true,
    });
  }

  reflipCard() {
    const { _rotate } = this.state;

    Animated.timing(_rotate, {
      toValue: 2,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      _rotate.setValue(0);
    });

    this.setState({
      showAnswer: false,
    });
  }

  renderQuestion(index) {
    const quiz = this.props.questions[index];
    const { _opacity } = this.state;
    const opacity = _opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    return (
      <Animated.View style={{ opacity }}>
        <Text center size={35} redText>
          {quiz.question}
        </Text>
        <Button noBorder onPress={() => this.flipCard()}>
          <Text size={20} redText center style={{ marginBottom: 0 }}>
            Show answer
          </Text>
        </Button>
      </Animated.View>
    );
  }

  renderAnswer(index) {
    const quiz = this.props.questions[index];
    const { _opacity } = this.state;
    const opacity = _opacity.interpolate({
      inputRange: [1, 2],
      outputRange: [0, 1],
    });
    return (
      <Animated.View
        style={{
          opacity,
          transform: [{ rotateY: '180deg' }],
          width: '100%',
        }}
      >
        <Text center size={35} redText>
          {quiz.answer}
        </Text>
        <Button noBorder onPress={() => this.reflipCard()}>
          <Text size={20} redText center style={{ marginBottom: 0 }}>
            Show question
          </Text>
        </Button>
      </Animated.View>
    );
  }

  nextQuestion(index) {
    const { _rotate, quizLength } = this.state;

    if (index + 1 === quizLength) return;

    this.setState({
      questionIndex: index + 1,
      showAnswer: false,
    });

    _rotate.setValue(0);
  }

  render() {
    const { _rotate, showAnswer, questionIndex } = this.state;
    const { navigation } = this.props;

    const interpolateValue = _rotate.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0deg', '180deg', '0deg'],
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <RoundButton
            style={{
              borderColor: '#dedede',
              borderWidth: 1,
              marginBottom: 0,
              elevation: 1,
            }}
            onPress={() => this.nextQuestion(questionIndex)}
          >
            <AntDesign name="close" size={20} color={red} />
          </RoundButton>
          <RoundButton
            style={{
              borderColor: '#dedede',
              borderWidth: 1,
              marginBottom: 0,
              elevation: 1,
            }}
            onPress={() => this.nextQuestion(questionIndex)}
          >
            <AntDesign name="check" size={20} color={'#45ab7e'} />
          </RoundButton>
        </View>
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
