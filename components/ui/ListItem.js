import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const ListItem = Animated.createAnimatedComponent(styled.View`
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    align-self: stretch;
    margin-bottom: 20px;
`);