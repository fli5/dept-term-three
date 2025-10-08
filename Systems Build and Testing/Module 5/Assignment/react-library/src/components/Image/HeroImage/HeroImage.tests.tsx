import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroImage } from "./HeroImage";

describe("HeroImage Component", () => {
    test("renders image with alt text, title, subtitle", () => {
        render(<HeroImage src="hero.png" alt="Hero Image" title="Welcome" subtitle="Hello" />);
        expect(screen.getByAltText("Hero Image")).toBeInTheDocument();
        expect(screen.getByText("Welcome")).toBeVisible();
        expect(screen.getByText("Hello")).toBeVisible();
    });

    test("applies grayscale when disabled", () => {
        render(<HeroImage src="hero.png" alt="Disabled Hero" disabled />);
        const wrapper = screen.getByRole("hero-image");
        expect(wrapper).toHaveStyle("filter: grayscale(100%)");
    });
});
