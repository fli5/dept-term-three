import React from 'react';

interface ButtonProps {
    /** Button text */
    text: string;
    /** Background color */
    backgroundColor?: string;
    /** Optional click handler */
    onClick?: () => void;
    /** Disabled state */
    disabled?: boolean;
}

interface CardProps {
    /** Card title */
    title: string;
    /** Card content/body text */
    content: string;
    /** Background color */
    backgroundColor?: string;
    /** Text color */
    textColor?: string;
    /** Whether the card is disabled */
    disabled?: boolean;
    /** Event when the card is clicked */
    onClick?: () => void;
}

interface DropdownProps {
    /** Label displayed above the dropdown */
    label?: string;
    /** Options to display */
    options: {
        label: string;
        value: string;
    }[];
    /** Selected value */
    value?: string;
    /** Callback when selection changes */
    onChange?: (value: string) => void;
    /** Disable the dropdown */
    disabled?: boolean;
    /** Optional placeholder text */
    placeholder?: string;
    backgroundColor?: string;
}

interface HeroImageProps {
    /** Image source URL or import */
    src: string;
    /** Alternative text for accessibility */
    alt: string;
    /** Hero image title */
    title?: string;
    /** Hero image subtitle */
    subtitle?: string;
    /** Height of the hero image */
    height?: string;
    /** Whether the hero image is disabled (greyed out) */
    disabled?: boolean;
    /** Event when hero image is clicked */
    onClick?: () => void;
}

interface ImgProps {
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

interface RadioButtonProps {
    /** The label displayed next to the radio button */
    label: string;
    /** Whether the radio button is selected */
    checked?: boolean;
    /** Whether the radio button is disabled */
    disabled?: boolean;
    /** Callback when the radio button is changed */
    onChange?: (checked: boolean) => void;
}

interface TableProps {
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

interface TableCellProps {
    /** Cell content */
    children: React.ReactNode;
    /** Whether the cell is disabled */
    disabled?: boolean;
    /** Optional background color */
    backgroundColor?: string;
}

interface TableFooterProps {
    footer: string[];
    disabled?: boolean;
    backgroundColor?: string;
}

interface TableRowProps {
    cells: string[];
    disabled?: boolean;
    backgroundColor?: string;
    onClick?: () => void;
}

interface TableHeaderProps {
    headers: string[];
    disabled?: boolean;
    backgroundColor?: string;
}

interface TextProps {
    /** The value inside the text box */
    value: string;
    /** Placeholder text */
    placeholder?: string;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Background color */
    backgroundColor?: string;
    /** Optional change event handler */
    onChange?: (value: string) => void;
}

interface LabelProps {
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

export type { ButtonProps, CardProps, DropdownProps, HeroImageProps, ImgProps, LabelProps, RadioButtonProps, TableCellProps, TableFooterProps, TableHeaderProps, TableProps, TableRowProps, TextProps };
