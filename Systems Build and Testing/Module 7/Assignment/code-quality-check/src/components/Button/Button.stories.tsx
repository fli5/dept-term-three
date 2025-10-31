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
import { Button } from './Button';
import { ButtonProps } from './Button.types';
import { userEvent, within } from 'storybook/test';

/**
 * Storybook configuration for Button component
 */

const meta: Meta<ButtonProps> = {
  title: 'Felix Library/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text to display inside the button',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button when true',
    },
    onClick: {
      action: 'clicked',
      description: 'Triggered when the button is clicked',
    },
  },
  play: async ({ canvasElement, args }) => {
    if (args.disabled) {
      return;
    }
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button');
    await userEvent.click(button);
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    text: 'Active',
    backgroundColor: '#007bff',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled',
    backgroundColor: '#cccccc',
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    text: 'Submit',
    backgroundColor: '#28a745',
    disabled: false,
  },
};
export const Cancel: Story = {
  args: {
    text: 'Cancel',
    backgroundColor: '#a7282c',
    disabled: false,
  },
};
