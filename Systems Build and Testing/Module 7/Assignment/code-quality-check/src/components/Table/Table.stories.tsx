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
import { Table } from './Table';
import { TableProps } from './Table.types';

const meta: Meta<TableProps> = {
  title: 'Felix Library/Table',
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    caption: { control: 'text' },
    headers: { control: 'object' },
    rows: { control: 'object' },
    footer: { control: 'object' },
    backgroundColor: { control: 'color' },
    disabled: { control: 'boolean' },
    onRowClick: { action: 'row clicked' },
  },
  args: {
    caption: 'Sample Table',
    headers: ['Name', 'Age'],
    rows: [
      ['Alice', '25'],
      ['Bob', '30'],
    ],
    footer: ['Total', '2'],
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TableProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
