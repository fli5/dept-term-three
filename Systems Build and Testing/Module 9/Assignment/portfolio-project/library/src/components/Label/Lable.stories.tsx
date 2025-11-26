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
import { Label } from './Label';
import { LabelProps } from './Label.types';
import { within, userEvent } from 'storybook/test';

const meta: Meta<LabelProps> = {
  title: 'Felix Library/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'Text displayed by the label' },
    color: { control: 'color', description: 'Label text color' },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the label',
    },
    fontSize: { control: 'text', description: 'Font size of the label' },
    disabled: {
      control: 'boolean',
      description: 'Disables the label interaction',
    },
    onClick: { action: 'clicked' },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = await canvas.getByRole('label');
    await userEvent.click(label);
    console.warn('Label clicked!');
  },
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Default: Story = {
  args: {
    text: 'Default Label',
    disabled: false,
  },
};
export const Disabled: Story = {
  args: { disabled: true, text: 'Disabled Label' },
};
