'use client';

import { motion } from 'framer-motion';

export function AdvertisementBanner() {
    return (
        <motion.section 
            className="relative py-12 sm:py-16 bg-surface-1 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="container mx-auto px-4">
                {/* Desktop Banner - Hidden on mobile */}
                <motion.div
                    className="hidden md:block"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 0.6, 
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full rounded-2xl overflow-hidden">
                        {/* Gradient Background - Dark blue to dark purple (transparent) */}
                        <div className="relative h-[400px] bg-gradient-to-r from-[#1e3a8a]/30 via-[#312e81]/30 to-[#581c87]/30">
                            {/* Subtle L-shaped corner brackets */}
                            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20" />
                            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20" />
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Banner - Hidden on desktop */}
                <motion.div
                    className="block md:hidden"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 0.6, 
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full rounded-2xl overflow-hidden">
                        {/* Gradient Background - Dark blue to dark purple (transparent) */}
                        <div className="relative h-[300px] bg-gradient-to-r from-[#1e3a8a]/30 via-[#312e81]/30 to-[#581c87]/30">
                            {/* Subtle L-shaped corner brackets */}
                            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/20" />
                            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/20" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
