'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareersParticlesBackground } from '@/components/careers/careers-particles-background';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Zap, 
  Users, 
  TrendingUp, 
  Heart, 
  Globe, 
  Code, 
  Video, 
  DollarSign,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  Lightbulb,
  Shield,
  Clock,
  Calendar,
  Award,
  Coffee,
  Laptop,
  Building2,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { HeroButton } from './careers-hero-buttons';

// Job data structure
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  slug: string;
  icon: any;
  color: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Motion Graphics Designer',
    department: 'Creative',
    location: 'Remote',
    type: 'Contract-Based',
    experience: 'Portfolio Required',
    slug: 'motion-graphics-designer',
    icon: Video,
    color: 'from-purple-500 to-pink-500',
    description: 'Create visually captivating animations, explainer videos, and promotional visuals that reflect our company\'s futuristic and tech-driven identity. Work closely with marketing and creative teams to produce dynamic visuals.',
    requirements: [
      'Proven experience as a Motion Graphics Designer or Animator (Portfolio required)',
      'Proficiency in After Effects, Premiere Pro, Illustrator, Photoshop',
      'Strong sense of timing, visual storytelling, and composition',
      'Ability to translate abstract concepts into visually appealing motion pieces',
      'Excellent attention to detail and ability to work independently'
    ],
    benefits: [
      'Flexible remote work setup',
      'Creative freedom to experiment and showcase skills',
      'Potential for long-term collaboration based on performance'
    ]
  },
  {
    id: '2',
    title: 'Python (Machine Learning) Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Internship',
    experience: 'Portfolio/GitHub',
    slug: 'python-ml-developer',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    description: 'Design, build, and deploy scalable ML systems that power our products and services. Turn research prototypes into reliable, well-tested production pipelines and APIs.',
    requirements: [
      'Proven experience building and shipping ML systems using Python',
      'Strong proficiency in Python and ML libraries (scikit-learn, pandas, NumPy)',
      'Experience with deep learning frameworks (TensorFlow, PyTorch)',
      'Experience deploying models using Docker and serving frameworks',
      'Familiarity with cloud platforms (AWS/GCP/Azure)'
    ],
    benefits: [
      'Flexible remote work and project schedule',
      'Opportunity to work on cutting-edge ML problems',
      'Creative freedom to experiment with models and architectures',
      'Potential for long-term collaboration and growth',
      'Access to mentorship from senior ML engineers'
    ]
  },
  {
    id: '3',
    title: 'Technical Sales Representative Intern',
    department: 'Sales',
    location: 'Remote',
    type: 'Internship',
    experience: 'Entry Level',
    slug: 'technical-sales-representative-intern',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-500',
    description: 'Drive revenue growth by identifying new business opportunities, nurturing leads, and closing deals across our AI, cybersecurity, and product development solutions. Performance-oriented role ideal for motivated self-starters.',
    requirements: [
      'Familiarity with digital tools (Apollo, HubSpot, LinkedIn Sales Navigator)',
      'Strong verbal and written communication skills',
      'Confidence in presenting to clients and handling objections',
      'Self-motivated and results-driven',
      'Ability to work in a fast-paced, tech-driven environment'
    ],
    benefits: [
      'Certificate of Internship',
      'Fully Remote Work Environment',
      'Performance-Based Incentives',
      'Opportunity to work with innovative deeptech company',
      'Freedom to experiment, innovate, and make measurable impact'
    ]
  }
];

// Scope/Opportunity cards
const scopes = [
  {
    title: 'Career Growth',
    description: 'Clear career paths with mentorship and development programs',
    icon: TrendingUp,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30'
  },
  {
    title: 'Innovation',
    description: 'Work on cutting-edge projects with the latest technologies',
    icon: Lightbulb,
    color: 'from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/30'
  },
  {
    title: 'Impact',
    description: 'Make a real difference in the industry and for our clients',
    icon: Target,
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/30'
  },
  {
    title: 'Learning',
    description: 'Continuous learning opportunities and skill development',
    icon: Rocket,
    color: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-500/30'
  }
];

// Benefits data
const benefits = [
  {
    title: 'Flexible Work',
    description: 'Work from anywhere with flexible hours',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and wellness programs',
    icon: Heart,
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'Learning Budget',
    description: 'Annual budget for courses, conferences, and books',
    icon: Award,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    title: 'Time Off',
    description: 'Generous vacation days and paid time off',
    icon: Calendar,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Equipment',
    description: 'Latest hardware and software for your role',
    icon: Laptop,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'Team Events',
    description: 'Regular team building and social events',
    icon: Users,
    color: 'from-orange-500 to-red-500'
  }
];

// Culture values
const cultureValues = [
  {
    title: 'Collaboration',
    description: 'We believe in the power of working together',
    icon: Users
  },
  {
    title: 'Innovation',
    description: 'We encourage creativity and new ideas',
    icon: Sparkles
  },
  {
    title: 'Integrity',
    description: 'We act with honesty and transparency',
    icon: Shield
  },
  {
    title: 'Excellence',
    description: 'We strive for the highest quality in everything',
    icon: Award
  }
];

// Hiring process steps
const processSteps = [
  {
    step: 1,
    title: 'Application',
    description: 'Submit your application and resume through our portal',
    icon: Briefcase,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glowColor: 'rgba(59, 130, 246, 0.5)'
  },
  {
    step: 2,
    title: 'Screening',
    description: 'Initial review and phone screening with our team',
    icon: Clock,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    glowColor: 'rgba(168, 85, 247, 0.5)'
  },
  {
    step: 3,
    title: 'Interview',
    description: 'Technical and cultural fit interviews with key team members',
    icon: Users,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glowColor: 'rgba(245, 158, 11, 0.5)'
  },
  {
    step: 4,
    title: 'Offer',
    description: 'Receive your offer and join our amazing team',
    icon: Rocket,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.5)'
  }
];

// Memoized job card component for better performance
const JobCard = memo(({ job, index, isHovered, onHoverStart, onHoverEnd }: {
  job: Job;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  const Icon = job.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
      style={{ willChange: 'transform' }}
    >
      {/* Glow effect on hover */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-br ${job.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10`}
        style={{ willChange: 'opacity' }}
      />
      
      {/* Main Card - Fixed height with flexbox for button alignment */}
      <Card className="relative h-full min-h-[520px] border-2 border-primary/10 bg-gradient-to-br from-card/90 via-card/70 to-card/90 backdrop-blur-xl hover:border-primary/40 hover:shadow-2xl transition-all duration-500 overflow-hidden group/card flex flex-col">
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${job.color} opacity-0 group-hover/card:opacity-5 transition-opacity duration-500`} />
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/10 rounded-tl-3xl group-hover/card:border-primary/30 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/10 rounded-br-3xl group-hover/card:border-primary/30 transition-colors duration-500" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" style={{ willChange: 'transform' }} />

        <CardHeader className="relative z-10 p-4 md:p-6 pb-4 flex-shrink-0">
          <div className="flex items-start justify-between gap-2 md:gap-0 mb-4 md:mb-6">
            {/* Icon with enhanced design - Smaller on mobile */}
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className={`relative w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-2xl group-hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-500 overflow-hidden`}
              style={{ willChange: 'transform' }}
            >
              {/* Icon pulse effect */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                className={`absolute inset-0 bg-gradient-to-br ${job.color} rounded-xl md:rounded-2xl`}
                style={{ willChange: 'transform, opacity' }}
              />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ willChange: 'transform' }} />
              <Icon className="w-6 h-6 md:w-10 md:h-10 text-white relative z-10" />
            </motion.div>
            
            {/* Experience Badge - Enhanced with new hover effects - Smaller on mobile */}
            <motion.div
              whileHover={{ 
                scale: 1.15,
                rotate: [0, -5, 5, -5, 0],
                y: -2
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400,
                damping: 10
              }}
              className="group/badge"
              style={{ willChange: 'transform' }}
            >
              <Badge className="bg-gradient-to-r from-primary/30 via-cyan-500/30 to-primary/30 text-white border border-primary/50 md:border-2 md:border-primary/50 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-semibold shadow-lg group-hover/badge:shadow-xl group-hover/badge:shadow-primary/50 group-hover/badge:border-primary group-hover/badge:from-primary/50 group-hover/badge:via-cyan-500/50 group-hover/badge:to-primary/50 transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10">{job.experience}</span>
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700" style={{ willChange: 'transform' }} />
              </Badge>
            </motion.div>
          </div>
          
          {/* Job Title - Enhanced */}
          <CardTitle className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight group-hover/card:text-white transition-colors duration-300">
            {job.title}
          </CardTitle>
          
          {/* Job Attributes - Redesigned */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="bg-background/50 border-primary/20 text-xs px-3 py-1.5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" />
              {job.location}
            </Badge>
            <Badge variant="outline" className="bg-background/50 border-primary/20 text-xs px-3 py-1.5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300">
              <Building2 className="w-3.5 h-3.5 mr-1.5 text-primary" />
              {job.department}
            </Badge>
            <Badge variant="outline" className="bg-background/50 border-primary/20 text-xs px-3 py-1.5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
              {job.type}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 p-6 pt-4 flex-1 flex flex-col justify-between">
          {/* Description */}
          <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-base group-hover/card:text-foreground/80 transition-colors duration-300 flex-shrink-0">
            {job.description}
          </p>
          
          {/* Enhanced Button - Fixed at bottom */}
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-auto"
            style={{ willChange: 'transform' }}
          >
            <Button
              asChild
              size="lg"
              className="w-full group/btn relative overflow-hidden bg-transparent border-2 border-primary/40 hover:border-primary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 h-12 rounded-xl backdrop-blur-sm hover:bg-primary/10"
            >
              <Link href={`/careers/${job.slug}`} className="relative z-10 flex items-center justify-center gap-3">
                <span className="relative">Explore Role</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{ willChange: 'transform' }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover/btn:border-primary/60 transition-all duration-500" />
                {/* Corner accent on hover */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover/btn:border-primary rounded-tl-xl transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover/btn:border-primary rounded-br-xl transition-all duration-500" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>
        
        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${job.color} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
      </Card>
    </motion.div>
  );
});

JobCard.displayName = 'JobCard';

// Memoized scope card component
const ScopeCard = memo(({ scope, index }: { scope: typeof scopes[0]; index: number }) => {
  const Icon = scope.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
      style={{ willChange: 'transform' }}
    >
      <Card className={`h-full border-2 ${scope.borderColor} bg-gradient-to-br ${scope.color} backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer`}>
        <CardHeader>
          <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{scope.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{scope.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ScopeCard.displayName = 'ScopeCard';

// Memoized benefit card component
const BenefitCard = memo(({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => {
  const Icon = benefit.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
      style={{ willChange: 'transform' }}
    >
      <Card className="h-full border-2 border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden relative">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-300`} />
        <CardHeader className="relative z-10">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`} style={{ willChange: 'transform' }}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <CardTitle className="text-xl">{benefit.title}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-muted-foreground">{benefit.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});

BenefitCard.displayName = 'BenefitCard';

// Memoized culture value card component
const CultureValueCard = memo(({ value, index }: { value: typeof cultureValues[0]; index: number }) => {
  const Icon = value.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group text-center"
      style={{ willChange: 'transform' }}
    >
      <Card className="h-full border-2 border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl transition-all duration-300 p-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300" style={{ willChange: 'transform' }}>
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
        <p className="text-muted-foreground text-sm">{value.description}</p>
      </Card>
    </motion.div>
  );
});

CultureValueCard.displayName = 'CultureValueCard';

export function CareersPageClient() {
  const [mounted, setMounted] = useState(false);
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize hover handlers
  const handleJobHoverStart = useCallback((jobId: string) => {
    setHoveredJob(jobId);
  }, []);

  const handleJobHoverEnd = useCallback(() => {
    setHoveredJob(null);
  }, []);

  // Memoize job cards data
  const jobCards = useMemo(() => jobs.map((job, index) => ({
    job,
    index,
    isHovered: hoveredJob === job.id,
    onHoverStart: () => handleJobHoverStart(job.id),
    onHoverEnd: handleJobHoverEnd
  })), [hoveredJob, handleJobHoverStart, handleJobHoverEnd]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Unique Particle Background */}
      <CareersParticlesBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <Badge className="mb-6 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                We're Hiring
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
            >
              Build Your Career
              <br />
              <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                With Us
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Join a team of innovators, creators, and problem-solvers. 
              Work on meaningful projects, grow your skills, and make an impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 pt-6"
            >
              <HeroButton href="#open-positions" variant="primary">
                Explore Open Positions
              </HeroButton>
              <HeroButton href="#culture" variant="secondary" icon={<Sparkles className="w-5 h-5" />}>
                Learn About Our Culture
              </HeroButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scopes Section */}
      <section id="scopes" className="relative py-20 px-4 z-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Endless <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what makes working here unique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopes.map((scope, index) => (
              <ScopeCard key={scope.title} scope={scope} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="relative py-24 px-4 z-10 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-cyan-500/5" />
        
        <div className="container mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                <Briefcase className="w-4 h-4 mr-2" />
                We're Hiring
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Open <span className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">Positions</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find your perfect role and start your journey with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <AnimatePresence mode="wait">
              {jobCards.map(({ job, index, isHovered, onHoverStart, onHoverEnd }) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  isHovered={isHovered}
                  onHoverStart={onHoverStart}
                  onHoverEnd={onHoverEnd}
                />
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-16"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 rounded-3xl blur-3xl" />
            <div className="absolute inset-0 border border-primary/10 rounded-3xl" />
            
            <div className="relative bg-gradient-to-br from-card/40 via-card/20 to-card/40 backdrop-blur-xl rounded-3xl p-12 border-2 border-primary/10 hover:border-primary/30 transition-all duration-500 overflow-hidden">
              {/* Animated gradient light background - Random pattern */}
              <motion.div
                animate={{
                  backgroundPosition: [
                    '0% 0%', 
                    '80% 60%', 
                    '40% 100%', 
                    '100% 20%', 
                    '20% 80%',
                    '0% 0%'
                  ],
                  opacity: [0.4, 0.7, 0.5, 0.6, 0.4, 0.4],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-cyan-500/30 via-primary/20 to-cyan-500/20 bg-[length:200%_200%] rounded-3xl"
                style={{ willChange: 'background-position, opacity' }}
              />
              
              {/* Secondary animated gradient light - Random pattern */}
              <motion.div
                animate={{
                  backgroundPosition: [
                    '100% 100%', 
                    '30% 40%', 
                    '70% 10%', 
                    '10% 90%',
                    '90% 70%',
                    '100% 100%'
                  ],
                  opacity: [0.3, 0.5, 0.4, 0.6, 0.3, 0.3],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: 2
                }}
                className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-primary/30 via-cyan-500/20 to-primary/20 bg-[length:200%_200%] rounded-3xl"
                style={{ willChange: 'background-position, opacity' }}
              />
              
              {/* Moving light orb effect - Random path 1 */}
              <motion.div
                animate={{
                  x: ['-20%', '120%', '60%', '10%', '-20%'],
                  y: ['-10%', '40%', '90%', '20%', '-10%'],
                  scale: [0.8, 1.2, 1.0, 1.1, 0.8],
                  opacity: [0.2, 0.4, 0.3, 0.35, 0.2],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.6, 0.9, 1]
                }}
                className="absolute w-96 h-96 rounded-full blur-3xl -z-0"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(34, 211, 238, 0.2), transparent)',
                  willChange: 'transform, opacity'
                }}
              />
              
              {/* Moving light orb effect - Random path 2 */}
              <motion.div
                animate={{
                  x: ['110%', '20%', '80%', '50%', '110%'],
                  y: ['110%', '30%', '70%', '10%', '110%'],
                  scale: [1.0, 0.9, 1.3, 0.8, 1.0],
                  opacity: [0.25, 0.35, 0.4, 0.3, 0.25],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: 3
                }}
                className="absolute w-80 h-80 rounded-full blur-3xl -z-0"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3), rgba(59, 130, 246, 0.2), transparent)',
                  willChange: 'transform, opacity'
                }}
              />
              
              {/* Additional random light orb - Path 3 */}
              <motion.div
                animate={{
                  x: ['50%', '90%', '30%', '70%', '10%', '50%'],
                  y: ['50%', '20%', '80%', '40%', '60%', '50%'],
                  scale: [0.7, 1.1, 0.9, 1.2, 0.8, 0.7],
                  opacity: [0.15, 0.3, 0.25, 0.35, 0.2, 0.15],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  delay: 1.5
                }}
                className="absolute w-72 h-72 rounded-full blur-3xl -z-0"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25), rgba(34, 211, 238, 0.15), transparent)',
                  willChange: 'transform, opacity'
                }}
              />
              
              {/* Small random light orb - Path 4 */}
              <motion.div
                animate={{
                  x: ['30%', '70%', '20%', '80%', '40%', '30%'],
                  y: ['20%', '60%', '80%', '30%', '70%', '20%'],
                  scale: [0.6, 1.0, 0.8, 1.1, 0.7, 0.6],
                  opacity: [0.2, 0.3, 0.25, 0.35, 0.2, 0.2],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: 4
                }}
                className="absolute w-64 h-64 rounded-full blur-3xl -z-0"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25), rgba(59, 130, 246, 0.15), transparent)',
                  willChange: 'transform, opacity'
                }}
              />
              <div className="text-center space-y-6 relative z-10">
                {/* Animated text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl md:text-2xl font-medium text-foreground"
                >
                  Don't see a role that fits?{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                    We're always looking for great talent.
                  </span>
                </motion.p>
                
                {/* Completely Redesigned Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-transparent border-2 border-primary/50 hover:border-primary text-white font-bold px-10 py-7 text-lg shadow-2xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-500 rounded-2xl backdrop-blur-md hover:bg-primary/10"
                  >
                    <Link href="/contact" className="relative z-10 flex items-center gap-3">
                      <span className="relative font-bold tracking-wide">Get in Touch</span>
                      <motion.div
                        whileHover={{ x: 6, rotate: -45 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="relative"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                      {/* Animated corner borders */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/0 group-hover:border-primary rounded-tl-2xl transition-all duration-500" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/0 group-hover:border-primary rounded-tr-2xl transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/0 group-hover:border-primary rounded-bl-2xl transition-all duration-500" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/0 group-hover:border-primary rounded-br-2xl transition-all duration-500" />
                      {/* Pulsing glow effect */}
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl -z-10"
                      style={{ willChange: 'opacity' }}
                    />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
              <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-cyan-500/40 animate-pulse animation-delay-400" />
              <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse animation-delay-800" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-20 px-4 z-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Benefits & <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Perks</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We take care of our team with comprehensive benefits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="relative py-20 px-4 z-10 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Culture</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The values that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, index) => (
              <CultureValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section id="process" className="relative py-24 px-4 z-10 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-cyan-500/5" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block" />
        
        <div className="container mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Process
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Hiring <span className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">Process</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Simple, transparent, and designed to find the best fit for both you and us
            </p>
          </motion.div>

          {/* Desktop: Horizontal Timeline Layout */}
          <div className="hidden lg:block relative">
            {/* Process Steps */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="relative group flex flex-col"
                    style={{ willChange: 'transform' }}
                  >
                    {/* Main Card - Fixed Height */}
                    <div className="relative mt-8 flex-1 flex flex-col">
                      <div 
                        className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundColor: step.glowColor }}
                      />
                      <Card className="relative h-full min-h-[320px] flex flex-col border-2 border-primary/20 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl hover:border-primary/60 hover:shadow-2xl transition-all duration-500 text-center p-8 group/card overflow-visible">
                        {/* Animated background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`} />
                        
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />

                        {/* Step Number Badge - Positioned at top right corner - Smaller on mobile */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.15 + 0.3, type: "spring" }}
                          whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
                          className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/50 z-30 transition-all duration-300 border border-background md:border-2 md:border-background cursor-pointer group/number"
                          style={{ willChange: 'transform' }}
                        >
                          <span className="text-white font-bold text-xs md:text-sm group-hover/number:scale-110 transition-transform duration-300">{step.step}</span>
                        </motion.div>

                        <div className="relative z-10 pt-6 flex flex-col flex-1">
                          {/* Icon Container */}
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-500 relative overflow-hidden flex-shrink-0`}
                            style={{ willChange: 'transform' }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ willChange: 'transform' }} />
                            <Icon className="w-12 h-12 text-white relative z-10 stroke-2" />
                          </motion.div>

                          {/* Content - Flex grow to fill space */}
                          <div className="flex flex-col flex-1 justify-center">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-cyan-500 transition-all duration-300 pr-10 md:pr-0">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-base">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Hover glow effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-br ${step.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Timeline Layout */}
          <div className="lg:hidden space-y-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-primary/20" />
                  )}
                  
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Card - Fixed height for mobile too */}
                    <Card className="flex-1 min-h-[140px] border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-center relative">
                      {/* Step Number Badge - Top right corner for mobile - Smaller */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
                        className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/50 z-30 transition-all duration-300 border border-background cursor-pointer group/number"
                      >
                        <span className="text-white font-bold text-xs group-hover/number:scale-110 transition-transform duration-300">{step.step}</span>
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 pr-8 md:pr-0">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 z-10 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Join Us?
            </h2>
            <p className="text-xl text-muted-foreground">
              Take the next step in your career and become part of something amazing
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <HeroButton href="#open-positions" variant="primary">
                View Open Positions
              </HeroButton>
              <HeroButton href="/contact" variant="secondary">
                Contact Us
              </HeroButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

