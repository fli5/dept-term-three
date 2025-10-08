import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "../TableHeader/TableHeader";

describe("TableFooter Component", () => {
    test("renders footer cells", () => {
        const footer = ["Total", "2"];
        render(
            <table>
                <TableHeader headers={["Name", "Age"]} />
                <tbody>
                <tr>
                    <td>Alice</td>
                    <td>25</td>
                </tr>
                </tbody>
                <TableFooter footer={footer} />
            </table>
        );

        footer.forEach((cell) => {
            expect(screen.getByText(cell)).toBeInTheDocument();
        });
    });
});
