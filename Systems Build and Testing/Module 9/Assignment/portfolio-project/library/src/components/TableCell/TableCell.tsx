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
import { TableCellProps } from './TableCell.types';

const StyledTd = styled.td<{ disabled?: boolean; backgroundColor?: string }>`
  border: 1px solid #ccc;
  padding: 8px;
  background-color: ${({ backgroundColor, disabled }) =>
    disabled ? '#f0f0f0' : backgroundColor || '#bec710'};
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const TableCell: React.FC<TableCellProps> = ({
  children,
  disabled,
  backgroundColor,
}) => {
  return (
    <StyledTd
      disabled={disabled}
      backgroundColor={backgroundColor}
      role="table-cell"
    >
      {children}
    </StyledTd>
  );
};
export default TableCell;
