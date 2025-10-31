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
import { HeroImageProps } from './HeroImage.types';

const Wrapper = styled.div<{
  height?: string;
  disabled?: boolean;
  backgroundColor?: string;
}>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || '400px'};
  overflow: hidden;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  background-color: ${({ backgroundColor, disabled }) =>
    disabled ? '#f0f0f0' : backgroundColor || 'transparent'};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
`;

export const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  title,
  subtitle,
  height,
  disabled = false,
  onClick,
}) => {
  return (
    <Wrapper
      height={height}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      role="hero-image"
    >
      <Image src={src} alt={alt} />
      {(title || subtitle) && (
        <Overlay>
          {title && <Title>{title}</Title>}
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Overlay>
      )}
    </Wrapper>
  );
};

export default HeroImage;
