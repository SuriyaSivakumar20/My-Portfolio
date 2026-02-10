import React, { useRef, useMemo } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import * as THREE from 'three';

// Define the extended JSX elements for Three.js
declare global {
    namespace JSX {
        interface IntrinsicElements {
            instancedMesh: any;
            capsuleGeometry: any;
            sphereGeometry: any;
            meshBasicMaterial: any;
        }
    }
}

interface AntigravityProps {
    count?: number;
    magnetRadius?: number;
    ringRadius?: number;
    waveSpeed?: number;
    waveAmplitude?: number;
    particleSize?: number;
    lerpSpeed?: number;
    color?: string;
    autoAnimate?: boolean;
    particleVariance?: number;
    rotationSpeed?: number;
    depthFactor?: number;
    pulseSpeed?: number;
    particleShape?: 'capsule' | 'sphere';
    fieldStrength?: number;
}

const Particles: React.FC<AntigravityProps> = ({
    count = 300,
    magnetRadius = 10,
    ringRadius = 10,
    waveSpeed = 0.4,
    waveAmplitude = 1,
    particleSize = 1.5,
    lerpSpeed = 0.05,
    color = '#5227FF',
    autoAnimate = true,
    particleVariance = 1,
    rotationSpeed = 0,
    depthFactor = 1,
    pulseSpeed = 3,
    particleShape = 'capsule',
    fieldStrength = 10,
}) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Use a stable reference for particles data to avoid re-creation on every render
    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * ringRadius * 2, // Initial scattering
            y: (Math.random() - 0.5) * ringRadius * 2,
            z: (Math.random() - 0.5) * depthFactor * 10,
            initialAngle: Math.random() * Math.PI * 2,
            speed: 0.002 + Math.random() * 0.004 * waveSpeed,
            offset: Math.random() * 100,
        }));
    }, [count, ringRadius, depthFactor, waveSpeed]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const cursor = state.pointer; // Normalized coordinates (-1 to 1)

        // Convert normalized cursor to world coordinates approximation
        // This is a simplification; for precise 3D mouse tracking, we'd use unproject
        const mouseX = cursor.x * 20;
        const mouseY = cursor.y * 20;

        particles.forEach((particle, i) => {
            // Basic ring/wave logic
            const angle = particle.initialAngle + time * waveSpeed * 0.5;

            // Target position on the ring
            let targetX = Math.cos(angle) * ringRadius;
            let targetY = Math.sin(angle) * ringRadius;
            let targetZ = Math.sin(angle * 3 + time) * waveAmplitude;

            // "Magnet" effect - particles drawn to/repelled by cursor
            const dx = mouseX - targetX;
            const dy = mouseY - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < magnetRadius) {
                // Simple repulsion/attraction logic based on fieldStrength
                // If fieldStrength is positive, maybe attract? Or repel?
                // Let's assume repel if close, or attract to ring
                const force = (magnetRadius - dist) / magnetRadius;
                targetX -= dx * force * (fieldStrength * 0.1);
                targetY -= dy * force * (fieldStrength * 0.1);
            }

            // Smooth interpolation
            particle.x += (targetX - particle.x) * lerpSpeed;
            particle.y += (targetY - particle.y) * lerpSpeed;
            particle.z += (targetZ - particle.z) * lerpSpeed;

            dummy.position.set(particle.x, particle.y, particle.z);

            // Auto rotation
            if (autoAnimate) {
                dummy.rotation.x += rotationSpeed * 0.01;
                dummy.rotation.y += rotationSpeed * 0.01;
            }

            // Pulse size
            const s = particleSize + Math.sin(time * pulseSpeed + particle.offset) * particleVariance;
            dummy.scale.set(s, s, s);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {particleShape === 'capsule' ? (
                <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
            ) : (
                <sphereGeometry args={[0.1, 8, 8]} />
            )}
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </instancedMesh>
    );
};

const Antigravity: React.FC<AntigravityProps> = (props) => {
    return (
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }} style={{ background: 'transparent' }}>
            <Particles {...props} />
        </Canvas>
    );
};

export default Antigravity;
