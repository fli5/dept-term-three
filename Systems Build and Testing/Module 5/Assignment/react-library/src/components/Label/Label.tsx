// src/components/Label/Label.tsx
import React from "react";
import styled from "styled-components";
import { LabelProps } from "./Label.types";

const StyledLabel = styled.label<Pick<LabelProps, "color" | "fontSize" | "disabled">>`
    display: inline-block;
    color: ${(props) => (props.disabled ? "#aaa" : props.color || "#000")};
    font-size: ${(props) => props.fontSize || "16px"};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: color 0.2s ease;

    &:hover {
        color: ${(props) => (!props.disabled ? "#007BFF" : "#aaa")};
    }
`;

export const Label: React.FC<LabelProps> = ({
                                                text,
                                                color,
                                                fontSize,
                                                disabled = false,
                                                onClick,
                                            }) => {
    return (
        <StyledLabel
            color={color}
            fontSize={fontSize}
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            role="label"
        >
            {text}
        </StyledLabel>
    );
};
