import type { Meta, StoryObj } from "@storybook/react";
import { HeroImage } from "./HeroImage";
import { HeroImageProps } from "./HeroImage.types";
// @ts-ignore
import sampleLogo from "../../../assets/images/logo-sample.png";
import { fn } from "storybook/test";
import { within, userEvent } from "storybook/test";

const meta: Meta<HeroImageProps> = {
    title: "Felix Library/HeroImage",
    component: HeroImage,
    argTypes: {
        src: { control: "text" },
        alt: { control: "text" },
        title: { control: "text" },
        subtitle: { control: "text" },
        height: { control: "text" },
        disabled: { control: "boolean" },
        onClick: { action: "clicked" },
    },
    args: {
        src: sampleLogo,
        alt: "Hero Image",
        title: "Welcome",
        subtitle: "Subtitle text here",
        height: "400px",
        disabled: false,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const imgWrapper = await canvas.getByRole("hero-image");
        await userEvent.click(imgWrapper);
        console.log("HeroImage clicked!");
    },
};

export default meta;
type Story = StoryObj<HeroImageProps>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
