import React from "react";
import styled from "styled-components";
import { TableHeaderProps } from "./TableHeader.types";

const Th = styled.th`
    border: 1px solid #ccc;
    padding: 8px;
    background-color: #f0f0f0;
    text-align: left;
`;

export const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
    return (
        <thead>
        <tr>
            {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
            ))}
        </tr>
        </thead>
    );
};
export default TableHeader;