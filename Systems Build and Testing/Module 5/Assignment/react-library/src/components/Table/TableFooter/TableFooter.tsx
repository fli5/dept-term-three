import React from "react";
import styled from "styled-components";
import { TableFooterProps } from "./TableFooter.types";
import TableCell from "../TableCell/TableCell";

const Tfoot = styled.tfoot``;

const Tr = styled.tr``;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  font-weight: bold;
  background-color: #f0f0f0;
`;

export const TableFooter: React.FC<TableFooterProps> = ({ footer }) => {
    if (!footer) return null;
    return (
        <Tfoot>
            <Tr>
                {footer.map((cell, index) => (
                    <Td key={index}>{cell}</Td>
                ))}
            </Tr>
        </Tfoot>
    );
};
export default TableFooter;