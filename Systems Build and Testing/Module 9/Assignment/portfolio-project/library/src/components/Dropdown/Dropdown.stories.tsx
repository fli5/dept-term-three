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
import Dropdown from './Dropdown';
import { DropdownProps } from './Dropdown.types';
import { userEvent, within } from 'storybook/test';

const meta: Meta<DropdownProps> = {
  title: 'Felix Library/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label Name' },
    value: { control: 'text', description: 'Option Value' },
    disabled: {
      control: 'boolean',
      description: 'Disables the button when true',
    },
    onChange: { action: 'changed' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdown = await canvas.getByRole('combobox');
    await userEvent.selectOptions(dropdown, '1');
    console.warn('Dropdown value changed!');
  },
};

export default meta;
type Story = StoryObj<DropdownProps>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  args: {
    label: 'Dropdown',
    options,
    value: '',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Dropdown (Disabled)',
    options,
    value: '',
    disabled: true,
  },
};

export const Selected: Story = {
  args: {
    label: 'Dropdown Selected',
    options,
    value: '2',
    disabled: false,
  },
};
