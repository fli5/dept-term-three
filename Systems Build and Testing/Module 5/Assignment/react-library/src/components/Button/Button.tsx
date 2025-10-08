import React from "react";
import styled from "styled-components";
import {ButtonProps} from "./Button.types";

const StyledButton = styled.button<{ backgroundColor?: string; disabled?: boolean }>`
    background-color: ${(props) => (props.disabled ? "#cccccc" : props.backgroundColor || "#007bff")};
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 16px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) =>
                props.disabled ? "#cccccc" : props.backgroundColor ? darkenColor(props.backgroundColor) : "#0056b3"};
    }
`;

// Helper to darken color on hover
function darkenColor(color: string) {
    // simple darken function for demonstration
    return color + "cc"; // add transparency as simple effect
}

export const Button: React.FC<ButtonProps> = ({text, backgroundColor, onClick, disabled}) => {
    return (
        <StyledButton backgroundColor={backgroundColor} onClick={onClick} disabled={disabled}>
            {text}
        </StyledButton>
    );
};
