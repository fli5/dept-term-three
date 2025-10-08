// src/components/Img/Img.types.ts
export interface ImgProps {
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
