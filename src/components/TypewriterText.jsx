import { useEffect, useRef, useState } from 'react';

const WORDS = [
    'AI Engineer',
    'Web Developer',
    'Mobile Dev',
    'UI/UX Builder',
    'Problem Solver',
];

export default function TypewriterText() {
    const [displayed, setDisplayed] = useState('');
    const [wordIdx, setWordIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeout = useRef(null);

    useEffect(() => {
        const current = WORDS[wordIdx];
        const speed = isDeleting ? 55 : 100;

        timeout.current = setTimeout(() => {
            if (!isDeleting) {
                setDisplayed(current.slice(0, displayed.length + 1));
                if (displayed.length + 1 === current.length) {
                    setTimeout(() => setIsDeleting(true), 1600);
                }
            } else {
                setDisplayed(current.slice(0, displayed.length - 1));
                if (displayed.length === 0) {
                    setIsDeleting(false);
                    setWordIdx((i) => (i + 1) % WORDS.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout.current);
    }, [displayed, isDeleting, wordIdx]);

    return (
        <span
            style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'inherit',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #67e8f9, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}
        >
            {displayed}
            <span
                style={{
                    WebkitTextFillColor: '#00d4ff',
                    animation: 'blink 0.9s step-end infinite',
                    marginLeft: '2px',
                }}
            >
                |
            </span>
        </span>
    );
}
