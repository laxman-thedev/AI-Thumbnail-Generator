import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Spring physics configuration for smooth tilt animations
const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

/**
 * TiltedImage - Interactive 3D tilt effect wrapper for the hero image.
 * Tracks mouse position over the element and applies rotateX/rotateY
 * transforms via spring-animated motion values, creating a perspective tilt.
 *
 * Props:
 * - rotateAmplitude: maximum rotation angle in degrees (default: 3)
 */
export default function TiltedImage({ rotateAmplitude = 3, }) {
    const ref = useRef<HTMLDivElement>(null);
    // Motion values for cursor position and rotation transforms
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

    // Track the previous Y position to calculate velocity for caption rotation
    const [lastY, setLastY] = useState(0);

    /** Calculate rotation based on mouse offset from element center */
    function handleMouse(e: any) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        // Map mouse offset to rotation angles within the amplitude range
        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        // Apply velocity-based rotation to caption element
        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    /** Reset all rotations when the mouse leaves the element */
    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <motion.figure ref={ref} className="relative w-full h-full perspective-midrange mt-16 max-w-4xl mx-auto flex flex-col items-center justify-center" onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
            {/* 3D-transformed container applying the tilt rotation */}
            <motion.div className="relative transform-3d w-full max-w-4xl" style={{ rotateX, rotateY }} >
                <motion.img src="/hero_img.png"
                    className="border-b bg-linear-180 from-pink-500 to-transparent p-1 w-full rounded-[15px] will-change-transform transform-[translateZ(0)]"
                    alt="hero section showcase"
                />
            </motion.div>
        </motion.figure>
    );
}