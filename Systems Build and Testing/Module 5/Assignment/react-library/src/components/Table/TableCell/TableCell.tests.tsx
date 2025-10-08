import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TableCell } from "./TableCell";

describe("TableCell Component", () => {
    test("renders children content", () => {
        render(<table><tbody><tr><TableCell>Test Cell</TableCell></tr></tbody></table>);
        expect(screen.getByText("Test Cell")).toBeInTheDocument();
    });
});
