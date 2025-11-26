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
import { TableCell } from './TableCell';

describe('TableCell Component', () => {
  test('renders content', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Test Cell</TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(screen.getByText('Test Cell')).toBeVisible();
  });

  test('applies backgroundColor when disabled', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell disabled>Test Cell</TableCell>
          </tr>
        </tbody>
      </table>
    );
    const cell_element = screen.getByRole('table-cell');
    expect(cell_element).toHaveStyle('background-color: #f0f0f0');
    expect(cell_element).toHaveStyle('cursor:not-allowed');
  });
});
