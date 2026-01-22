import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const GalaxyBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Resize handler
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Star generation
        const colors = ['#FFF', '#8A2BE2', '#00FFFF', '#FF00FF'];
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

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {
                ctx.globalAlpha = star.alpha;
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();

                // Basic movement
                star.y -= star.speed;

                // Reset if off screen
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
            });

            requestAnimationFrame(animate);
        };

        const animFrame = requestAnimationFrame(animate);

        // Anime.js integration for "Pulse" effect on random stars
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
            update: () => {
                // This empty update ensures animejs values are applied to the objects
                // The canvas loop reads these updated values
            }
        });

        // Unique Scroll Interaction: Warp Speed Effect
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const speedMultiplier = 1 + (scrollY / 1000); // Speed up as you scroll down

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
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-dark"
        />
    );
};

export default GalaxyBackground;
