import styled, { css } from 'styled-components/native';
import { red } from './_colors';

export const Text = styled.Text`
    font-size: ${props => props.size ? props.size + 'px' : '18px'};
    ${({redText}) => redText && css`
        color: ${red}
    `}
    ${props => props.center && css`
        text-align: center;
    `};
    ${props => props.bold && css`
        font-weight: bold;
    `};
    margin-bottom: 10px;
`;
