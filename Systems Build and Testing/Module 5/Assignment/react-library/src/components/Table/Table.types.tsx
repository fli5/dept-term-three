// Table.types.tsx
import { ReactNode } from "react";

export interface TableProps {
    /** Table headers as strings */
    headers: string[];

    /** Table rows as array of cells */
    rows: string[][];

    /** Optional footer row */
    footer?: string[];

    /** Optional className */
    className?: string;
}
