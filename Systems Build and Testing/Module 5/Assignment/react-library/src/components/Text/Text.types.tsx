export interface TextProps {
    /** The content of the text */
    content: string;
    /** Font size (e.g. '16px', '1.2rem') */
    size?: string;
    /** Text color */
    color?: string;
    /** If true, text is displayed in bold */
    bold?: boolean;
    /** If true, text is disabled (greyed out) */
    disabled?: boolean;
    //
    onClick?: () => void;
}
