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
import { Card } from './Card';

describe('Card Component', () => {
  test('renders title and content', () => {
    render(<Card title="Card Title" content="Card content" />);
    const card_element = screen.getByText('Card Title');
    expect(card_element).toBeInTheDocument();
    expect(card_element).toBeVisible();
  });

  test('applies background when disabled', () => {
    render(
      <Card
        title="Disabled"
        content="Content"
        backgroundColor="#fff"
        disabled
      />
    );
    const card_element = screen.getByRole('card');
    expect(card_element).toHaveStyle('background-color: #f0f0f0');
    expect(card_element).toHaveStyle('cursor:not-allowed');
  });
});
