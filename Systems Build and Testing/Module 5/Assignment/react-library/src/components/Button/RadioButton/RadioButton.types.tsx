// RadioButton.types.tsx
export interface RadioButtonProps {
    /** The label displayed next to the radio button */
    label: string;

    /** Whether the radio button is selected */
    checked?: boolean;

    /** Whether the radio button is disabled */
    disabled?: boolean;

    /** The value of the radio button */
    value?: string;

    /** Callback when the radio button is changed */
    onChange?: (value: string) => void;
}
