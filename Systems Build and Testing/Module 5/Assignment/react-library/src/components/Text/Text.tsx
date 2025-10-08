import React from 'react';
import styled from 'styled-components';
import {TextProps} from './Text.types';

const StyledText = styled.p<Pick<TextProps, 'size' | 'color' | 'bold' | 'disabled'>>`
    font-size: ${({size}) => size || '16px'};
    color: ${({color, disabled}) => (disabled ? '#aaa' : color || '#333')};
    font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'default')};
    transition: color 0.3s ease;
`;

export const Text: React.FC<TextProps> = ({content, size, color, bold, disabled, onClick}) => {
    return (
        <StyledText size={size} color={color} bold={bold} disabled={disabled} onClick={!disabled ? onClick : undefined}>
            {content}
        </StyledText>
    );
};
