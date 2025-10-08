// src/components/Card/Card.tests.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";

describe("Card Component", () => {
    test("renders title and content", () => {
        render(<Card title="Card Title" content="Card content" />);
        expect(screen.getByText("Card Title")).toBeVisible();
        expect(screen.getByText("Card content")).toBeVisible();
    });

    test("applies grey background when disabled", () => {
        render(<Card title="Disabled" content="Content" disabled />);
        const card = screen.getByRole("button");
        expect(card).toHaveStyle("background-color: #f0f0f0");
    });

});
