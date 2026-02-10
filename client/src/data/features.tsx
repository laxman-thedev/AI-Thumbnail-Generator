import type { IFeature } from "../types";

/**
 * Feature card data rendered in the FeaturesSection.
 * Each entry includes an SVG icon path, title, and short description
 * displayed in animated cards on the landing page.
 */
export const featuresData: IFeature[] = [
    {
        icon: "/assets/zap-icon.svg",
        title: "Smart Analysis",
        description: "Our AI analyzes your content to generate the most engaging thumbnail designs.",
    },
    {
        icon: "/assets/thumb-icon.svg",
        title: "Eye-Catching Designs",
        description: "Choose from a variety of professionally designed templates that grab attention.",
    },
    {
        icon: "/assets/shape-icon.svg",
        title: "Fully Customizable",
        description: "Easily customize every element to match your brand and style.",
    },
];