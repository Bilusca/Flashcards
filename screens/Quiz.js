import React, { Component } from 'react';
import { Alert } from 'react-native';
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
    _translate: new Animated.ValueXY({ x: 0, y: 100 }),
    _opacity: new Animated.Value(0),
    questionIndex: 0,
    showAnswer: false,
    showResult: false,
    quizLength: 0,
    correct: 0,
    incorrect: 0,
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
      duration: 300,
      useNativeDriver: true,
    }).start();

    this.setState({
      showAnswer: true,
    });
  }

  reflipCard() {
    const { _rotate } = this.state;

    Animated.timing(_rotate, {
      toValue: 2,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      _rotate.setValue(0);
    });

    this.setState({
      showAnswer: false,
    });
  }

  submitQuestion(index, correctOrIncorrect) {
    const { _rotate, quizLength, _translate, _opacity } = this.state;

    if (correctOrIncorrect) {
      this.setState(state => ({ correct: state.correct + 1 }));
    } else {
      this.setState(state => ({ incorrect: state.incorrect + 1 }));
    }

    if (index + 1 === quizLength) {
      this.setState({
        showResult: true,
      });

      Animated.parallel([
        Animated.spring(_translate.y, {
          toValue: 0,
          speed: 2,
          bounciness: 0,
          useNativeDriver: true,
        }),
        Animated.timing(_opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      this.setState({
        questionIndex: index + 1,
        showAnswer: false,
      });
    }

    _rotate.setValue(0);
  }

  goBack() {
    const { correct, incorrect } = this.state;
    const { navigation } = this.props;

    if (correct + incorrect > 0) {
      return Alert.alert('Caution', 'Do you want restart the quiz?', [
        { text: 'Yes', onPress: () => navigation.goBack() },
        { text: 'No' },
      ]);
    } else {
      return navigation.goBack();
    }
  }

  renderResult() {
    const { correct, incorrect, quizLength } = this.state;

    return (
      <View style={{ width: '100%' }}>
        <Text center bold size={30} redText>
          You got {correct} of {quizLength}!
        </Text>
        {correct > incorrect ? (
          <Text size={80} center>
            🕺
          </Text>
        ) : (
          <Text size={80} center>
            😭
          </Text>
        )}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <Button
            style={{ marginBottom: 20 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ marginBottom: 0 }} center size={20} redText bold>
              Try Again
            </Text>
          </Button>
          <Button
            blueButton
            onPress={() => this.props.navigation.navigate('Decks')}
          >
            <Text style={{ marginBottom: 0 }} center size={20} blueText bold>
              Go to Decks
            </Text>
          </Button>
        </View>
      </View>
    );
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
        <Button noBorder onPress={() => this.reflipCard()}>
          <Text size={20} redText center style={{ marginBottom: 0 }}>
            Show question
          </Text>
        </Button>
      </View>
    );
  }

  render() {
    const {
      _rotate,
      showAnswer,
      questionIndex,
      showResult,
      _translate,
      _opacity,
      quizLength,
    } = this.state;

    const interpolateValue = _rotate.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0deg', '180deg', '0deg'],
    });

    return (
      <PageView
        style={[
          { padding: 20 },
          showResult && { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        {showResult ? (
          <Card
            style={{
              transform: [..._translate.getTranslateTransform()],
              opacity: _opacity,
            }}
          >
            {this.renderResult()}
          </Card>
        ) : (
          <React.Fragment>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <RoundButton onPress={() => this.goBack()}>
                <AntDesign
                  name="left"
                  size={20}
                  style={{ marginRight: 5 }}
                  color={red}
                />
              </RoundButton>
              <Text size={20} bold style={{ color: '#fff' }}>
                {questionIndex + 1} / {quizLength}
              </Text>
            </View>
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
          </React.Fragment>
        )}
        {!showResult && (
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
              onPress={() => this.submitQuestion(questionIndex, false)}
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
              onPress={() => this.submitQuestion(questionIndex, true)}
            >
              <AntDesign name="check" size={20} color={'#45ab7e'} />
            </RoundButton>
          </View>
        )}
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
