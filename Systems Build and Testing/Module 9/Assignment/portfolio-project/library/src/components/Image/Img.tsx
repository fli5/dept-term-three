/*
 * ---------------------------------------------------------------------
 * Copyright (c) 2025. Felix Li. All rights reserved
 * Unauthorized copying, modification, or distribution of this file, via any
 * medium, is strictly prohibited without prior written permission from Felix Li.
 * For licensing inquiries, please contact: fli5@academic.rrc.ca
 * ---------------------------------------------------------------------
 */

/*
 * ---------------------------------------------------------------------
 * Program: Full Stack Web Development
 * Author: Feng Li
 * Course: WEBD-3012 (273795) Business Systems Build and Testing
 * Created: 2025-10-09
 * ---------------------------------------------------------------------
 */
import React from 'react';
import styled from 'styled-components';
import { ImgProps } from './Img.types';

const StyledImgWrapper = styled.div<{
  $backgroundColor?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
}>`
  display: inline-block;
  background-color: ${(props) =>
    props.disabled ? '#f0f0f0' : props.$backgroundColor || '#fff'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
    transition: all 0.3s ease;
  }
`;

export const Img: React.FC<ImgProps> = ({
  src,
  alt,
  width,
  height,
  backgroundColor,
  disabled = false,
  onClick,
}) => {
  return (
    <StyledImgWrapper
      width={width}
      height={height}
      $backgroundColor={backgroundColor}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      role="image"
    >
      <img src={src} alt={alt} />
    </StyledImgWrapper>
  );
};

export default Img;
