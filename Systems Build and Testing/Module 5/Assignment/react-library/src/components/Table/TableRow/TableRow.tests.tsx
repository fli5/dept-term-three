import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableRow } from "./TableRow";
import { TableHeader } from "../TableHeader";

describe("TableRow Component", () => {
    test("renders table cells", () => {
        const cells = ["Alice", "25"];
        render(
            <table>
                <TableHeader headers={["Name", "Age"]} />
                <tbody>
                <TableRow cells={cells} />
                </tbody>
            </table>
        );

        cells.forEach((cell) => {
            expect(screen.getByText(cell)).toBeInTheDocument();
        });
    });
});
