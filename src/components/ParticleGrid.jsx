import { useEffect, useRef } from 'react';

export default function ParticleGrid() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        let mouse = { x: -9999, y: -9999 };

        const COLS = 24;
        const ROWS = 14;
        let dots = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            buildDots();
        };

        const buildDots = () => {
            dots = [];
            const spacingX = canvas.width / (COLS + 1);
            const spacingY = canvas.height / (ROWS + 1);
            for (let r = 1; r <= ROWS; r++) {
                for (let c = 1; c <= COLS; c++) {
                    dots.push({
                        ox: spacingX * c,
                        oy: spacingY * r,
                        x: spacingX * c,
                        y: spacingY * r,
                        vx: 0,
                        vy: 0,
                    });
                }
            }
        };

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onTouchMove = (e) => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        };

        const onMouseLeave = () => {
            mouse = { x: -9999, y: -9999 };
        };

        const RADIUS = 140;
        const STRENGTH = 60;
        const SPRING = 0.08;
        const DAMPING = 0.75;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const dot of dots) {
                const dx = mouse.x - dot.ox;
                const dy = mouse.y - dot.oy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < RADIUS) {
                    const force = (1 - dist / RADIUS) * STRENGTH;
                    dot.vx -= (dx / dist) * force * 0.15;
                    dot.vy -= (dy / dist) * force * 0.15;
                }

                dot.vx += (dot.ox - dot.x) * SPRING;
                dot.vy += (dot.oy - dot.y) * SPRING;
                dot.vx *= DAMPING;
                dot.vy *= DAMPING;
                dot.x += dot.vx;
                dot.y += dot.vy;
            }

            // Draw lines between adjacent dots
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const i = r * COLS + c;
                    const dot = dots[i];

                    if (c < COLS - 1) {
                        const right = dots[i + 1];
                        const dx = mouse.x - (dot.x + right.x) / 2;
                        const dy = mouse.y - (dot.y + right.y) / 2;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const alpha = dist < RADIUS ? 0.08 + (1 - dist / RADIUS) * 0.18 : 0.05;
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(right.x, right.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }

                    if (r < ROWS - 1) {
                        const below = dots[i + COLS];
                        const dx = mouse.x - (dot.x + below.x) / 2;
                        const dy = mouse.y - (dot.y + below.y) / 2;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const alpha = dist < RADIUS ? 0.08 + (1 - dist / RADIUS) * 0.18 : 0.05;
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(below.x, below.y);
                        ctx.strokeStyle = `rgba(157, 78, 221, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }

                    // Draw dot
                    const ddx = mouse.x - dot.x;
                    const ddy = mouse.y - dot.y;
                    const ddist = Math.sqrt(ddx * ddx + ddy * ddy);
                    const dotAlpha = ddist < RADIUS ? 0.25 + (1 - ddist / RADIUS) * 0.55 : 0.15;
                    const dotSize = ddist < RADIUS ? 1.2 + (1 - ddist / RADIUS) * 2.2 : 1.2;

                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(103, 232, 249, ${dotAlpha})`;
                    ctx.fill();
                }
            }

            animId = requestAnimationFrame(draw);
        };

        resize();
        draw();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('mouseleave', onMouseLeave);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}
