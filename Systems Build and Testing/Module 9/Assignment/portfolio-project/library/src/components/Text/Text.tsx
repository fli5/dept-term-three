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
import { TextProps } from './Text.types';

const StyledInput = styled.input<{
  disabled?: boolean;
  $backgroundColor?: string;
}>`
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ $backgroundColor, disabled }) =>
    disabled ? '#f0f0f0' : $backgroundColor || '#ffffff'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  color: ${({ disabled }) => (disabled ? '#999' : '#000')};
  transition: background-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Text: React.FC<TextProps> = ({
  value,
  placeholder,
  disabled = false,
  backgroundColor,
  onChange,
}) => {
  return (
    <StyledInput
      type="text"
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      $backgroundColor={backgroundColor}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default Text;
