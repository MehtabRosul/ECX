'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Sparkles, Zap, Shield, Star, Clock, Users } from 'lucide-react';

const events = [
    {
        date: "Oct 29, 2024",
        title: "Workshop: Implementing Post-Quantum Cryptography",
        location: "Virtual",
        description: "A hands-on workshop for developers on integrating PQC algorithms into existing systems.",
        category: "Workshop",
        color: "from-blue-400 via-violet-400 to-purple-500",
        accentColor: "blue",
        icon: Shield,
        duration: "4 hours",
        attendees: "50 max",
        difficulty: "Intermediate"
    },
    {
        date: "Nov 15, 2024",
        title: "CypherCon 2024",
        location: "New York, NY",
        description: "Join our CEO's keynote on the future of AI-driven security at the industry's premier event.",
        category: "Conference",
        color: "from-violet-400 via-purple-400 to-blue-500",
        accentColor: "violet",
        icon: Sparkles,
        duration: "2 days",
        attendees: "500+",
        difficulty: "All levels"
    },
    {
        date: "Dec 05, 2024",
        title: "Webinar: Securing Web3 Applications",
        location: "Virtual",
        description: "A deep dive into the unique security challenges and solutions for decentralized applications.",
        category: "Webinar",
        color: "from-purple-400 via-blue-400 to-violet-500",
        accentColor: "purple",
        icon: Zap,
        duration: "90 min",
        attendees: "Unlimited",
        difficulty: "Beginner"
    }
];

export function UpcomingEvents() {
    return (
        <motion.section 
            className="relative py-32 bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
            }}
            viewport={{ once: true, margin: "-30px" }}
        >
            {/* Optimized Background */}
            <div className="absolute inset-0">
                {/* Simplified Floating Orbs - Only 2 instead of 3 */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.3), transparent 70%)',
                        filter: 'blur(80px)',
                        willChange: 'transform'
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.4, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                        x: [0, 150, -100, 0],
                        y: [0, -80, 120, 0],
                        scale: [1, 1.3, 0.8, 1],
                        rotate: [0, 180, 360],
                        background: [
                            'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(139, 92, 246, 0.6), rgba(168, 85, 247, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.3), transparent 70%)'
                        ]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3
                    }}
                />
                <motion.div
                    className="absolute top-3/4 right-1/4 w-[450px] h-[450px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5), rgba(168, 85, 247, 0.3), transparent 70%)',
                        filter: 'blur(100px)',
                        willChange: 'transform'
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.3, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                        x: [0, -120, 80, 0],
                        y: [0, 100, -60, 0],
                        scale: [1, 0.7, 1.4, 1],
                        rotate: [0, -90, -180, -360],
                        background: [
                            'radial-gradient(circle, rgba(139, 92, 246, 0.5), rgba(168, 85, 247, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(139, 92, 246, 0.5), rgba(168, 85, 247, 0.3), transparent 70%)'
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.3), transparent 70%)',
                        filter: 'blur(120px)',
                        willChange: 'transform'
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.25, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                        x: [0, 200, -150, 0],
                        y: [0, -120, 80, 0],
                        scale: [1, 1.5, 0.6, 1],
                        rotate: [0, 270, 540],
                        background: [
                            'radial-gradient(circle, rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(139, 92, 246, 0.6), rgba(168, 85, 247, 0.3), transparent 70%)',
                            'radial-gradient(circle, rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.3), transparent 70%)'
                        ]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />

                {/* Optimized Background Dots - 25 dots with strategic placement */}
                {Array.from({ length: 25 }).map((_, i) => {
                    const positions = [
                        { left: 10, top: 15 }, { left: 25, top: 8 }, { left: 40, top: 20 }, { left: 55, top: 12 }, { left: 70, top: 18 },
                        { left: 85, top: 10 }, { left: 15, top: 35 }, { left: 30, top: 42 }, { left: 45, top: 38 }, { left: 60, top: 45 },
                        { left: 75, top: 40 }, { left: 90, top: 35 }, { left: 20, top: 60 }, { left: 35, top: 65 }, { left: 50, top: 70 },
                        { left: 65, top: 62 }, { left: 80, top: 68 }, { left: 12, top: 85 }, { left: 28, top: 90 }, { left: 44, top: 88 },
                        { left: 60, top: 92 }, { left: 76, top: 85 }, { left: 88, top: 88 }, { left: 5, top: 50 }, { left: 95, top: 55 }
                    ];
                    const pos = positions[i];
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full"
                            style={{
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                willChange: 'transform'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 0.2, scale: 0.8 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.7, 0.2],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 2.5 + (i * 0.1),
                                repeat: Infinity,
                                delay: 0.8 + (i * 0.05),
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}

                {/* Additional Violet Dots */}
                {Array.from({ length: 8 }).map((_, i) => {
                    const positions = [
                        { left: 8, top: 25 }, { left: 22, top: 18 }, { left: 38, top: 30 }, { left: 52, top: 22 }, 
                        { left: 68, top: 28 }, { left: 82, top: 20 }, { left: 18, top: 45 }, { left: 32, top: 52 }
                    ];
                    const pos = positions[i];
                    return (
                        <motion.div
                            key={`violet-${i}`}
                            className="absolute w-1 h-1 bg-violet-400 rounded-full"
                            style={{
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                willChange: 'transform'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 0.15, scale: 0.7 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.15, 0.6, 0.15],
                                scale: [0.7, 1.1, 0.7],
                            }}
                            transition={{
                                duration: 3 + (i * 0.15),
                                repeat: Infinity,
                                delay: 1.0 + (i * 0.05),
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}

                {/* Additional Purple Dots */}
                {Array.from({ length: 7 }).map((_, i) => {
                    const positions = [
                        { left: 48, top: 48 }, { left: 62, top: 55 }, { left: 78, top: 50 }, { left: 92, top: 45 }, 
                        { left: 14, top: 75 }, { left: 42, top: 80 }, { left: 86, top: 78 }
                    ];
                    const pos = positions[i];
                    return (
                        <motion.div
                            key={`purple-${i}`}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                willChange: 'transform'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 0.15, scale: 0.7 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.15, 0.6, 0.15],
                                scale: [0.7, 1.1, 0.7],
                            }}
                            transition={{
                                duration: 3 + (i * 0.15),
                                repeat: Infinity,
                                delay: 1.2 + (i * 0.05),
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}

                {/* Static Grid Pattern - No Animation */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Header Section */}
            <div className="relative z-10 container mb-20">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 150 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="relative px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-full">
                                <span className="text-emerald-400 font-semibold text-sm tracking-wide uppercase">
                                    Exclusive Events
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.h2 
                        className="font-headline text-3xl sm:text-5xl font-bold tracking-tight mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                            Upcoming Events
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            & Workshops
                        </span>
                    </motion.h2>
                    
                    <motion.p 
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Join our exclusive events and masterclasses to stay ahead in cybersecurity. 
                        <span className="text-emerald-400 font-semibold"> Learn from industry experts</span> and 
                        <span className="text-cyan-400 font-semibold"> network with peers</span> in cutting-edge security.
                    </motion.p>
                </motion.div>
            </div>

            {/* Events Grid */}
            <div className="relative z-10 container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 max-w-7xl mx-auto">
                    {events.map((event, index) => {
                        const IconComponent = event.icon;
                        return (
                            <motion.div
                                key={index}
                                className="group relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.06,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    type: "tween"
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                    y: -8,
                                    scale: 1.03
                                }}
                            >
                                <div className="relative h-full">
                                    {/* Static Glow Effect */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 rounded-3xl blur-lg opacity-30" />

                                    {/* Main Card */}
                                    <motion.div
                                        className="relative h-full bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden"
                                        whileHover={{
                                            borderColor: "rgba(59, 130, 246, 0.6)",
                                            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
                                        }}
                                        transition={{ 
                                            duration: 0.15, 
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            type: "tween"
                                        }}
                                        style={{ willChange: 'border-color, box-shadow' }}
                                    >
                                        {/* Static Background Pattern */}
                                        <div
                                            className="absolute inset-0 opacity-5"
                                            style={{
                                                backgroundImage: `
                                                    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
                                                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)
                                                `,
                                                backgroundSize: '40px 40px'
                                            }}
                                        />

                                        {/* Gradient Overlay */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-10`}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10 p-8 h-full flex flex-col">
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-6">
                                                <motion.div
                                                    className={`p-4 rounded-2xl bg-gradient-to-br ${event.color} shadow-lg`}
                                                    whileHover={{ 
                                                        scale: 1.05, 
                                                        rotate: 5
                                                    }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    style={{ willChange: 'transform' }}
                                                >
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </motion.div>
                                                
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex gap-1">
                                                        {[...Array(3)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="w-2 h-2 bg-blue-400 rounded-full"
                                                                animate={{
                                                                    opacity: [0.6, 1, 0.6],
                                                                    scale: [1, 1.1, 1]
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
                                                    <span 
                                                        className={`px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${event.color} rounded-full`}
                                                    >
                                                        {event.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Event Details */}
                                            <div className="space-y-4 mb-6">
                                                <div className="flex items-center gap-4 text-sm text-gray-300">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span className="font-medium">{event.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="font-medium">{event.location}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 text-xs text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{event.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        <span>{event.attendees}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3" />
                                                        <span>{event.difficulty}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <motion.h3 
                                                className="text-2xl font-bold text-white mb-4 leading-tight flex-grow"
                                                whileHover={{ 
                                                    textShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 10px rgba(139, 92, 246, 0.6), 0 0 5px rgba(168, 85, 247, 0.4)"
                                                }}
                                                animate={{
                                                    textShadow: [
                                                        "0 0 10px rgba(59, 130, 246, 0.4)",
                                                        "0 0 15px rgba(139, 92, 246, 0.4)",
                                                        "0 0 15px rgba(168, 85, 247, 0.4)",
                                                        "0 0 10px rgba(59, 130, 246, 0.4)"
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    whileHover: { duration: 0.2 }
                                                }}
                                            >
                                                {event.title}
                                            </motion.h3>

                                            {/* Description */}
                                            <p className="text-gray-300 text-base leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>

                                        {/* Optimized Corner Accents */}
                                        {/* Static Corner Accents */}
                                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-400 rounded-tr-lg opacity-50" />
                                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-violet-400 rounded-bl-lg opacity-50" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom CTA Section */}
            <motion.div
                className="relative z-10 container mt-24 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-5xl mx-auto p-12 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-blue-400 rounded-full" />
                        <div className="absolute bottom-4 right-4 w-16 h-16 border border-violet-400 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-purple-400 rounded-full opacity-50" />
                    </div>
                    
                    <div className="relative z-10">
                        <motion.h3 
                            className="text-3xl font-bold text-white mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Stay Connected with Our Community
                        </motion.h3>
                        
                        <motion.p 
                            className="text-white text-lg leading-relaxed mb-8 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Can't make it to these events? Join our exclusive community for 
                            <span className="text-blue-400 font-semibold"> event recordings</span>, 
                            <span className="text-violet-400 font-semibold"> exclusive updates</span>, and 
                            <span className="text-purple-400 font-semibold"> early access</span> to future workshops.
                        </motion.p>

                        <motion.div
                            className="flex items-center justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {/* View All Events Button */}
                            <Link href="/events">
                                <motion.button
                                    className="group relative px-8 py-4 bg-transparent border-2 border-white/30 rounded-xl font-semibold text-white text-lg hover:border-white/60 transition-all duration-300"
                                    whileHover={{ 
                                        scale: 1.05,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 300, 
                                        damping: 20 
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5" />
                                        <span>View All Events</span>
                                        <motion.div
                                            className="group-hover:translate-x-1 transition-transform duration-200"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </div>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}