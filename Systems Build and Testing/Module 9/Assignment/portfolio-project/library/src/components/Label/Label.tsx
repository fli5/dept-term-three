/*
 * ---------------------------------------------------------------------
 * Copyright (c) 2025. Felix Li. All rights reserved
 * Unauthorized copying, modification, or distribution of this file, via any
 * medium, is strictly prohibited without prior written permission from Felix Li.
 * For licensing inquiries, please contact: fli5@academic.rrc.ca
 * ---------------------------------------------------------------------
 */

/*
 * ---------------------------------------------------------------------
 * Program: Full Stack Web Development
 * Author: Feng Li
 * Course: WEBD-3012 (273795) Business Systems Build and Testing
 * Created: 2025-10-09
 * ---------------------------------------------------------------------
 */
import React from 'react';
import styled from 'styled-components';
import { LabelProps } from './Label.types';

const StyledLabel = styled.label<{
  color?: string;
  $backgroundColor?: string;
  fontSize?: string;
  disabled?: boolean;
}>`
  display: inline-block;
  color: ${(props) => (props.disabled ? '#aaa' : props.color || '#fff')};
  background-color: ${(props) =>
    props.disabled ? '#cccccc' : props.$backgroundColor || '#000'};
  font-size: ${(props) => props.fontSize || '16px'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => (!props.disabled ? '#007BFF' : '#aaa')};
  }
`;

export const Label: React.FC<LabelProps> = ({
  text,
  color,
  backgroundColor,
  fontSize,
  disabled = false,
  onClick,
}) => {
  return (
    <StyledLabel
      $backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      role="label"
    >
      {text}
    </StyledLabel>
  );
};

export default Label;
