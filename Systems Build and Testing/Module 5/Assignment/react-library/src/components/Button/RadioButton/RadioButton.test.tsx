import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RadioButton } from "./RadioButton";

describe("RadioButton Component", () => {
    test("renders label text", () => {
        render(<RadioButton label="Option" />);
        expect(screen.getByText("Option")).toBeInTheDocument();
    });

    test("applies disabled styles", () => {
        render(<RadioButton label="Option" disabled />);
        const label = screen.getByText("Option").parentElement;
        expect(label).toHaveStyle("opacity: 0.5");
        expect(label).toHaveStyle("cursor: not-allowed");
    });
});
