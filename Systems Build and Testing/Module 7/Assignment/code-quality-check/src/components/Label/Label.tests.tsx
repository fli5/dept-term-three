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
import { Label } from './Label';

describe('Label Component', () => {
  test('renders the label text', () => {
    render(<Label text="Test Label" />);
    const label_element = screen.getByText('Test Label');
    expect(label_element).toBeInTheDocument();
    expect(label_element).toBeVisible();
  });

  test('changes color when disabled', () => {
    render(<Label text="Disabled Label" backgroundColor="#000" disabled />);
    const label_element = screen.getByText('Disabled Label');
    expect(label_element).toHaveStyle('background-color: #cccccc');
    expect(label_element).toHaveStyle('cursor:not-allowed');
  });
});
