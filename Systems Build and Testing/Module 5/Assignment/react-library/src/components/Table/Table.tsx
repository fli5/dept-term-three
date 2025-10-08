import React from "react";
import styled from "styled-components";
import { TableProps } from "./Table.types";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";
import TableFooter from "./TableFooter/TableFooter";

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Table: React.FC<TableProps> = ({ headers, rows, footer, className }) => {
    return (
        <StyledTable className={className}>
            <TableHeader headers={headers} />
            <tbody>
            {rows.map((row, index) => (
                <TableRow key={index} cells={row} />
            ))}
            </tbody>
            {footer && <TableFooter footer={footer} />}
        </StyledTable>
    );
};
export default Table;