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
import { Dropdown } from './Dropdown';

const mockOptions = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
];

describe('Dropdown Component', () => {
  test('renders all options', () => {
    render(<Dropdown options={mockOptions} />);
    const dropdown_element = screen.getByRole('dropdown');
    expect(dropdown_element).toBeInTheDocument();
    expect(dropdown_element).toBeVisible();
    const option_element = screen.getByText('Option A');
    expect(option_element).toBeVisible();
  });

  test('changes background color when disabled', () => {
    render(<Dropdown options={mockOptions} backgroundColor="#fff" disabled />);
    const dropdown_element = screen.getByRole('combobox');
    expect(dropdown_element).toHaveStyle('background-color: #f0f0f0');
    expect(dropdown_element).toHaveStyle('cursor: not-allowed');
  });
});
