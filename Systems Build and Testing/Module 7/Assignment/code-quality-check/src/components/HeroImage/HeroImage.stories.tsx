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
import type { Meta, StoryObj } from '@storybook/react';
import { HeroImage } from './HeroImage';
import { HeroImageProps } from './HeroImage.types';
import sampleLogo from '../../assets/images/logo-sample.png';
import { within, userEvent } from 'storybook/test';

const meta: Meta<HeroImageProps> = {
  title: 'Felix Library/HeroImage',
  component: HeroImage,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    height: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    src: sampleLogo,
    alt: 'Hero Image',
    title: 'Welcome',
    subtitle: 'Subtitle text here',
    height: '400px',
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const imgWrapper = await canvas.getByRole('hero-image');
    await userEvent.click(imgWrapper);
    console.warn('HeroImage clicked!');
  },
};

export default meta;
type Story = StoryObj<HeroImageProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
