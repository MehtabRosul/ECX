'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Phone, Mail, Clock } from 'lucide-react';
import { useEffect, useState, memo, useCallback, useMemo } from 'react';

const officeLocation = {
  lat: 20.4625,
  lng: 85.8829,
  address: 'Cuttack, Odisha, India',
  pin: '753002',
};

function CreativeMapComponent() {
  const [showInfo, setShowInfo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleInfo = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowInfo(prev => !prev);
  }, []);

  const mapUrl = useMemo(() => 
    `https://www.google.com/maps?q=Cuttack+Odisha+India+753002&output=embed`,
    []
  );

  const mapsSearchUrl = useMemo(() => 
    `https://www.google.com/maps/search/?api=1&query=${officeLocation.lat},${officeLocation.lng}`,
    []
  );

  const mapsDirectionsUrl = useMemo(() => 
    `https://www.google.com/maps/dir/?api=1&destination=${officeLocation.lat},${officeLocation.lng}`,
    []
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full py-8 md:py-12 lg:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-2 md:mb-4">
            Visit Our <span className="text-primary">Head Office</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Located in the heart of Cuttack, Odisha, India
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Main Map Container - Reduced height on mobile */}
          <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl md:rounded-3xl border border-white/10 bg-surface-2/50 backdrop-blur-xl overflow-hidden group">
            {/* Map Overlay with Gradient */}
            <div className="absolute inset-0 z-0">
              {/* Google Maps Embed with custom styling - Cuttack, Odisha, India */}
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  filter: 'grayscale(100%) brightness(0.9) contrast(110%)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="EncryptArx Office Location"
              />
              
              {/* Light Overlay for Better UI Contrast - Exclude bottom and right areas for map controls */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-1/20 via-transparent to-surface-1/20 pointer-events-none" 
                   style={{ clipPath: 'polygon(0 0, calc(100% - 80px) 0, calc(100% - 80px) calc(100% - 80px), 0 calc(100% - 80px))' }} />
              
              {/* Subtle Blue Accent Layer - Exclude bottom and right areas for map controls */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-950/10 to-primary/5 pointer-events-none"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 80px) 0, calc(100% - 80px) calc(100% - 80px), 0 calc(100% - 80px))' }} />
              
              {/* Animated Grid Pattern - Subtle on Light Background - Exclude bottom and right areas */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 80px) 0, calc(100% - 80px) calc(100% - 80px), 0 calc(100% - 80px))' }}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(43,141,190,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(43,141,190,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
              </div>

              {/* Pulsing Location Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Outer Pulse Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-primary/30"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                  {/* Middle Pulse Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-3 border-primary/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.3,
                      ease: 'easeOut',
                    }}
                  />
                  {/* Center Pin - Smaller on mobile */}
                  <div className="relative">
                    <motion.div
                      className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center border-2 md:border-4 border-white"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                    </motion.div>
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.3, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Information Card - Compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={showInfo ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
              className="absolute top-2 left-2 right-2 md:top-8 md:left-8 md:right-auto z-[90] max-w-full md:max-w-sm pointer-events-auto"
              style={{ pointerEvents: showInfo ? 'auto' : 'none' }}
            >
              <div className="relative bg-black/85 backdrop-blur-2xl border-2 border-white/20 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-2xl shadow-black/50 overflow-hidden group/info ring-1 md:ring-2 ring-white/10">
                {/* Enhanced Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-900/30 to-primary/20 opacity-0 group-hover/info:opacity-100 transition-opacity duration-500" />
                
                {/* Content - Compact mobile layout */}
                <div className="relative z-10">
                  <div className="flex items-start gap-2 md:gap-4 mb-2 md:mb-4">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 md:p-3 rounded-lg md:rounded-xl bg-black/30 border border-white/20 group-hover/info:bg-primary/20 group-hover/info:border-primary/50 transition-all duration-300 relative overflow-hidden flex-shrink-0"
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/20 opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"
                      />
                      <MapPin className="w-4 h-4 md:w-6 md:h-6 text-white fill-white group-hover/info:text-primary group-hover/info:fill-primary relative z-10 transition-colors duration-300" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm md:text-lg text-white mb-1 md:mb-2 group-hover/info:text-primary transition-colors duration-300">
                        EncryptArx Headquarters
                      </h3>
                      <p className="text-xs md:text-sm text-white/80 mb-0.5 md:mb-1 truncate">
                        {officeLocation.address}
                      </p>
                      <p className="text-xs md:text-sm text-white/80">
                        Pin: <span className="font-medium text-white">{officeLocation.pin}</span>
                      </p>
                    </div>
                  </div>

                  {/* Contact Details - Compact on mobile */}
                  <div className="space-y-1.5 md:space-y-3 pt-2 md:pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                      <Phone className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                      <span className="text-white/80 truncate">+91 XXX XXX XXXX</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                      <Mail className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                      <span className="text-white/80 truncate">info@encryptarx.com</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                      <span className="text-white/80 truncate">Mon-Fri, 9AM-6PM IST</span>
                    </div>
                  </div>

                  {/* Action Buttons - Compact on mobile */}
                  <div className="flex gap-1.5 md:gap-2 mt-2 md:mt-4">
                    <motion.a
                      href={mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg bg-gray-900 text-white text-xs md:text-sm font-medium hover:bg-black transition-colors duration-300 flex items-center justify-center gap-1 md:gap-2"
                    >
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Open in Maps</span>
                      <span className="sm:hidden">Maps</span>
                    </motion.a>
                    <motion.a
                      href={mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg border border-black/40 bg-gray-800/90 text-white text-xs md:text-sm font-medium hover:border-black/60 hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-1 md:gap-2"
                    >
                      <Navigation className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Directions</span>
                      <span className="sm:hidden">Route</span>
                    </motion.a>
                  </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/info:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '200%',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Toggle Button - Compact on mobile - Fixed z-index and pointer events */}
            <div className="absolute bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleInfo(e);
                }}
                onTouchEnd={(e) => {
                  // Handle touch events separately to ensure mobile works
                  e.preventDefault();
                  e.stopPropagation();
                  toggleInfo(e);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-gray-800/90 backdrop-blur-xl border border-black/40 md:border-2 text-white hover:border-black/60 hover:bg-gray-900 transition-all duration-300 flex items-center gap-1.5 md:gap-2 group shadow-lg md:shadow-xl shadow-black/30 ring-1 md:ring-2 ring-black/20 touch-manipulation cursor-pointer active:scale-95"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  zIndex: 101,
                }}
              >
                <motion.div
                  animate={{ rotate: showInfo ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Navigation className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </motion.div>
                <span className="text-xs md:text-sm font-medium">
                  {showInfo ? (
                    <>
                      <span className="hidden sm:inline">Hide Details</span>
                      <span className="sm:hidden">Hide</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">View Location Details</span>
                      <span className="sm:hidden">Details</span>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const CreativeMap = memo(CreativeMapComponent);
