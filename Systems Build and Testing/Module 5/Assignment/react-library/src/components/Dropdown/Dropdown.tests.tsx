// src/components/Dropdown/Dropdown.tests.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

const mockOptions = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
];

describe("Dropdown Component", () => {
    test("renders all options", () => {
        render(<Dropdown options={mockOptions} />);
        expect(screen.getByText("Option A")).toBeInTheDocument();
        expect(screen.getByText("Option B")).toBeInTheDocument();
    });

    test("changes background color when disabled", () => {
        render(<Dropdown options={mockOptions} disabled />);
        const select = screen.getByRole("combobox");
        expect(select).toHaveStyle("background-color: #f0f0f0");
    });

    test("applies custom background color", () => {
        render(<Dropdown options={mockOptions} backgroundColor="#ffcc00" />);
        const select = screen.getByRole("combobox");
        expect(select).toHaveStyle("background-color: #ffcc00");
    });
});
