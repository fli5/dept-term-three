import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { TableProps } from "./Table.types";

const meta: Meta<TableProps> = {
    title: "UI Library/Table",
    component: Table,
};

export default meta;
type Story = StoryObj<TableProps>;

export const Default: Story = {
    args: {
        headers: ["Name", "Age", "City"],
        rows: [
            ["Alice", "25", "New York"],
            ["Bob", "30", "Los Angeles"],
            ["Charlie", "28", "Chicago"],
        ],
        footer: ["Total", "3", ""],
    },
};
