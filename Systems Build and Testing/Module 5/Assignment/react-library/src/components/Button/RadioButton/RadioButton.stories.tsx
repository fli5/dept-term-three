import type {Meta, StoryObj} from "@storybook/react";
import {RadioButton} from "./RadioButton";
import {RadioButtonProps} from "./RadioButton.types";
import {fn, userEvent, within} from "storybook/test";

const meta: Meta<RadioButtonProps> = {
    title: "Felix Library/RadioButton",
    component: RadioButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {control: "text", description: "The text to display inside the radio button"},
        checked: {control: "boolean"},
        disabled: {control: "boolean", description: 'Disables the button when true'},
        onChange: {action: "changed"},
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.getByRole('radio');
        await userEvent.click(button);
        console.log('Button clicked!');
    },
};

export default meta;
type Story = StoryObj<RadioButtonProps>;

export const Default: Story = {
    args: {
        label: "Option 1",
        checked: true,
        disabled: false,
    },
};

export const Checked: Story = {
    args: {
        label: "Option 2",
        checked: true,
        disabled: false,
    },
};

export const Disabled: Story = {
    args: {
        label: "Option 3",
        checked: false,
        disabled: true,
    },
};
