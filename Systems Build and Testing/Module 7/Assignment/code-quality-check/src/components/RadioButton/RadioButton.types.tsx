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
export interface RadioButtonProps {
  /** The label displayed next to the radio button */
  label: string;

  /** Whether the radio button is selected */
  checked?: boolean;

  /** Whether the radio button is disabled */
  disabled?: boolean;

  /** Callback when the radio button is changed */
  onChange?: (checked: boolean) => void;
}
