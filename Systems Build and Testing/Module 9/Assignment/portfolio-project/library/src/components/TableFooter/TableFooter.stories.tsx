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
import { TableFooter } from './TableFooter';
import { TableFooterProps } from './TableFooter.types';

const meta: Meta<TableFooterProps> = {
  title: 'Felix Library/TableFooter',
  component: TableFooter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    footer: { control: 'object' },
    backgroundColor: { control: 'color' },
    disabled: { control: 'boolean' },
  },
  args: {
    footer: ['Total', '2'],
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TableFooterProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
