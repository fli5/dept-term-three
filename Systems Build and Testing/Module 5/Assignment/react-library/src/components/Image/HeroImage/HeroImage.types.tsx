// src/components/HeroImage/HeroImage.types.ts
export interface HeroImageProps {
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
