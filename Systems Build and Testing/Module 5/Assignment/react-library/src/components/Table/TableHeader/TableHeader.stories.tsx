import type { Meta, StoryObj } from "@storybook/react";
import { TableHeader } from "./TableHeader";
import { TableHeaderProps } from "./TableHeader.types";

const meta: Meta<TableHeaderProps> = {
    title: "UI Library/TableHeader",
    component: TableHeader,
};

export default meta;
type Story = StoryObj<TableHeaderProps>;

export const Default: Story = {
    args: {
        headers: ["Name", "Age", "City"],
    },
};
