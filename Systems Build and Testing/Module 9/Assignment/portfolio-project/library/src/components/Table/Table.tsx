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
import { TableProps } from './Table.types';
import TableHeader from '../TableHeader/TableHeader';
import TableRow from '../TableRow/TableRow';
import TableFooter from '../TableFooter/TableFooter';

const StyledTable = styled.table<{
  disabled?: boolean;
  $backgroundColor?: string;
}>`
  width: 100%;
  border-collapse: collapse;
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  background-color: ${({ $backgroundColor, disabled }) =>
    disabled ? '#f0f0f0' : $backgroundColor || '#e8dd1f'};
`;

export const Table: React.FC<TableProps> = ({
  caption,
  headers,
  rows,
  footer,
  backgroundColor,
  disabled = false,
  onRowClick,
}) => {
  return (
    <StyledTable
      disabled={disabled}
      $backgroundColor={backgroundColor}
      role="table"
    >
      {caption && <caption>{caption}</caption>}
      <TableHeader
        headers={headers}
        disabled={disabled}
        backgroundColor={backgroundColor}
      />
      <tbody>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            cells={row}
            disabled={disabled}
            backgroundColor={backgroundColor}
            onClick={
              !disabled && onRowClick ? () => onRowClick(rowIndex) : undefined
            }
          />
        ))}
      </tbody>
      {footer && (
        <TableFooter
          footer={footer}
          disabled={disabled}
          backgroundColor={backgroundColor}
        />
      )}
    </StyledTable>
  );
};

export default Table;
