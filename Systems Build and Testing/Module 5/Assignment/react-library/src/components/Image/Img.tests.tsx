// src/components/Img/Img.tests.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Img } from "./Img";

describe("Img Component", () => {
    test("renders image with alt text", () => {
        render(<Img src="test.png" alt="Test Image" />);
        expect(screen.getByAltText("Test Image")).toBeInTheDocument();
    });

    test("applies greyed out filter when disabled", () => {
        render(<Img src="test.png" alt="Disabled Image" disabled />);
        const img = screen.getByRole("img").querySelector("img");
        expect(img).toHaveStyle("filter: grayscale(100%)");
    });

});
