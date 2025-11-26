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
import { TableHeader } from './TableHeader';

describe('TableHeader Component', () => {
  test('renders headers', () => {
    render(
      <table>
        <TableHeader headers={['Name', 'Age']} />
      </table>
    );
    expect(screen.getByText('Name')).toBeVisible();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('applies grayscale when disabled', () => {
    render(
      <table>
        <TableHeader headers={['Name']} backgroundColor="#ffcc00" disabled />
      </table>
    );
    const header_element = screen.getByRole('table-header');

    expect(header_element).toHaveStyle('background-color: #f0f0f0');
    expect(header_element).toHaveStyle('cursor:not-allowed');
  });
});
