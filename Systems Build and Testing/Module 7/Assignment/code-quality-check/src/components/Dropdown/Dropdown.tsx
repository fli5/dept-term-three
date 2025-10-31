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
import { DropdownProps } from './Dropdown.types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: Arial, sans-serif;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Select = styled.select<{ disabled?: boolean; $backgroundColor?: string }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) =>
    props.disabled ? '#f0f0f0' : props.$backgroundColor || '#fff'};
  color: ${(props) => (props.disabled ? '#999' : '#333')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => (!props.disabled ? '#007BFF' : '#ccc')};
  }
`;

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  backgroundColor = '#eee',
  placeholder = 'Select...',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Wrapper role="dropdown">
      {label && <Label>{label}</Label>}
      <Select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        $backgroundColor={backgroundColor}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default Dropdown;
