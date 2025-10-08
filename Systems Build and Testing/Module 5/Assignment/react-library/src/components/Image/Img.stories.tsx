// src/components/Img/Img.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Img } from "./Img";
import { ImgProps } from "./Img.types";
import { fn } from "storybook/test";
import { within, userEvent } from "storybook/test";

const meta: Meta<ImgProps> = {
    title: "Felix Library/Img",
    component: Img,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    argTypes: {
        src: { control: "text", description: "Image source URL" },
        alt: { control: "text", description: "Alt text for the image" },
        width: { control: "text", description: "Width of the image" },
        height: { control: "text", description: "Height of the image" },
        backgroundColor: { control: "color", description: "Background color behind the image" },
        disabled: { control: "boolean", description: "Disable the image (greyed out)" },
        onClick: { action: "clicked" },
    },
    args: {
        src: "data:image/png;base64,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",
        alt: "Placeholder Image",
        width: "150px",
        height: "150px",
        backgroundColor: "#ffffff",
        disabled: false,
    },

    // play: async ({ canvasElement }) => {
    //     const canvas = within(canvasElement);
    //     const img = await canvas.getByRole("img");
    //     await userEvent.click(img);
    //     console.log("Image clicked!");
    // },
};

export default meta;
type Story = StoryObj<ImgProps>;

export const Default: Story = {

};
export const Disabled: Story = { args: { disabled: true } };
