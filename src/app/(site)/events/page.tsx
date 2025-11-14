'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Star, ArrowRight, Sparkles, Zap, Shield, Target } from 'lucide-react';
import Link from 'next/link';

const events = [
    {
        id: 1,
        date: "Oct 29, 2024",
        title: "Workshop: Implementing Post-Quantum Cryptography",
        location: "Virtual",
        description: "A hands-on workshop for developers on integrating PQC algorithms into existing systems. Learn from industry experts and get hands-on experience with cutting-edge cryptographic techniques.",
        category: "Workshop",
        color: "from-blue-500 via-cyan-500 to-teal-500",
        accentColor: "#06b6d4",
        icon: Shield,
        duration: "4 hours",
        attendees: "50 max",
        difficulty: "Intermediate",
        highlights: ["Live coding sessions", "Certificate of completion", "Q&A with experts"]
    },
    {
        id: 2,
        date: "Nov 15, 2024",
        title: "CypherCon 2024",
        location: "New York, NY",
        description: "Join our CEO's keynote on the future of AI-driven security at the industry's premier event. Network with top security professionals and explore emerging technologies.",
        category: "Conference",
        color: "from-purple-500 via-pink-500 to-rose-500",
        accentColor: "#a855f7",
        icon: Sparkles,
        duration: "2 days",
        attendees: "500+",
        difficulty: "All levels",
        highlights: ["Keynote speeches", "Networking sessions", "Exclusive demos"]
    },
    {
        id: 3,
        date: "Dec 05, 2024",
        title: "Webinar: Securing Web3 Applications",
        location: "Virtual",
        description: "A deep dive into the unique security challenges and solutions for decentralized applications. Understand blockchain security fundamentals and best practices.",
        category: "Webinar",
        color: "from-emerald-500 via-teal-500 to-cyan-500",
        accentColor: "#10b981",
        icon: Zap,
        duration: "90 min",
        attendees: "Unlimited",
        difficulty: "Beginner",
        highlights: ["Interactive Q&A", "Recording available", "Resource materials"]
    },
    {
        id: 4,
        date: "Jan 20, 2025",
        title: "Masterclass: Advanced Threat Intelligence",
        location: "San Francisco, CA",
        description: "Deep technical dive into threat hunting, threat intelligence platforms, and advanced persistent threats. Perfect for senior security analysts and threat researchers.",
        category: "Masterclass",
        color: "from-orange-500 via-red-500 to-pink-500",
        accentColor: "#f97316",
        icon: Target,
        duration: "6 hours",
        attendees: "30 max",
        difficulty: "Advanced",
        highlights: ["Case studies", "Hands-on labs", "Expert mentorship"]
    }
];

interface EventCardProps {
    event: typeof events[0];
    index: number;
}

function EventCard({ event, index }: EventCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRelative = (e.clientX - rect.left) / width - 0.5;
        const mouseYRelative = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(mouseXRelative);
        mouseY.set(mouseYRelative);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    }, [mouseX, mouseY]);

    const IconComponent = event.icon;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative h-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d",
                perspective: "1000px"
            }}
        >
            {/* Animated Glow Effect */}
            <motion.div
                className={`absolute -inset-4 bg-gradient-to-r ${event.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                animate={isHovered ? {
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.6, 0.4]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Main Card Container */}
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-black/95 backdrop-blur-xl border border-slate-700/50 overflow-hidden transform-gpu">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, ${event.accentColor} 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }}
                    />
                </div>

                {/* Gradient Overlay */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Shimmer Effect */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                        background: `linear-gradient(110deg, transparent 30%, ${event.accentColor}20 50%, transparent 70%)`,
                        backgroundSize: '200% 100%',
                    }}
                    animate={isHovered ? {
                        backgroundPosition: ['0% 0%', '200% 0%']
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col" style={{ transform: "translateZ(20px)" }}>
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-6">
                        <motion.div
                            className={`p-4 rounded-2xl bg-gradient-to-br ${event.color} shadow-lg relative overflow-hidden`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white/20"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            <IconComponent className="w-8 h-8 text-white relative z-10" />
                        </motion.div>
                        
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: event.accentColor }}
                                        animate={{
                                            opacity: [0.4, 1, 0.4],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </div>
                            <motion.span
                                className={`px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r ${event.color} rounded-full shadow-lg`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {event.category}
                            </motion.span>
                        </div>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar className="w-4 h-4" style={{ color: event.accentColor }} />
                            <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <MapPin className="w-4 h-4" style={{ color: event.accentColor }} />
                            <span className="font-medium">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Clock className="w-4 h-4" style={{ color: event.accentColor }} />
                            <span>{event.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Users className="w-4 h-4" style={{ color: event.accentColor }} />
                            <span>{event.attendees}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <motion.h3
                        className="text-2xl font-bold text-white mb-4 leading-tight flex-grow"
                        style={{
                            textShadow: isHovered ? `0 0 20px ${event.accentColor}80` : 'none'
                        }}
                    >
                        {event.title}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-gray-300 text-base leading-relaxed mb-6">
                        {event.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6 space-y-2">
                        {event.highlights.map((highlight, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-2 text-sm text-gray-400"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + i * 0.1 }}
                            >
                                <div 
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: event.accentColor }}
                                />
                                <span>{highlight}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-slate-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4" style={{ color: event.accentColor }} />
                            <span className="text-sm text-gray-400">{event.difficulty}</span>
                        </div>
                        <motion.button
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm group/btn"
                            style={{ 
                                background: `linear-gradient(135deg, ${event.accentColor}, ${event.accentColor}dd)`,
                                boxShadow: isHovered ? `0 10px 30px ${event.accentColor}50` : 'none'
                            }}
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span>Register Now</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>

                {/* Corner Accents */}
                <div 
                    className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-xl opacity-30"
                    style={{ borderColor: event.accentColor }}
                />
                <div 
                    className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-xl opacity-30"
                    style={{ borderColor: event.accentColor }}
                />

                {/* Animated Border */}
                <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    style={{
                        border: `2px solid ${event.accentColor}40`,
                        background: `conic-gradient(from 0deg at 50% 50%, transparent, ${event.accentColor}20, transparent)`,
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                        padding: "2px",
                    }}
                    animate={isHovered ? {
                        rotate: 360
                    } : {}}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
}

export default function EventsPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-3xl"
                        style={{
                            width: `${400 + i * 200}px`,
                            height: `${400 + i * 200}px`,
                            background: `radial-gradient(circle, ${
                                ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.25)', 'rgba(168, 85, 247, 0.2)'][i]
                            }, transparent 70%)`,
                        }}
                        animate={{
                            x: [0, 100 + i * 50, -100 - i * 50, 0],
                            y: [0, -80 - i * 40, 80 + i * 40, 0],
                            scale: [1, 1.2 + i * 0.1, 0.8 - i * 0.1, 1],
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 2
                        }}
                    />
                ))}
            </div>

            {/* Cursor Follower Effect */}
            <motion.div
                className="fixed w-96 h-96 rounded-full blur-3xl pointer-events-none z-0"
                style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)",
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 blur-xl rounded-full" />
                            <div className="relative px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-blue-400/30 rounded-full">
                                <span className="text-blue-300 font-semibold text-sm tracking-wide uppercase">
                                    Exclusive Events & Workshops
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            All Events
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            & Workshops
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Discover our comprehensive lineup of cybersecurity events, workshops, and masterclasses. 
                        <span className="text-blue-400 font-semibold"> Learn from industry leaders</span>, 
                        <span className="text-purple-400 font-semibold"> network with peers</span>, and 
                        <span className="text-pink-400 font-semibold"> advance your security expertise</span>.
                    </motion.p>
                </motion.div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto mb-16">
                    {events.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                    className="max-w-4xl mx-auto mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative p-12 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-black/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 left-4 w-24 h-24 border border-blue-400/30 rounded-full" />
                            <div className="absolute bottom-4 right-4 w-20 h-20 border border-purple-400/30 rounded-full" />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-pink-400/20 rounded-full" />
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Stay Updated with Our Community
                            </h3>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Join our exclusive community for event recordings, early access to workshops, 
                                and exclusive updates from industry experts.
                            </p>
                            <Link href="/contact">
                                <motion.button
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl font-semibold text-white text-lg shadow-lg"
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    Get In Touch
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Animated Grid Pattern */}
            <div
                className="fixed inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px'
                }}
            />
        </div>
    );
}