import React, { Component } from 'react';
import PageView from '../components/ui/PageView';
import { Card } from '../components/ui/Card';
import { Text } from '../components/ui/Text';
import { AntDesign } from '@expo/vector-icons';
import { RoundButton } from '../components/ui/RoundButton';
import { red } from '../components/ui/_colors';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { KeyboardAvoidingView } from 'react-native';

class NewQuestion extends Component {
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item')

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
            <Text size={25} center bold redText>New question of: {item}</Text>
            <Input style={{marginBottom: 15}} placeholder="Question" />
            <Input style={{marginBottom: 15}} placeholder="Answer" />
            <Button>
                <Text center bold redText size={20} style={{marginBottom: 0}}>Create a question</Text>
            </Button>
            </Card>
        </KeyboardAvoidingView>
      </PageView>
    );
  }
}

export default NewQuestion;
