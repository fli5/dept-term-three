// src/components/Img/Img.tsx
import React from "react";
import styled from "styled-components";
import { ImgProps } from "./Img.types";

const StyledImgWrapper = styled.div<{ backgroundColor?: string; disabled?: boolean; width?: string; height?: string }>`
    display: inline-block;
    background-color: ${({ backgroundColor, disabled }) => (disabled ? "#f0f0f0" : backgroundColor || "transparent")};
    width: ${({ width }) => width || "auto"};
    height: ${({ height }) => height || "auto"};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
        transition: all 0.3s ease;
    }
`;

export const Img: React.FC<ImgProps> = ({ src, alt, width, height, backgroundColor, disabled = false, onClick }) => {
    return (
        <StyledImgWrapper
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            role="img"
        >
            <img src={src} alt={alt} />
        </StyledImgWrapper>
    );
};
