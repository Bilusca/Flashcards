import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Card = Animated.createAnimatedComponent(styled.View`
    padding: 20px;
    border-radius: 5px;
    align-self: stretch;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`);