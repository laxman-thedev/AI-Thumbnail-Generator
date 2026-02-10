import { useEffect } from "react";
import Lenis from "lenis";

/**
 * LenisScroll - Initializes the Lenis smooth scroll library globally.
 * Configures smooth wheel scrolling with a 1.2s duration and an anchor
 * offset of -100px. Drives the Lenis animation loop via requestAnimationFrame
 * and cleans up on unmount.
 */
export default function LenisScroll() {
    useEffect(() => {
        // Create a new Lenis instance with smooth scrolling options
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            anchors: {
                offset: -100,
            },
        });

        // Animation loop: update Lenis on each frame
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Destroy the Lenis instance on component unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    // This component renders nothing to the DOM
    return null;
}