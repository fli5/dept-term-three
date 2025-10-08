import React from "react";
import styled from "styled-components";
import { TableCellProps } from "./TableCell.types";

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`;

export const TableCell: React.FC<TableCellProps> = ({ children }) => {
    return <Td>{children}</Td>;
};
export default TableCell;