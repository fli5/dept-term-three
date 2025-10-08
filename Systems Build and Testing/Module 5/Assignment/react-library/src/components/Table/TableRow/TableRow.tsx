import React from "react";
import styled from "styled-components";
import { TableRowProps } from "./TableRow.types";
import TableCell  from "../TableCell/TableCell";

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

export const TableRow: React.FC<TableRowProps> = ({ cells }) => {
    return (
        <Tr>
            {cells.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
            ))}
        </Tr>
    );
};
export default TableRow;
