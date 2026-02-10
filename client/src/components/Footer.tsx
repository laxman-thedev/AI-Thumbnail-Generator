import { footerData } from "../data/footer";
import { DribbbleIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { motion } from "motion/react";
import type { IFooterLink } from "../types";
import { Link } from "react-router-dom";

/**
 * Footer - Site-wide footer with navigation link sections and social icons.
 * Uses spring animations to slide in from left and right on scroll.
 */
export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden gap-10 md:gap-20 mt-40 py-6 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
            {/* Left section: logo and link columns, animated from the left */}
            <motion.div className="flex flex-wrap items-start gap-10 md:gap-35"
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                <Link to="/">
                    <img className="size-8 aspect-square" src="/favicon.svg" alt="footer logo" width={32} height={32} />
                </Link>
                {/* Render each footer section (title + links) from data */}
                {footerData.map((section, index) => (
                    <div key={index}>
                        <p className="text-slate-100 font-semibold">{section.title}</p>
                        <ul className="mt-2 space-y-2">
                            {section.links.map((link: IFooterLink, index: number) => (
                                <li key={index}>
                                    <Link to={link.href} className="hover:text-pink-600 transition">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </motion.div>
            {/* Right section: tagline, social icons, and copyright, animated from the right */}
            <motion.div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
                initial={{ x: 150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                <p className="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
                {/* Social media icon links */}
                <div className="flex items-center gap-4 mt-3">
                    <a href="https://dribbble.com/prebuiltui" target="_blank" rel="noreferrer">
                        <DribbbleIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="https://www.linkedin.com/company/prebuiltui" target="_blank" rel="noreferrer">
                        <LinkedinIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="https://x.com/prebuiltui" target="_blank" rel="noreferrer">
                        <TwitterIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="https://www.youtube.com/@prebuiltui" target="_blank" rel="noreferrer">
                        <YoutubeIcon className="size-6 hover:text-pink-500" />
                    </a>
                </div>
                {/* Dynamic copyright year */}
                <p className="mt-3 text-center">&copy; {new Date().getFullYear()} <a href="https://prebuiltui.com?utm_source=pixels">Thumblify</a></p>
            </motion.div>
        </footer>
    );
}