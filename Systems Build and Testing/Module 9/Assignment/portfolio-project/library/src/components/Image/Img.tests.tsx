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
import { Img } from './Img';

describe('Img Component', () => {
  test('renders image with alt text', () => {
    render(<Img src="test.png" alt="Test Image" />);
    const image_element = screen.getByAltText('Test Image');
    expect(image_element).toBeInTheDocument();
    expect(image_element).toBeVisible();
  });

  test('applies background when disabled', () => {
    render(<Img src="test.png" alt="Disabled Image" disabled />);
    const image_element = screen.getByRole('image');
    expect(image_element).toHaveStyle('background-color:#f0f0f0');
    expect(image_element).toHaveStyle('cursor:not-allowed');
  });
});
