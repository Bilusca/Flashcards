import React, { Component } from 'react';
import PageView from '../components/ui/PageView';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RoundButton } from '../components/ui/RoundButton';
import { AntDesign } from '@expo/vector-icons';
import { red } from '../components/ui/_colors';

class Deck extends Component {
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
        <Card style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text size={50} center redText bold>
            {item}
          </Text>
          <Text size={30} center redText>
            {0} questions
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
                  item,
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

export default Deck;
