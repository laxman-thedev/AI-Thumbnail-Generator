import type { IPricing } from "../types";

/**
 * Pricing plan data displayed in the PricingSection.
 * Each plan includes a name, monthly price, feature list, and a
 * `mostPopular` flag that highlights the recommended plan with
 * distinct styling and a "Most Popular" badge.
 */
export const pricingData: IPricing[] = [
    // Basic tier - entry-level plan with limited thumbnails
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI Thumbnails per month",
            "Basic templates",
            "Standard Resolution",
            "No watermark",
            "Email support"
        ],
        mostPopular: false
    },
    // Pro tier - unlimited thumbnails with premium features (highlighted)
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited AI Thumbnails",
            "Premium templates",
            "4k Resolution",
            "A/B Testing Tools",
            "Priority Email & Chat Support",
            "Custom Fonts",
            "Brand Kit Analysis"
        ],
        mostPopular: true
    },
    // Enterprise tier - full Pro features plus team and API access
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "API Access",
            "Team Collaboration",
            "Custom Branding",
            "Dedicated Account Manager",
        ],
        mostPopular: false
    }
];