import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableHeader } from "./TableHeader";

describe("TableHeader Component", () => {
    test("renders header cells", () => {
        const headers = ["Name", "Age", "City"];
        render(<table><TableHeader headers={headers} /></table>);
        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });
});
