import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const pos = useRef({ x: -100, y: -100 });
    const trailPos = useRef({ x: -100, y: -100 });
    const animId = useRef(null);
    const visible = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (!visible.current) {
                visible.current = true;
                cursor.style.opacity = '1';
                dot.style.opacity = '1';
            }
        };

        const onLeave = () => {
            visible.current = false;
            cursor.style.opacity = '0';
            dot.style.opacity = '0';
        };

        const loop = () => {
            trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.1;
            trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.1;

            cursor.style.transform = `translate(${trailPos.current.x - 20}px, ${trailPos.current.y - 20}px)`;
            dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

            animId.current = requestAnimationFrame(loop);
        };

        const onLinkHover = () => {
            cursor.style.width = '52px';
            cursor.style.height = '52px';
            cursor.style.background = 'rgba(0, 212, 255, 0.15)';
            cursor.style.borderColor = 'rgba(0, 212, 255, 0.8)';
        };

        const onLinkLeave = () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'transparent';
            cursor.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        loop();

        const interactiveEls = document.querySelectorAll('a, button, .glass-card, .mobile-menu-btn');
        interactiveEls.forEach((el) => {
            el.addEventListener('mouseenter', onLinkHover);
            el.addEventListener('mouseleave', onLinkLeave);
        });

        return () => {
            cancelAnimationFrame(animId.current);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            interactiveEls.forEach((el) => {
                el.removeEventListener('mouseenter', onLinkHover);
                el.removeEventListener('mouseleave', onLinkLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Trailing ring */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(0, 212, 255, 0.5)',
                    background: 'transparent',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: 0,
                    transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease, opacity 0.3s ease',
                    willChange: 'transform',
                }}
            />
            {/* Sharp dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: 0,
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
                    transition: 'opacity 0.3s ease',
                    willChange: 'transform',
                }}
            />
        </>
    );
}
