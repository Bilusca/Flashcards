import styled, { css } from 'styled-components/native';
import { red, blue } from './_colors';

export const Button = styled.TouchableOpacity`
  border: 2px solid ${red};
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  ${({ blueButton }) =>
    blueButton &&
    css`
      border-color: ${blue};
    `}
`;
