// src/components/Card/Card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { CardProps } from "./Card.types";
import { fn } from "storybook/test";
import { within, userEvent } from "storybook/test";

const meta: Meta<CardProps> = {
    title: "Felix Library/Card",
    component: Card,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text", description: "Card title" },
        content: { control: "text", description: "Card content/body text" },
        backgroundColor: { control: "color", description: "Card background color" },
        textColor: { control: "color", description: "Card text color" },
        disabled: { control: "boolean", description: "Disables the card" },
        onClick: { action: "clicked" },
    },
    args: {
        title: "Card Title",
        content: "This is card content",
        backgroundColor: "#ffffff",
        textColor: "#333",
        disabled: false,
        onClick: fn(),
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const card = await canvas.getByRole("button");
        await userEvent.click(card);
        console.log("Card clicked!");
    },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const CustomColors: Story = { args: { backgroundColor: "#e0f7fa", textColor: "#00796b" } };
