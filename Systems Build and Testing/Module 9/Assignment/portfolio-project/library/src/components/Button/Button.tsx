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
import { ButtonProps } from './Button.types';

const StyledButton = styled.button<{
  $backgroundColor?: string;
  disabled?: boolean;
}>`
  background-color: ${(props) =>
    props.disabled ? '#cccccc' : props.$backgroundColor || '#007bff'};
  color: white;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 15px;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? '#cccccc'
        : props.$backgroundColor
          ? darkenColor(props.$backgroundColor)
          : '#0056b3'};
  }
`;

// Helper to darken color on hover
function darkenColor(color: string) {
  return color + 'cc'; // add transparency as simple effect
}

export const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton
      $backgroundColor={backgroundColor}
      onClick={onClick}
      disabled={disabled}
      role="button"
    >
      {text}
    </StyledButton>
  );
};

export default Button;
