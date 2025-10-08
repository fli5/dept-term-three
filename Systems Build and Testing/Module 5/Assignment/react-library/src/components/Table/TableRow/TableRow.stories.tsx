import type { Meta, StoryObj } from "@storybook/react";
import { TableRow } from "./TableRow";
import { TableRowProps } from "./TableRow.types";
import TableHeader  from "../TableHeader/TableHeader";

const meta: Meta<TableRowProps> = {
    title: "UI Library/TableRow",
    component: TableRow,
};

export default meta;
type Story = StoryObj<TableRowProps>;

export const Default: Story = {
    render: (args) => (
        <table>
            <TableHeader headers={["Name", "Age"]} />
            <tbody>
            <TableRow {...args} />
            </tbody>
        </table>
    ),
    args: {
        cells: ["Alice", "25"],
    },
};
