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
import { Table } from './Table';

describe('Table Component', () => {
  const headers = ['Name', 'Age'];
  const rows = [
    ['Alice', '25'],
    ['Bob', '30'],
  ];
  const footer = ['Total', '2'];

  test('renders headers, rows, footer and caption', () => {
    render(
      <Table
        headers={headers}
        rows={rows}
        footer={footer}
        caption="People Table"
      />
    );
    const table_element = screen.getByText('People Table');
    expect(table_element).toBeVisible();
    expect(table_element).toBeInTheDocument();
  });

  test('applies backgroundColor when disabled', () => {
    render(
      <Table headers={headers} rows={rows} backgroundColor="#e84c1e" disabled />
    );
    const table_element = screen.getByRole('table');
    expect(table_element).toHaveStyle('background-color: #f0f0f0');
    expect(table_element).toHaveStyle('cursor:not-allowed');
  });
});
