import type { Meta, StoryObj } from "@storybook/react";
import { TableFooter } from "./TableFooter";
import { TableFooterProps } from "./TableFooter.types";
import { TableHeader } from "../TableHeader/TableHeader";

const meta: Meta<TableFooterProps> = {
    title: "UI Library/TableFooter",
    component: TableFooter,
};

export default meta;
type Story = StoryObj<TableFooterProps>;

export const Default: Story = {
    render: (args) => (
        <table>
            <TableHeader headers={["Name", "Age"]} />
            <tbody>
            <tr>
                <td>Alice</td>
                <td>25</td>
            </tr>
            <tr>
                <td>Bob</td>
                <td>30</td>
            </tr>
            </tbody>
            <TableFooter {...args} />
        </table>
    ),
    args: {
        footer: ["Total", "2"],
    },
};
