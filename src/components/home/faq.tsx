
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Shield, Zap, Users, Globe, Lock, Award, HeadphonesIcon } from 'lucide-react';

const faqs = [
    {
        question: "What makes EncryptArx different from other cybersecurity solutions?",
        answer: "EncryptArx combines cutting-edge AI with quantum-resistant cryptography to provide next-generation security. Unlike traditional solutions, we offer real-time threat detection, automated response capabilities, and future-proof encryption that's resistant to quantum computing threats. Our platform integrates seamlessly with existing infrastructure while providing enterprise-grade protection.",
        icon: Shield,
        category: "Product"
    },
    {
        question: "How does your AI-powered threat detection work?",
        answer: "Our AI engine analyzes network traffic, user behavior, and system patterns in real-time using machine learning algorithms. It can detect anomalies, zero-day attacks, and sophisticated threats that traditional signature-based systems miss. The system continuously learns and adapts to new threat patterns, providing increasingly accurate protection over time.",
        icon: Zap,
        category: "Technology"
    },
    {
        question: "What industries and company sizes do you serve?",
        answer: "We serve organizations of all sizes, from startups to Fortune 500 companies, across industries including finance, healthcare, government, e-commerce, manufacturing, and technology. Our solutions are scalable and customizable to meet the specific security requirements and compliance needs of each sector.",
        icon: Globe,
        category: "Business"
    },
    {
        question: "How do you ensure data privacy and compliance?",
        answer: "EncryptArx is built with privacy-by-design principles and complies with GDPR, HIPAA, SOC 2, and other major regulations. We use end-to-end encryption, zero-knowledge architecture, and provide comprehensive audit trails. Your data remains encrypted at rest, in transit, and during processing, ensuring complete privacy protection.",
        icon: Lock,
        category: "Security"
    }
]

export function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <motion.section 
            className="relative py-32 bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween"
            }}
            viewport={{ once: true, margin: "-150px" }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Animated Background Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1), transparent 70%)',
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
                        duration: 20,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.6, 1],
                        delay: 0,
                        initial: { duration: 0.8, delay: 0.2 }
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.1), transparent 70%)',
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
                        duration: 25,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.6, 1],
                        delay: 3,
                        initial: { duration: 0.8, delay: 0.4 }
                    }}
                />

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

            {/* Content */}
            <div className="relative z-10 container">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "tween"
                    }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ scale: 0.5, opacity: 0, y: 20 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: 0.4, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "tween"
                        }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="relative px-6 py-3 bg-gradient-to-r from-blue-500/10 to-violet-500/10 backdrop-blur-sm border border-blue-400/30 rounded-full">
                                <span className="text-blue-400 font-semibold text-sm tracking-wide uppercase">
                                    Support & Information
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.h2 
                        className="font-headline text-4xl sm:text-6xl font-bold tracking-tight mb-6"
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "tween"
                        }}
                        viewport={{ once: true }}
                    >
                        <span className="bg-gradient-to-r from-white via-blue-200 to-violet-200 bg-clip-text text-transparent">
                            Frequently Asked
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </motion.h2>
                    
                    <motion.p 
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.7, 
                            delay: 0.7,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "tween"
                        }}
                        viewport={{ once: true }}
                    >
                        Find answers to common questions about our cybersecurity solutions, 
                        <span className="text-blue-400 font-semibold"> implementation process</span>, and 
                        <span className="text-violet-400 font-semibold"> support services</span>.
                    </motion.p>
                </motion.div>

                {/* FAQ Items */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => {
                        const IconComponent = faq.icon;
                        const isOpen = openIndex === index;
                        
                        return (
                            <motion.div
                                key={index}
                                className="group"
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.9 + (index * 0.15),
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    type: "tween"
                                }}
                                viewport={{ once: true }}
                            >
                                <div className="relative">
                                    {/* Glow Effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Main Card */}
                                    <motion.div
                                        className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden"
                                        whileHover={{
                                            borderColor: "rgba(59, 130, 246, 0.6)",
                                            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
                                        }}
                                        transition={{ 
                                            duration: 0.2, 
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            type: "tween"
                                        }}
                                    >
                                        {/* Question Header */}
                                        <motion.button
                                            className="w-full p-6 text-left flex items-center justify-between group"
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <div className="flex items-start gap-4">
                                                <motion.div
                                                    className={`p-3 rounded-xl bg-gradient-to-br ${isOpen ? 'from-blue-500 to-violet-500' : 'from-slate-700 to-slate-800'} shadow-lg`}
                                                    whileHover={{ 
                                                        scale: 1.05, 
                                                        rotate: 3
                                                    }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                >
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </motion.div>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full border border-blue-400/30">
                                                            {faq.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-200">
                                                        {faq.question}
                                                    </h3>
                                                </div>
                                            </div>
                                            
                                            <motion.div
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="ml-4"
                                            >
                                                <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                                            </motion.div>
                                        </motion.button>

                                        {/* Answer Content */}
                                        <motion.div
                                            initial={false}
                                            animate={{ 
                                                height: isOpen ? "auto" : 0,
                                                opacity: isOpen ? 1 : 0
                                            }}
                                            transition={{ 
                                                duration: 0.3, 
                                                ease: [0.25, 0.46, 0.45, 0.94] 
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6">
                                                <div className="ml-16">
                                                    <div className="h-px bg-gradient-to-r from-blue-500/30 to-violet-500/30 mb-4" />
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: 1.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "tween"
                    }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400 mb-6">
                        Still have questions? Our team is here to help.
                    </p>
                    <motion.button
                        className="px-8 py-4 bg-transparent border-2 border-blue-400/50 text-white font-semibold rounded-xl hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25 
                        }}
                    >
                        Contact Support
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
}
