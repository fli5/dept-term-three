// Button.types.tsx
export interface ButtonProps {
    /** Button text */
    text: string;

    /** Background color */
    backgroundColor?: string;

    /** Optional click handler */
    onClick?: () => void;

    /** Disabled state */
    disabled?: boolean;
}
