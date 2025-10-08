import React from "react";
import styled from "styled-components";
import {RadioButtonProps} from "./RadioButton.types";

const Wrapper = styled.label<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const Input = styled.input`
    cursor: inherit;
`;

export const RadioButton: React.FC<RadioButtonProps> = ({
                                                            label,
                                                            checked = false,
                                                            disabled = false,
                                                            value,
                                                            onChange
                                                        }) => {
    const handleChange = () => {
        if (!disabled && onChange && value) {
            onChange(value);
        }
    };

    return (
        <Wrapper disabled={disabled}>
            <Input
                type="radio"
                checked={checked}
                disabled={disabled}
                value={value}
                onChange={handleChange}
            />
            {label}
        </Wrapper>
    );
};
