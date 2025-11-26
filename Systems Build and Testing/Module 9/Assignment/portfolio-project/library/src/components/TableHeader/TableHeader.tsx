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
import { TableHeaderProps } from './TableHeader.types';

const StyledThead = styled.thead<{
  disabled?: boolean;
  $backgroundColor?: string;
}>`
  background-color: ${({ $backgroundColor, disabled }) =>
    disabled ? '#f0f0f0' : $backgroundColor || '#149af6'};
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const StyledTh = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
`;

export const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  disabled,
  backgroundColor,
}) => {
  return (
    <StyledThead
      disabled={disabled}
      $backgroundColor={backgroundColor}
      role="table-header"
    >
      <tr>
        {headers.map((header, idx) => (
          <StyledTh key={idx}>{header}</StyledTh>
        ))}
      </tr>
    </StyledThead>
  );
};
export default TableHeader;
