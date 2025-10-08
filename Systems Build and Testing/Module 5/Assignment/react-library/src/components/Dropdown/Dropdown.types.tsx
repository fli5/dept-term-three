// Dropdown.types.tsx
export interface DropdownProps {
    /** Label displayed above the dropdown */
    label?: string;

    /** Options to display */
    options: { label: string; value: string }[];

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
