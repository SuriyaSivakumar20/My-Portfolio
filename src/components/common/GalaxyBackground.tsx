import React, { useEffect, useRef } from 'react';
import Antigravity from './Antigravity';

const GalaxyBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Monochrome star colors — only white/gray tones
        const colors = ['#FFFFFF', '#CCCCCC', '#888888', '#AAAAAA', '#EEEEEE'];
        const stars: any[] = [];
        const numStars = 220;

        for (let i = 0; i < numStars; i++) {
            // Use square pixel dots instead of circles for retro feel
            stars.push({
                x: Math.floor(Math.random() * (width / 2)) * 2, // snap to even pixels
                y: Math.floor(Math.random() * (height / 2)) * 2,
                size: Math.random() < 0.7 ? 1 : 2,              // 1px or 2px squares
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.6 + 0.2,
                speed: Math.random() * 0.25 + 0.05,
                blinkRate: Math.random() * 0.02 + 0.005,
                blinkDir: 1,
            });
        }

        let animFrame: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                // Subtle alpha blink
                star.alpha += star.blinkDir * star.blinkRate;
                if (star.alpha > 0.9) { star.alpha = 0.9; star.blinkDir = -1; }
                if (star.alpha < 0.1) { star.alpha = 0.1; star.blinkDir = 1; }

                ctx.globalAlpha = star.alpha;
                ctx.fillStyle = star.color;
                // Square pixel dot
                ctx.fillRect(star.x, star.y, star.size, star.size);

                star.y -= star.speed;
                if (star.y < -2) {
                    star.y = height;
                    star.x = Math.floor(Math.random() * (width / 2)) * 2;
                }
            });

            ctx.globalAlpha = 1;
            animFrame = requestAnimationFrame(animate);
        };

        animFrame = requestAnimationFrame(animate);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const speedMultiplier = 1 + (scrollY / 1500);
            stars.forEach(star => {
                star.speed = (Math.random() * 0.25 + 0.05) * speedMultiplier;
            });
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
            {/* Monochrome Antigravity particle field */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Antigravity
                    count={200}
                    magnetRadius={12}
                    ringRadius={6}
                    waveSpeed={0.3}
                    waveAmplitude={0.8}
                    particleSize={1}
                    lerpSpeed={0.04}
                    color="#FFFFFF"
                    autoAnimate
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={2}
                    particleShape="capsule"
                    fieldStrength={8}
                />
            </div>

            {/* 2D Pixel Star Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 pointer-events-none"
            />
        </div>
    );
};

export default GalaxyBackground;
