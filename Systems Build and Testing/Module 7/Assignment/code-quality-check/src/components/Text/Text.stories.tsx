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
import { Text } from './Text';
import { TextProps } from './Text.types';
import { fn } from 'storybook/test';
import { within, userEvent } from 'storybook/test';

const meta: Meta<TextProps> = {
  title: 'Felix Library/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The text inside the input' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    backgroundColor: { control: 'color', description: 'Background color' },
    disabled: { control: 'boolean', description: 'Disables the input' },
    onChange: { action: 'changed' },
  },
  args: {
    value: '',
    placeholder: 'Enter text...',
    backgroundColor: '#ffffff',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByPlaceholderText('Enter text...');
    await userEvent.type(input, 'Hello!');
    console.warn('User typed into TextBox!');
  },
};

export default meta;
type Story = StoryObj<TextProps>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true, backgroundColor: '#f0f0f0' },
};
