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
export interface ImgProps {
  /** Image source URL */
  src: string;

  /** Alternative text for accessibility */
  alt: string;

  /** Width of the image (e.g., '100px', '50%') */
  width?: string;

  /** Height of the image (e.g., '100px', 'auto') */
  height?: string;

  /** Background color behind the image */
  backgroundColor?: string;

  /** Whether the image is disabled (greyed out) */
  disabled?: boolean;

  /** Event when image is clicked */
  onClick?: () => void;
}
