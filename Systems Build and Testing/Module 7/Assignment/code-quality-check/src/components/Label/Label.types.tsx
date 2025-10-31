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
export interface LabelProps {
  /** The text content of the label */
  text: string;
  color?: string;
  backgroundColor?: string;

  /** The font size of the label */
  fontSize?: string;

  /** Whether the label is disabled */
  disabled?: boolean;

  /** Event when the label is clicked */
  onClick?: () => void;
}
