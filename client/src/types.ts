/**
 * Shared TypeScript interfaces used across client-side components and pages.
 * These define the shape of props and data structures for type safety.
 */

/** Props for the reusable SectionTitle component (badge text, heading, subtext) */
export interface SectionTitleProps {
    text1: string;
    text2: string;
    text3: string;
}

/** Props for the TestimonialCard component */
export interface TestimonialCardProps {
    testimonial: ITestimonial;
    index: number; // Used for staggered animation delay
}

/** Shape of a single testimonial entry */
export interface ITestimonial {
    image: string;
    name: string;
    handle: string;
    date: string;
    quote: string;
}

/** Shape of a single feature entry displayed in FeaturesSection */
export interface IFeature {
    icon: string;
    title: string;
    description: string;
}

/** Shape of a footer section containing a title and list of links */
export interface IFooter {
    title: string;
    links: IFooterLink[];
}

/** Shape of a single footer link */
export interface IFooterLink {
    name: string;
    href: string;
}

/** Props for the Navbar component */
export interface NavbarProps {
    navlinks: INavLink[];
}

/** Shape of a single navigation link */
export interface INavLink {
    name: string;
    href: string;
}

/** Props for the PricingCard component */
export interface PricingCardProps {
    pricing: IPricing;
    index: number; // Used for staggered animation delay
}

/** Shape of a single pricing plan displayed in PricingSection */
export interface IPricing {
    name: string;
    price: number;
    period: string;
    features: string[];
    mostPopular: boolean;
}

/** Generic props for section components with title, description, and CTA */
export interface SectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
}