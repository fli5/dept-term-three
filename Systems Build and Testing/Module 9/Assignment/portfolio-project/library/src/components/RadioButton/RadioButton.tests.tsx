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
import { RadioButton } from './RadioButton';

describe('RadioButton Component', () => {
  test('renders a RadioButton', () => {
    render(<RadioButton label="Option" />);
    const radio_button = screen.getByText('Option');
    expect(radio_button).toBeInTheDocument();
  });

  test('applies disabled styles', () => {
    render(<RadioButton label="Option" disabled />);
    const radio_button = screen.getByRole('radio_button');
    expect(radio_button).toHaveStyle('opacity: 0.5');
    expect(radio_button).toHaveStyle('cursor: not-allowed');
  });
});
