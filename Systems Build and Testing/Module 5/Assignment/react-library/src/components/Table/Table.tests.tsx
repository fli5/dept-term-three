import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Table } from "./Table";

describe("Table Component", () => {
    const headers = ["Name", "Age"];
    const rows = [
        ["Alice", "25"],
        ["Bob", "30"],
    ];
    const footer = ["Total", "2"];

    test("renders headers", () => {
        render(<Table headers={headers} rows={rows} />);
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Age")).toBeInTheDocument();
    });

    test("renders rows", () => {
        render(<Table headers={headers} rows={rows} />);
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    test("renders footer if provided", () => {
        render(<Table headers={headers} rows={rows} footer={footer} />);
        expect(screen.getByText("Total")).toBeInTheDocument();
    });
});
