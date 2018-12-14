import styled, { css } from 'styled-components/native';
import { red, blue } from './_colors';
import { Animated } from 'react-native';

export const Text = Animated.createAnimatedComponent(styled.Text`
  font-size: ${props => (props.size ? props.size + 'px' : '18px')};
  ${({ redText }) =>
    redText &&
    css`
      color: ${red};
    `};
  ${({ blueText }) =>
    blueText &&
    css`
      color: ${blue};
    `};
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
  ${props =>
    props.bold &&
    css`
      font-weight: bold;
    `};
  margin-bottom: 10px;
`);
