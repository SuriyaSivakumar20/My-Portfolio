import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
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

        const colors = ['#FFF', '#E50914', '#B20710', '#FFFFFF'];
        const stars: any[] = [];
        const numStars = 400;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random(),
                speed: Math.random() * 0.5 + 0.1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                ctx.globalAlpha = star.alpha;
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
            });
            requestAnimationFrame(animate);
        };

        const animFrame = requestAnimationFrame(animate);

        const animation = anime({
            targets: stars,
            radius: [
                { value: (s: any) => s.radius * 1.5, duration: 1000 },
                { value: (s: any) => s.radius, duration: 1000 }
            ],
            alpha: [
                { value: 0.2, duration: 1000 },
                { value: 1, duration: 1000 }
            ],
            delay: anime.stagger(100),
            loop: true,
            easing: 'easeInOutSine',
            update: () => { }
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const speedMultiplier = 1 + (scrollY / 1000);
            stars.forEach(star => {
                star.speed = (Math.random() * 0.5 + 0.1) * speedMultiplier;
            });
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animFrame);
            animation.pause();
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-dark overflow-hidden">
            {/* 3D Antigravity Layer */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Antigravity
                    count={300}
                    magnetRadius={14}
                    ringRadius={7}
                    waveSpeed={0.4}
                    waveAmplitude={1}
                    particleSize={1.5}
                    lerpSpeed={0.05}
                    color="#E50914" // Changed to Netflix Red
                    autoAnimate
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={3}
                    particleShape="capsule"
                    fieldStrength={10}
                />
            </div>

            {/* 2D Star Layer (Galaxy) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 pointer-events-none"
            />
        </div>
    );
};

export default GalaxyBackground;
