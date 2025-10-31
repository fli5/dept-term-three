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
import { TableFooterProps } from './TableFooter.types';

const StyledTfoot = styled.tfoot<{
  disabled?: boolean;
  $backgroundColor?: string;
}>`
  background-color: ${({ $backgroundColor, disabled }) =>
    disabled ? '#f0f0f0' : $backgroundColor || '#f3d942'};
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const StyledTd = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`;

export const TableFooter: React.FC<TableFooterProps> = ({
  footer,
  disabled,
  backgroundColor,
}) => {
  return (
    <StyledTfoot
      disabled={disabled}
      $backgroundColor={backgroundColor}
      role="table-footer"
    >
      <tr>
        {footer.map((cell, idx) => (
          <StyledTd key={idx}>{cell}</StyledTd>
        ))}
      </tr>
    </StyledTfoot>
  );
};
export default TableFooter;
