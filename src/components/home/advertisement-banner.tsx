'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Sample GIF URLs - you can add as many as you want here
const gifUrls: string[] = [
    'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', // Tech animation
    'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif', // Digital art
    'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif', // Abstract animation
    'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyU/giphy.gif', // Geometric pattern
    'https://media.giphy.com/media/26BRv0ThflVHCVoD6/giphy.gif'  // Colorful animation
];

export function AdvertisementBanner() {
    const [currentGifIndex, setCurrentGifIndex] = useState(0);

    // Auto-cycle through GIFs every 3 seconds
    useEffect(() => {
        if (gifUrls.length > 1) {
            const interval = setInterval(() => {
                setCurrentGifIndex((prevIndex) => 
                    (prevIndex + 1) % gifUrls.length
                );
            }, 3000); // 3 seconds

            return () => clearInterval(interval);
        }
    }, [gifUrls.length]);
    return (
        <motion.section 
            className="relative py-16 bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 1, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
            }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Animated Background Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.2), transparent 70%)',
                        filter: 'blur(60px)',
                        willChange: 'transform'
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                        x: [0, 100, -80, 0],
                        y: [0, -60, 80, 0],
                        scale: [1, 1.2, 0.9, 1],
                        rotate: [0, 90, 180, 360]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.6, 1],
                        delay: 0,
                        initial: { duration: 0.8, delay: 0.2 }
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25), rgba(168, 85, 247, 0.15), transparent 70%)',
                        filter: 'blur(80px)',
                        willChange: 'transform'
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                        x: [0, -80, 60, 0],
                        y: [0, 70, -40, 0],
                        scale: [1, 0.8, 1.2, 1],
                        rotate: [0, -45, -90, -180, -360]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.6, 1],
                        delay: 3,
                        initial: { duration: 0.8, delay: 0.4 }
                    }}
                />

                {/* Fixed Bubble Animations - No Random Values */}
                {Array.from({ length: 15 }).map((_, i) => {
                    // Fixed positions based on index to avoid hydration mismatch
                    const positions = [
                        { left: 10, top: 20 }, { left: 25, top: 15 }, { left: 40, top: 25 }, { left: 55, top: 18 },
                        { left: 70, top: 22 }, { left: 85, top: 12 }, { left: 15, top: 40 }, { left: 30, top: 45 },
                        { left: 45, top: 35 }, { left: 60, top: 50 }, { left: 75, top: 38 }, { left: 90, top: 42 },
                        { left: 20, top: 60 }, { left: 35, top: 65 }, { left: 50, top: 70 }
                    ];
                    const pos = positions[i];
                    
                    // Fixed sizes based on index
                    const sizes = [8, 12, 16, 20, 24, 28, 32];
                    const size = sizes[i % sizes.length];
                    
                    // Fixed colors based on index
                    const colors = [
                        'rgba(59, 130, 246, 0.3)',   // Blue
                        'rgba(139, 92, 246, 0.25)',  // Violet
                        'rgba(168, 85, 247, 0.2)',   // Purple
                        'rgba(34, 197, 94, 0.2)',    // Green
                        'rgba(6, 182, 212, 0.25)'    // Cyan
                    ];
                    const color = colors[i % colors.length];
                    
                    // Fixed animation durations based on index
                    const duration = 4 + (i % 6); // 4-10 seconds
                    const delay = (i % 3); // 0-3 seconds delay
                    
                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                background: color,
                                willChange: 'transform'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 0.3, scale: 1 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -30 - (i % 3) * 10, 0],
                                x: [0, (i % 4) * 10 - 20, 0],
                                opacity: [0.1, 0.6, 0.1],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                delay: delay,
                                ease: [0.4, 0, 0.6, 1],
                                initial: { duration: 0.6, delay: 0.6 + (i * 0.05) }
                            }}
                        />
                    );
                })}

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Main Banner Container */}
            <div className="relative z-10 container">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 0.6, 
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "tween"
                    }}
                    viewport={{ once: true }}
                >
                    {/* Advertisement Banner */}
                    <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 rounded-2xl blur-sm" />
                        
                        {/* Content Area - Ready for GIFs */}
                        <div className="relative p-8 min-h-[300px] flex items-center justify-center">
                            {gifUrls.length > 0 ? (
                                /* Display GIFs with smooth transitions */
                                <div className="relative w-full h-full max-w-4xl mx-auto">
                                    {gifUrls.map((gifUrl, index) => (
                                        <motion.img
                                            key={index}
                                            src={gifUrl}
                                            alt={`Advertisement ${index + 1}`}
                                            className="absolute inset-0 w-full h-full object-contain rounded-lg"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ 
                                                opacity: currentGifIndex === index ? 1 : 0,
                                                scale: currentGifIndex === index ? 1 : 0.95
                                            }}
                                            transition={{ 
                                                duration: 0.5, 
                                                ease: [0.25, 0.46, 0.45, 0.94] 
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                /* Simple placeholder text - hidden when GIFs are added */
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">
                                        Advertisement Banner
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-violet-400/50 rounded-bl-lg" />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
