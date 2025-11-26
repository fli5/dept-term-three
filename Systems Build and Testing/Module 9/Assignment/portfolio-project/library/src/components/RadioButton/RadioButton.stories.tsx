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
import { RadioButton } from './RadioButton';
import { RadioButtonProps } from './RadioButton.types';
import { userEvent, within } from 'storybook/test';

const meta: Meta<RadioButtonProps> = {
  title: 'Felix Library/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text to display inside the radio button',
    },
    checked: { control: 'boolean' },
    disabled: {
      control: 'boolean',
      description: 'Disables the button when true',
    },
    onChange: { action: 'change' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('radio_button');
    await userEvent.click(button);
    console.warn('RadioButton clicked!');
  },
};

export default meta;
type Story = StoryObj<RadioButtonProps>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Option 2',
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Option 3',
    checked: false,
    disabled: true,
  },
};
