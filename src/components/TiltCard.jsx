import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function TiltCard({ children, className = '', style = {} }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 300, damping: 30 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
    const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
    const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

    const handleMouse = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                ...style,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 800,
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Dynamic shimmer */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    background: useTransform(
                        [glowX, glowY],
                        ([gx, gy]) =>
                            `radial-gradient(circle at ${gx}% ${gy}%, rgba(157, 78, 221, 0.12) 0%, transparent 65%)`
                    ),
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
        </motion.div>
    );
}
