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
import { Card } from './Card';
import { CardProps } from './Card.types';
import { fn } from 'storybook/test';
import { within, userEvent } from 'storybook/test';

const meta: Meta<CardProps> = {
  title: 'Felix Library/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Card title' },
    content: { control: 'text', description: 'Card content/body text' },
    backgroundColor: { control: 'color', description: 'Card background color' },
    textColor: { control: 'color', description: 'Card text color' },
    disabled: { control: 'boolean', description: 'Disables the card' },
    onClick: { action: 'clicked' },
  },
  args: {
    title: 'Card Title',
    content: 'This is card content',
    backgroundColor: '#ffffff',
    textColor: '#333',
    disabled: false,
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = await canvas.getByRole('card');
    await userEvent.click(card);
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const CustomColors: Story = {
  args: { backgroundColor: '#e0f7fa', textColor: '#00796b' },
};
