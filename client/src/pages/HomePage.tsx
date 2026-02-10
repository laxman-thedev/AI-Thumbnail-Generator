import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import TestimonialSection from "../sections/TestimonialSection";
import PricingSection from "../sections/PricingSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";

/**
 * HomePage - Landing page that composes all marketing sections.
 * Renders the hero, features, testimonials, pricing, contact, and CTA sections.
 */
export default function HomePage() {
    return (
        <>
            {/* Hero banner with headline and primary CTA */}
            <HeroSection />
            {/* Product feature highlights */}
            <FeaturesSection />
            {/* Scrolling testimonial cards */}
            <TestimonialSection />
            {/* Pricing plans comparison */}
            <PricingSection />
            {/* Contact form section */}
            <ContactSection />
            {/* Call-to-action banner */}
            <CTASection />
        </>
    );
}