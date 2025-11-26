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
import { HeroImage } from './HeroImage';

describe('HeroImage Component', () => {
  test('renders image with alt text, title, subtitle', () => {
    render(
      <HeroImage
        src="hero.png"
        alt="Hero Image"
        title="Welcome"
        subtitle="Hello"
      />
    );
    expect(screen.getByAltText('Hero Image')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeVisible();
    expect(screen.getByText('Hello')).toBeVisible();
  });

  test('applies grayscale when disabled', () => {
    render(<HeroImage src="hero.png" alt="Disabled Hero" disabled />);
    const heroImage_element = screen.getByRole('hero-image');
    expect(heroImage_element).toHaveStyle('filter: grayscale(100%)');
    expect(heroImage_element).toHaveStyle('cursor: not-allowed');
  });
});
