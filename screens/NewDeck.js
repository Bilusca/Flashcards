import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PageView from '../components/ui/PageView';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default class NewDeck extends Component {
  render() {
    return (
      <PageView
        style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <Card>
            <Text size={35} style={{ marginBottom: 35 }} center redText bold>
              Create new deck
            </Text>
            <Input placeholder="Name of deck" style={{marginBottom: 20}} />
            <Button >
                <Text center redText bold size={20} style={{marginBottom: 0}}>Create deck</Text>
            </Button>
          </Card>
        </KeyboardAvoidingView>
      </PageView>
    );
  }
}
