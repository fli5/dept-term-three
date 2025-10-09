/*
 * ---------------------------------------------------------------------
 * Copyright (c) 2025. Felix Li. All rights reserved
 * Unauthorized copying, modification, or distribution of this file, via any
 * medium, is strictly prohibited without prior written permission from Felix Li.
 * For licensing inquiries, please contact: fli5@academic.rrc.ca
 * ---------------------------------------------------------------------
 */

/*
 * ---------------------------------------------------------------------
 * Program: Full Stack Web Development
 * Author: Feng Li
 * Course: WEBD-3012 (273795) Business Systems Build and Testing
 * Created: 2025-10-09
 * ---------------------------------------------------------------------
 */
import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {TableRow} from "./TableRow";
import {fn} from "storybook/test";

describe("TableRow Component", () => {
    test("renders cells", () => {
        render(<table><tbody><TableRow cells={["Alice", "25"]}/></tbody></table>);
        const row_element = screen.getByText("Alice");
        expect(row_element).toBeVisible();
        expect(row_element).toBeInTheDocument();
    });


    test("applies background when disabled", () => {
        render(<table><tbody><TableRow cells={["Alice"]} disabled/></tbody></table>);
        const row_element = screen.getByRole('table-row');
        expect(row_element).toHaveStyle("background-color: #f0f0f0");
        expect(row_element).toHaveStyle("cursor:not-allowed");
    });


});