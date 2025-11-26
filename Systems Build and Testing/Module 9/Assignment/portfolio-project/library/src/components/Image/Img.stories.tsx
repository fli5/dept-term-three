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
import { Img } from './Img';
import { ImgProps } from './Img.types';
import sampleLogo from '../../assets/images/logo-sample.png';

const meta: Meta<ImgProps> = {
  title: 'Felix Library/Img',
  component: Img,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Image source URL' },
    alt: { control: 'text', description: 'Alt text for the image' },
    width: { control: 'text', description: 'Width of the image' },
    height: { control: 'text', description: 'Height of the image' },
    backgroundColor: {
      control: 'color',
      description: 'Background color behind the image',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the image (greyed out)',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    src: sampleLogo,
    alt: 'Placeholder Image',
    width: '150px',
    height: '150px',
    backgroundColor: '#ffffff',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ImgProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
