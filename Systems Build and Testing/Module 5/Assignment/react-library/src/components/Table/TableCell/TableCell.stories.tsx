import type { Meta, StoryObj } from "@storybook/react";
import TableCell  from "./TableCell";
import { TableCellProps } from "./TableCell.types";

const meta: Meta<TableCellProps> = {
    title: "UI Library/TableCell",
    component: TableCell,
};

export default meta;
type Story = StoryObj<TableCellProps>;

export const Default: Story = {
    args: {
        children: "Cell Content",
    },
};
