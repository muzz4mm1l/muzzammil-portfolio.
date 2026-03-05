import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #006a8a, #00d4ff, #67e8f9)',
                transformOrigin: '0%',
                scaleX,
                zIndex: 9998,
                boxShadow: '0 0 14px rgba(0, 212, 255, 0.8)',
            }}
        />
    );
}
