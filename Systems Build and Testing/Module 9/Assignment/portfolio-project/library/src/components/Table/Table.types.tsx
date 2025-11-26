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
export interface TableProps {
  /** Table headers as strings */
  headers: string[];

  /** Table rows as array of cells */
  rows: string[][];

  /** Optional footer row */
  footer?: string[];

  /** Table caption */
  caption?: string;

  /** Table background color */
  backgroundColor?: string;

  /** Whether the table is disabled */
  disabled?: boolean;

  /** Optional click event for table rows */
  onRowClick?: (rowIndex: number) => void;
}
