// src/components/Label/Label.stories.tsx
import type {Meta, StoryObj} from "@storybook/react";
import {Label} from "./Label";
import {LabelProps} from "./Label.types";
import {fn} from "storybook/test";
import {within, userEvent} from "storybook/test";

const meta: Meta<LabelProps> = {
    title: "Felix Library/Label",
    component: Label,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        text: {control: "text", description: "Text displayed by the label"},
        color: {control: "color", description: "Label text color"},
        fontSize: {control: "text", description: "Font size of the label"},
        disabled: {control: "boolean", description: "Disables the label interaction"},
        onClick: {action: "clicked"},
    },

    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        const label = await canvas.getByRole("label");
        await userEvent.click(label);
        console.log("Label clicked!");
    },
};

export default meta;
type Story = StoryObj<LabelProps>;

export const Default: Story = {
    args: {
        text: "Default Label",
        color: "#333",
        fontSize: "16px",
        disabled: false,
    },
};
export const Disabled: Story = {
    args: {disabled: true, text: "Disabled Label"},
};
