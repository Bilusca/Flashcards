import React from 'react';
import { Card } from '../components/ui/Card';
import { Text } from '../components/ui/Text';
import { AntDesign } from '@expo/vector-icons';
import { red } from '../components/ui/_colors';
import { Button } from '../components/ui/Button';

export default function NoDecks({ onPress, style }) {
  return (
    <Card style={style}>
      <AntDesign name="meh" size={80} color={red} />
      <Text size={25} center>
        Oh no...
      </Text>
      <Text size={20} center>
        No decks found...
      </Text>
      <Text size={20} center style={{ marginBottom: 25 }}>
        Please, create one.
      </Text>
      <Button onPress={onPress}>
        <Text size={20} bold style={{ marginBottom: 0 }} center redText>
          Create new deck
        </Text>
      </Button>
    </Card>
  );
}
