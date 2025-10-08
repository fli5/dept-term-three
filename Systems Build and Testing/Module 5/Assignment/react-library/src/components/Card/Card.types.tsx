// src/components/Card/Card.types.ts
export interface CardProps {
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
