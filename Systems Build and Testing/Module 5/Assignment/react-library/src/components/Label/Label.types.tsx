// src/components/Label/Label.types.ts
export interface LabelProps {
    /** The text content of the label */
    text: string;

    /** The color of the label text */
    color?: string;

    /** The font size of the label */
    fontSize?: string;

    /** Whether the label is disabled */
    disabled?: boolean;

    /** Event when the label is clicked */
    onClick?: () => void;
}
