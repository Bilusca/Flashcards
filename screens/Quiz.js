import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated } from 'react-native';
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
    showAnswer: false,
  };

  flipCard() {
    const { _rotate } = this.state;

    Animated.timing(_rotate, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    this.setState({
      showAnswer: true,
    });
  }

  render() {
    const { _rotate, showAnswer } = this.state;
    const { navigation, questions } = this.props;

    const interpolateValue = _rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
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
          {showAnswer ? (
            <Text size={20}>ROTATED</Text>
          ) : (
            <Button noBorder onPress={() => this.flipCard()}>
              <Text size={20} redText center style={{ marginBottom: 0 }}>
                ROTATE
              </Text>
            </Button>
          )}
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
