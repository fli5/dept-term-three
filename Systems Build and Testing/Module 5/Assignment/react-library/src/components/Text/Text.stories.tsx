import type {Meta, StoryObj} from '@storybook/react';
import {Text} from './Text';
import type {TextProps} from './Text.types';
import {fn, userEvent, within} from "storybook/test";

const meta: Meta<TextProps> = {
    title: 'Felix Library/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        content: {control: 'text', description: 'The text to display'},
        size: {control: 'text', description: 'Font size (e.g. 14px, 1rem)'},
        color: {control: 'color', description: 'Text color'},
        bold: {control: 'boolean', description: 'If true, text is bold'},
        disabled: {control: 'boolean', description: 'If true, text is greyed out'},
        onClick: {action: 'clicked', description: 'Triggered when text is clicked'},
    },

    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        const text = await canvas.getByRole("paragraph");
        await userEvent.click(text);
        console.log('Clicked Text!');
    },
};

export default meta;
type Story = StoryObj<TextProps>;

export const Default: Story = {
    args: {
        content: 'Sample text content',
        size: '16px',
        color: '#333',
        bold: false,
        disabled: false,

    },
};
export const Bold: Story = {args: {bold: true, content: 'Bold text'}};
export const Disabled: Story = {args: {disabled: true, content: 'Disabled text'}};
