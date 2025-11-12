'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

export function InnovationMatrix() {
  return (
    <section className="py-16 sm:py-24 bg-black">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            The Collective Intelligence
          </h2>
          
          <p className="text-lg text-blue-400">
            The minds behind EncryptArx
          </p>
        </div>

        {/* Main Card Container */}
        <div className="max-w-6xl mx-auto relative">
          {/* Ultra Minimal Gradient Glow - Outside Card */}
          <div className="absolute -inset-8 flex items-center justify-center pointer-events-none -z-10">
            {/* Main outer glow */}
            <div
              className="w-[800px] h-[800px] rounded-full"
              style={{
                filter: 'blur(50px)',
                opacity: 0.02,
                background: 'radial-gradient(circle, #3b82f6, #8b5cf6, #06b6d4, transparent 70%)'
              }}
            />
          </div>

          {/* Card with Subtle Animated Border */}
          <motion.div 
            className="relative bg-black rounded-lg border-2 border-blue-500/50 p-8 z-10 overflow-hidden min-h-[400px]"
            animate={{
              borderColor: [
                'rgba(59, 130, 246, 0.4)', // blue-500 with medium opacity
                'rgba(139, 92, 246, 0.4)', // purple-500 with medium opacity
                'rgba(6, 182, 212, 0.4)', // cyan-500 with medium opacity
                'rgba(16, 185, 129, 0.4)', // emerald-500 with medium opacity
                'rgba(236, 72, 153, 0.4)', // pink-500 with medium opacity
                'rgba(59, 130, 246, 0.4)'  // back to blue-500 with medium opacity
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Ultra Random Light Particles Animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle at 7% 13%, rgba(59, 130, 246, 0.08), transparent 25%), radial-gradient(circle at 93% 87%, rgba(139, 92, 246, 0.06), transparent 20%), radial-gradient(circle at 23% 67%, rgba(6, 182, 212, 0.07), transparent 18%), radial-gradient(circle at 77% 33%, rgba(16, 185, 129, 0.05), transparent 22%), radial-gradient(circle at 43% 91%, rgba(245, 158, 11, 0.04), transparent 16%)',
                  'radial-gradient(circle at 89% 19%, rgba(239, 68, 68, 0.09), transparent 28%), radial-gradient(circle at 11% 81%, rgba(236, 72, 153, 0.06), transparent 24%), radial-gradient(circle at 57% 7%, rgba(59, 130, 246, 0.05), transparent 19%), radial-gradient(circle at 83% 73%, rgba(139, 92, 246, 0.08), transparent 26%), radial-gradient(circle at 37% 47%, rgba(6, 182, 212, 0.07), transparent 21%)',
                  'radial-gradient(circle at 71% 29%, rgba(16, 185, 129, 0.09), transparent 27%), radial-gradient(circle at 29% 71%, rgba(245, 158, 11, 0.05), transparent 23%), radial-gradient(circle at 97% 53%, rgba(239, 68, 68, 0.06), transparent 20%), radial-gradient(circle at 3% 47%, rgba(236, 72, 153, 0.08), transparent 25%), radial-gradient(circle at 61% 17%, rgba(59, 130, 246, 0.04), transparent 17%)',
                  'radial-gradient(circle at 39% 83%, rgba(139, 92, 246, 0.07), transparent 22%), radial-gradient(circle at 91% 37%, rgba(6, 182, 212, 0.09), transparent 29%), radial-gradient(circle at 19% 63%, rgba(16, 185, 129, 0.05), transparent 18%), radial-gradient(circle at 73% 97%, rgba(245, 158, 11, 0.06), transparent 24%), radial-gradient(circle at 47% 3%, rgba(239, 68, 68, 0.08), transparent 26%)',
                  'radial-gradient(circle at 13% 37%, rgba(236, 72, 153, 0.07), transparent 21%), radial-gradient(circle at 87% 63%, rgba(59, 130, 246, 0.05), transparent 19%), radial-gradient(circle at 53% 89%, rgba(139, 92, 246, 0.09), transparent 28%), radial-gradient(circle at 67% 11%, rgba(6, 182, 212, 0.06), transparent 23%), radial-gradient(circle at 33% 79%, rgba(16, 185, 129, 0.04), transparent 16%)',
                  'radial-gradient(circle at 79% 41%, rgba(245, 158, 11, 0.08), transparent 25%), radial-gradient(circle at 21% 59%, rgba(239, 68, 68, 0.06), transparent 20%), radial-gradient(circle at 97% 7%, rgba(236, 72, 153, 0.05), transparent 18%), radial-gradient(circle at 3% 93%, rgba(59, 130, 246, 0.07), transparent 22%), radial-gradient(circle at 41% 31%, rgba(139, 92, 246, 0.09), transparent 27%)',
                  'radial-gradient(circle at 7% 13%, rgba(59, 130, 246, 0.08), transparent 25%), radial-gradient(circle at 93% 87%, rgba(139, 92, 246, 0.06), transparent 20%), radial-gradient(circle at 23% 67%, rgba(6, 182, 212, 0.07), transparent 18%), radial-gradient(circle at 77% 33%, rgba(16, 185, 129, 0.05), transparent 22%), radial-gradient(circle at 43% 91%, rgba(245, 158, 11, 0.04), transparent 16%)'
                ]
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Chaotic Light Orbs */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle at 14% 26%, rgba(59, 130, 246, 0.04), transparent 15%), radial-gradient(circle at 86% 74%, rgba(139, 92, 246, 0.03), transparent 12%), radial-gradient(circle at 34% 84%, rgba(6, 182, 212, 0.05), transparent 14%), radial-gradient(circle at 66% 16%, rgba(16, 185, 129, 0.03), transparent 11%)',
                  'radial-gradient(circle at 78% 22%, rgba(245, 158, 11, 0.06), transparent 17%), radial-gradient(circle at 22% 78%, rgba(239, 68, 68, 0.04), transparent 13%), radial-gradient(circle at 58% 6%, rgba(236, 72, 153, 0.05), transparent 15%), radial-gradient(circle at 42% 94%, rgba(59, 130, 246, 0.03), transparent 10%)',
                  'radial-gradient(circle at 94% 38%, rgba(139, 92, 246, 0.07), transparent 19%), radial-gradient(circle at 6% 62%, rgba(6, 182, 212, 0.04), transparent 12%), radial-gradient(circle at 38% 82%, rgba(16, 185, 129, 0.05), transparent 16%), radial-gradient(circle at 62% 18%, rgba(245, 158, 11, 0.03), transparent 9%)',
                  'radial-gradient(circle at 82% 46%, rgba(239, 68, 68, 0.06), transparent 18%), radial-gradient(circle at 18% 54%, rgba(236, 72, 153, 0.04), transparent 14%), radial-gradient(circle at 54% 86%, rgba(59, 130, 246, 0.05), transparent 15%), radial-gradient(circle at 46% 14%, rgba(139, 92, 246, 0.03), transparent 11%)',
                  'radial-gradient(circle at 26% 34%, rgba(6, 182, 212, 0.07), transparent 20%), radial-gradient(circle at 74% 66%, rgba(16, 185, 129, 0.04), transparent 13%), radial-gradient(circle at 98% 2%, rgba(245, 158, 11, 0.05), transparent 16%), radial-gradient(circle at 2% 98%, rgba(239, 68, 68, 0.03), transparent 10%)',
                  'radial-gradient(circle at 14% 26%, rgba(59, 130, 246, 0.04), transparent 15%), radial-gradient(circle at 86% 74%, rgba(139, 92, 246, 0.03), transparent 12%), radial-gradient(circle at 34% 84%, rgba(6, 182, 212, 0.05), transparent 14%), radial-gradient(circle at 66% 16%, rgba(16, 185, 129, 0.03), transparent 11%)'
                ]
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
            
            {/* Wild Light Streaks */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  'linear-gradient(17deg, transparent 0%, rgba(59, 130, 246, 0.02) 25%, transparent 50%), linear-gradient(73deg, transparent 0%, rgba(139, 92, 246, 0.015) 35%, transparent 65%), linear-gradient(127deg, transparent 0%, rgba(6, 182, 212, 0.025) 20%, transparent 45%), linear-gradient(191deg, transparent 0%, rgba(16, 185, 129, 0.02) 40%, transparent 70%)',
                  'linear-gradient(43deg, transparent 0%, rgba(245, 158, 11, 0.03) 30%, transparent 60%), linear-gradient(97deg, transparent 0%, rgba(239, 68, 68, 0.015) 45%, transparent 75%), linear-gradient(151deg, transparent 0%, rgba(236, 72, 153, 0.025) 15%, transparent 40%), linear-gradient(205deg, transparent 0%, rgba(59, 130, 246, 0.02) 50%, transparent 80%)',
                  'linear-gradient(269deg, transparent 0%, rgba(139, 92, 246, 0.03) 25%, transparent 55%), linear-gradient(323deg, transparent 0%, rgba(6, 182, 212, 0.015) 35%, transparent 65%), linear-gradient(17deg, transparent 0%, rgba(16, 185, 129, 0.025) 20%, transparent 45%), linear-gradient(71deg, transparent 0%, rgba(245, 158, 11, 0.02) 40%, transparent 70%)',
                  'linear-gradient(125deg, transparent 0%, rgba(239, 68, 68, 0.03) 30%, transparent 60%), linear-gradient(179deg, transparent 0%, rgba(236, 72, 153, 0.015) 45%, transparent 75%), linear-gradient(233deg, transparent 0%, rgba(59, 130, 246, 0.025) 15%, transparent 40%), linear-gradient(287deg, transparent 0%, rgba(139, 92, 246, 0.02) 50%, transparent 80%)',
                  'linear-gradient(341deg, transparent 0%, rgba(6, 182, 212, 0.03) 25%, transparent 55%), linear-gradient(35deg, transparent 0%, rgba(16, 185, 129, 0.015) 35%, transparent 65%), linear-gradient(89deg, transparent 0%, rgba(245, 158, 11, 0.025) 20%, transparent 45%), linear-gradient(143deg, transparent 0%, rgba(239, 68, 68, 0.02) 40%, transparent 70%)',
                  'linear-gradient(17deg, transparent 0%, rgba(59, 130, 246, 0.02) 25%, transparent 50%), linear-gradient(73deg, transparent 0%, rgba(139, 92, 246, 0.015) 35%, transparent 65%), linear-gradient(127deg, transparent 0%, rgba(6, 182, 212, 0.025) 20%, transparent 45%), linear-gradient(191deg, transparent 0%, rgba(16, 185, 129, 0.02) 40%, transparent 70%)'
                ]
              }}
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-6 w-6 text-blue-400" />
                <div className="text-blue-400 font-medium text-lg">
                  Intelligence & Expertise
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side - Text content */}
                <div className="lg:col-span-2">
                  {/* First paragraph */}
                  <div className="space-y-3 mb-6 text-gray-300">
                    <p className="text-sm leading-relaxed">
                      Cryptographic minds developing post-quantum algorithms and zero-knowledge proof systems.
                    </p>
                    
                    <p className="text-sm leading-relaxed">
                      AI security specialists creating adversarial-resistant models and privacy-preserving techniques.
                    </p>
                    
                    <p className="text-sm leading-relaxed">
                      Systems architects building zero-trust architectures and secure DevOps practices.
                    </p>
                  </div>
                  
                  {/* Second paragraph */}
                  <div className="space-y-3 mb-8 text-gray-300">
                    <p className="text-sm leading-relaxed">
                      Our interdisciplinary approach combines cutting-edge research with practical implementation, 
                      ensuring that theoretical breakthroughs translate into real-world security solutions.
                    </p>
                    
                    <p className="text-sm leading-relaxed">
                      From quantum-resistant cryptography to AI-powered threat detection, we're building the 
                      security infrastructure that will protect tomorrow's digital world.
                    </p>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex justify-start">
                    <Link href="/team" className="relative inline-block">
                    <motion.div 
                      className="relative flex items-center text-blue-400 font-medium overflow-hidden group"
                      whileHover={{ 
                        scale: 1.02,
                        rotateX: 5,
                        rotateY: 2
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Animated background with wave effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-cyan-500/10 rounded-lg"
                        initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
                        whileHover={{ 
                          scaleX: 1, 
                          scaleY: 1, 
                          opacity: 1,
                          rotate: 180
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                      
                      {/* Pulsing border effect */}
                      <motion.div
                        className="absolute inset-0 rounded-lg border-2 border-transparent"
                        whileHover={{
                          borderColor: "rgba(59, 130, 246, 0.6)",
                          boxShadow: [
                            "0 0 0px rgba(59, 130, 246, 0)",
                            "0 0 15px rgba(59, 130, 246, 0.4)",
                            "0 0 25px rgba(59, 130, 246, 0.2)"
                          ]
                        }}
                        transition={{ 
                          duration: 0.3,
                          boxShadow: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
                        }}
                      />
                      
                      {/* Text and icon */}
                      <motion.span 
                        className="relative z-10 flex items-center px-4 py-2"
                        whileHover={{ 
                          color: "#ffffff",
                          textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Meet the Minds
                        <motion.div
                          className="relative"
                          whileHover={{ 
                            x: [0, 3, 0],
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, 0]
                          }}
                          transition={{ 
                            duration: 0.6,
                            times: [0, 0.5, 1],
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                          
                          {/* Arrow trail effect */}
                          <motion.div
                            className="absolute inset-0"
                            whileHover={{
                              opacity: [0, 0.5, 0],
                              scale: [0.8, 1.2, 0.8],
                              x: [0, 8, 0]
                            }}
                            transition={{
                              duration: 0.6,
                              times: [0, 0.5, 1],
                              ease: "easeInOut"
                            }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4 text-cyan-400" />
                          </motion.div>
                        </motion.div>
                      </motion.span>
                      
                      {/* Floating particles */}
                      <motion.div
                        className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full"
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: 0.3
                        }}
                      />
                      <motion.div
                        className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full"
                        animate={{
                          y: [0, -6, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: 0.8
                        }}
                      />
                      <motion.div
                        className="absolute top-1/2 right-1 w-1 h-1 bg-blue-400 rounded-full"
                        animate={{
                          x: [0, -4, 0],
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: 1.2
                        }}
                      />
                    </motion.div>
                    </Link>
                  </div>
                </div>
                
                {/* Right side - Lottie Animation */}
                <div className="lg:col-span-1 flex items-start justify-center">
                  <div className="w-full h-56 flex items-center justify-center">
                    <DotLottieReact
                      src="/lottie/Recruitment.lottie"
                      autoplay
                      loop
                      className="w-full h-full object-contain"
                      style={{ background: 'transparent' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}