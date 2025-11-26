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
import { render, screen } from '@testing-library/react';
import { TableFooter } from './TableFooter';

describe('TableFooter Component', () => {
  test('renders footer cells', () => {
    render(
      <table>
        <TableFooter footer={['Total', '2']} />
      </table>
    );
    expect(screen.getByText('Total')).toBeVisible();
    expect(screen.getByText('2')).toBeVisible();
  });

  test('applies background when disabled', () => {
    render(
      <table>
        <TableFooter footer={['Total']} disabled backgroundColor="#f25441" />
      </table>
    );
    const footer_element = screen.getByRole('table-footer');
    expect(footer_element).toHaveStyle('background-color: #f0f0f0');
    expect(footer_element).toHaveStyle('cursor:not-allowed');
  });
});
