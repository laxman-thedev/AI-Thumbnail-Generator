import type { INavLink } from "../types";

/** Navigation links displayed in the Navbar. Each entry maps a label to a route or anchor. */
export const navlinks: INavLink[] = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
];