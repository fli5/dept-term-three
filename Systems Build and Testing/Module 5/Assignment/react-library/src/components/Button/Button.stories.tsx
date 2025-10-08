import type {Meta, StoryObj} from '@storybook/react';
import {Button} from './Button';
import {ButtonProps} from './Button.types';
import {fn, userEvent, within} from "storybook/test";

/**
 * Storybook configuration for Button component
 * Requirements covered:
 *  - Has Controls for text and background color
 *  - Has default and disabled states
 *  - Allows visual change in disabled state
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.getByRole('button');
        await userEvent.click(button);
        console.log('Button clicked!');
    },
};

export default meta;
type Story = StoryObj<ButtonProps>;

//Default state (active)
export const Default: Story = {
    args: {
        text: 'Click Me',
        backgroundColor: '#007bff',
        disabled: false,
    },
};

//Disabled state
export const Disabled: Story = {
    args: {
        text: 'Disabled',
        backgroundColor: '#cccccc',
        disabled: true,
    },
};

//Example of custom color
export const Success: Story = {
    args: {
        text: 'Submit',
        backgroundColor: '#28a745',
        disabled: false,
    }
};
