// src/components/Label/Label.tests.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label Component", () => {
    test("renders the label text", () => {
        render(<Label text="Test Label" />);
        const labelElement = screen.getByText("Test Label");
        expect(labelElement).toBeInTheDocument();
    });

    test("changes color when disabled", () => {
        render(<Label text="Disabled Label" disabled />);
        const labelElement = screen.getByText("Disabled Label");
        expect(labelElement).toHaveStyle("color: #aaa");
    });
});
