import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button Component", () => {
    test("renders the button text", () => {
        render(<Button text="Test Button" />);
        expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    test("applies disabled styles", () => {
        render(<Button text="Disabled" disabled />);
        const element = screen.getByText("Disabled");
        expect(element).toHaveStyle("background-color: #cccccc");
        expect(element).toHaveStyle("cursor: not-allowed");
    });
});
