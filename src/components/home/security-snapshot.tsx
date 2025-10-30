'use client';

import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const securityMetrics = [
  {
    id: 'advisories',
    icon: AlertTriangle,
    label: 'Open Advisories',
    value: '0',
    tooltip: 'No active security advisories requiring immediate attention',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/10'
  },
  {
    id: 'mttr',
    icon: Clock,
    label: 'Avg. MTTR',
    value: '4.2h',
    tooltip: 'Mean Time To Resolution - Average time to resolve security incidents',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10'
  },
  {
    id: 'pentests',
    icon: Shield,
    label: 'Pen Tests (YTD)',
    value: '5',
    tooltip: 'Penetration tests completed this year across all systems',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10'
  },
  {
    id: 'incident',
    icon: CheckCircle,
    label: 'Last Incident',
    value: '320d ago',
    tooltip: 'Days since last security incident - demonstrating operational excellence',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10'
  }
];

export function SecuritySnapshot() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
    <section className="py-16 sm:py-24 bg-black relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                        Security & Trust at a Glance
                    </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            We are committed to transparency and operational excellence
          </motion.p>
                                        </div>

        {/* Security metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  duration: 0.6, 
                  delay: 0.5 + (index * 0.1),
                  ease: "easeOut"
                }
              }}
              onMouseEnter={() => setHoveredCard(metric.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group cursor-pointer relative"
            >
              {/* Neon Gradient Card */}
              <div className="relative rounded-2xl bg-black border-2 border-transparent p-6 text-center space-y-4 h-full min-h-[200px] flex flex-col justify-center">
                {/* Animated neon border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="absolute inset-[2px] rounded-2xl bg-black" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${metric.iconBg} mb-4`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <metric.icon className={`h-8 w-8 ${metric.iconColor}`} />
                  </motion.div>

                  {/* Metric value */}
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-gray-300">
                      {metric.label}
                    </div>
                </div>
                </div>

                {/* Tooltip on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredCard === metric.id ? 1 : 0,
                    y: hoveredCard === metric.id ? 0 : 10
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-w-xs z-20"
                >
                  <p className="text-xs text-gray-300 text-center">
                    {metric.tooltip}
                  </p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              // Analytics tracking
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'security_snapshot_click', {
                  event_category: 'engagement',
                  event_label: 'view_security_advisories'
                });
              }
              // Navigate to security advisories
              window.open('/api/security/snapshot', '_blank');
            }}
          >
            View Security Advisories
          </motion.button>
        </motion.div>
            </div>
        </section>
    );
}
