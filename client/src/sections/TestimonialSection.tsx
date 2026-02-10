import SectionTitle from "../components/SectionTitle";
import TestimonialCard from "../components/TestimonialCard";
import { testimonialsData } from "../data/testimonial";
import type { ITestimonial } from "../types";
import Marquee from "react-fast-marquee";

/**
 * TestimonialSection - Displays user testimonials in two auto-scrolling
 * marquee rows (one left-to-right, one right-to-left) using react-fast-marquee.
 * Testimonials are duplicated to ensure seamless infinite scrolling.
 */
export default function TestimonialSection() {
    return (
        <div id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle text1="Testimonials" text2="Loved by creators" text3="See how our AI thumbnails are helping channels explode their views." />

            {/* First marquee row: scrolls left (default direction) */}
            <Marquee className="max-w-5xl mx-auto mt-11" gradient={true} speed={25} gradientColor="#000">
                <div className="flex items-center justify-center py-5 overflow-hidden">
                    {/* Duplicate testimonials array for seamless looping */}
                    {[...testimonialsData, ...testimonialsData].map((testimonial: ITestimonial, index: number) => (
                        <TestimonialCard key={index} index={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>
            {/* Second marquee row: scrolls right for visual variety */}
            <Marquee className="max-w-5xl mx-auto" gradient={true} speed={25} direction="right" gradientColor="#000">
                <div className="flex items-center justify-center py-5 overflow-hidden">
                    {[...testimonialsData, ...testimonialsData].map((testimonial: ITestimonial, index: number) => (
                        <TestimonialCard key={index} index={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>

        </div>
    );
}