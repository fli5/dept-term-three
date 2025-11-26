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
import '@testing-library/jest-dom';
import { Text } from './Text';

describe('Text Component', () => {
  test('renders a Text', () => {
    render(<Text value="Hello" />);
    const text_element = screen.getByDisplayValue('Hello');
    expect(text_element).toBeInTheDocument();
    expect(text_element).toBeVisible();
  });

  test('applies disabled background color', () => {
    render(<Text value="Disabled" disabled backgroundColor="#ffffff" />);
    const text_element = screen.getByDisplayValue('Disabled');
    expect(text_element).toHaveStyle('background-color: #f0f0f0');
    expect(text_element).toHaveStyle('cursor: not-allowed');
  });
});
