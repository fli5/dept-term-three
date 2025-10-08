// src/components/Card/Card.tsx
import React from "react";
import styled from "styled-components";
import { CardProps } from "./Card.types";

const StyledCard = styled.div<Pick<CardProps, "backgroundColor" | "textColor" | "disabled">>`
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    background-color: ${({ backgroundColor, disabled }) => (disabled ? "#f0f0f0" : backgroundColor || "#fff")};
    color: ${({ textColor, disabled }) => (disabled ? "#aaa" : textColor || "#333")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    transition: all 0.3s ease;

    &:hover {
        transform: ${({ disabled }) => (!disabled ? "translateY(-2px)" : "none")};
        box-shadow: ${({ disabled }) => (!disabled ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.1)")};
    }
`;

const Title = styled.h3`
    margin: 0 0 8px 0;
`;

const Content = styled.p`
    margin: 0;
`;

export const Card: React.FC<CardProps> = ({ title, content, backgroundColor, textColor, disabled = false, onClick }) => {
    return (
        <StyledCard
            backgroundColor={backgroundColor}
            textColor={textColor}
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            role="button"
        >
            <Title>{title}</Title>
            <Content>{content}</Content>
        </StyledCard>
    );
};
