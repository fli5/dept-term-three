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
import { TableCell } from './TableCell';
import { TableCellProps } from './TableCell.types';

const meta: Meta<TableCellProps> = {
  title: 'Felix Library/TableCell',
  component: TableCell,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    backgroundColor: { control: 'color' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Sample Cell',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TableCellProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
