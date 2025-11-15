'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download,
  Eye,
  Star,
  Calendar,
  User,
  Tag,
  ExternalLink,
  FileText,
  TrendingUp,
  ArrowRight,
  BookOpen,
  BookMarked,
  Briefcase,
  Newspaper,
  FileCode,
  Layers,
  GraduationCap,
  Award,
  Zap,
  Sparkles,
  Brain,
  Code,
  Shield,
  Rocket,
  ChevronRight,
  Clock,
  BookCheck,
  TrendingDown,
  Activity,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import type { LibraryItem, LibraryItemType } from './library-page-client';

interface AllSectionCardProps {
  item: LibraryItem;
  index: number;
}

// Unified Classic Hover Effect Component - Contained within card
const ClassicHoverEffect = memo(function ClassicHoverEffect({ 
  isHovered, 
  color 
}: { 
  isHovered: boolean; 
  color: string;
}) {
  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Subtle inner glow - contained within card */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.08 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`absolute inset-0 bg-gradient-to-br ${color} rounded-lg`}
      />
      
      {/* Elegant border glow - contained */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.25 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 rounded-lg`}
        style={{
          boxShadow: isHovered ? `inset 0 0 0 1px ${color.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : color.includes('purple') ? 'rgba(139, 92, 246, 0.3)' : color.includes('green') ? 'rgba(34, 197, 94, 0.3)' : color.includes('orange') ? 'rgba(249, 115, 22, 0.3)' : color.includes('indigo') ? 'rgba(99, 102, 241, 0.3)' : 'rgba(20, 184, 166, 0.3)'}` : 'none',
        }}
      />
      
      {/* Classic shine sweep - contained */}
      <motion.div
        animate={isHovered ? {
          x: ['-100%', '100%'],
        } : { x: '-100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent rounded-lg"
      />
    </div>
  );
});

// Research Paper - Minimalist Academic Card with Glassmorphism
const AllResearchPaperCard = memo(function AllResearchPaperCard({ item, index }: AllSectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative isolate"
      style={{ isolation: 'isolate' }}
    >
      <Card className="relative h-full border border-blue-500/20 bg-gradient-to-br from-card/40 via-card/20 to-card/40 backdrop-blur-2xl hover:border-blue-500/40 transition-all duration-300 overflow-hidden group/card isolate" style={{ isolation: 'isolate' }}>
        <ClassicHoverEffect isHovered={isHovered} color="from-blue-500/30 via-cyan-500/30 to-blue-500/30" />
        {/* Minimalist top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-50" />

        <CardHeader className="relative z-10 p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center"
              >
                <GraduationCap className="w-4 h-4 text-blue-400" />
              </motion.div>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs px-2 py-0.5">
                Research
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-yellow-500/80">
              <Star className="w-3.5 h-3.5 fill-yellow-500/50" />
              <span className="text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover/card:text-blue-400 transition-colors duration-300 mb-2">
            {item.title}
          </h3>

          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-5 pt-3 space-y-4">
          {/* Compact tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-blue-500/20 text-blue-400/70 bg-blue-500/5">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 2 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-500/20 text-blue-400/70 bg-blue-500/5">
                +{item.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* Minimalist metadata */}
          <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 pt-2 border-t border-blue-500/10">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>{item.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sleek action button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/30 hover:border-blue-500/50 text-blue-400 hover:text-blue-300 text-xs h-8 transition-all duration-300"
            >
              <Link href={item.viewUrl || '#'} className="flex items-center justify-center gap-2">
                <span>View Paper</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>

      </Card>
    </motion.div>
  );
});

// Case Study - Business Card Style with Data Visualization
const AllCaseStudyCard = memo(function AllCaseStudyCard({ item, index }: AllSectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative isolate"
      style={{ isolation: 'isolate' }}
    >
      <Card className="relative h-full border-l-4 border-l-purple-500/50 border-r border-t border-b border-purple-500/10 bg-gradient-to-br from-card/50 via-purple-500/5 to-card/50 backdrop-blur-xl hover:border-l-purple-500/70 transition-all duration-300 overflow-hidden group/card isolate" style={{ isolation: 'isolate' }}>
        <ClassicHoverEffect isHovered={isHovered} color="from-purple-500/30 via-pink-500/30 to-purple-500/30" />
        {/* Animated chart pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover/card:opacity-[0.06] transition-opacity duration-300">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polyline
              points="10,80 30,60 50,70 70,40 90,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <CardHeader className="relative z-10 p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center"
              >
                <BarChart3 className="w-4 h-4 text-purple-400" />
              </motion.div>
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs px-2 py-0.5">
                Case Study
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-green-500/80">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover/card:text-purple-400 transition-colors duration-300 mb-2">
            {item.title}
          </h3>

          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-5 pt-3 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-purple-500/20 text-purple-400/70 bg-purple-500/5">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 pt-2 border-t border-purple-500/10">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>{item.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 text-xs h-8 transition-all duration-300"
            >
              <Link href={item.viewUrl || '#'} className="flex items-center justify-center gap-2">
                <span>View Study</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>

      </Card>
    </motion.div>
  );
});

// Blog - Modern Magazine Style with Vibrant Accents
const AllBlogCard = memo(function AllBlogCard({ item, index }: AllSectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative isolate"
      style={{ isolation: 'isolate' }}
    >
      <Card className="relative h-full border-2 border-green-500/20 bg-gradient-to-br from-card/60 via-green-500/5 to-card/60 backdrop-blur-2xl hover:border-green-500/40 transition-all duration-300 overflow-hidden group/card rounded-2xl isolate" style={{ isolation: 'isolate' }}>
        <ClassicHoverEffect isHovered={isHovered} color="from-green-500/30 via-emerald-500/30 to-green-500/30" />
        {/* Top vibrant stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent opacity-50" />

        <CardHeader className="relative z-10 p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.5 }}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30 flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-green-400" />
              </motion.div>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs px-2 py-0.5 rounded-full">
                Blog
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-yellow-500/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover/card:text-green-400 transition-colors duration-300 mb-2">
            {item.title}
          </h3>

          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-5 pt-3 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-green-500/20 text-green-400/70 bg-green-500/5 rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 pt-2 border-t border-green-500/10">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              {item.views > 1000 && (
                <div className="flex items-center gap-1 text-orange-500">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-semibold">Hot</span>
                </div>
              )}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/30 hover:border-green-500/50 text-green-400 hover:text-green-300 text-xs h-8 transition-all duration-300 rounded-full"
            >
              <Link href={item.viewUrl || '#'} className="flex items-center justify-center gap-2">
                <span>Read More</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>

      </Card>
    </motion.div>
  );
});

// Article - Technical Code-Inspired Design
const AllArticleCard = memo(function AllArticleCard({ item, index }: AllSectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative isolate"
      style={{ isolation: 'isolate' }}
    >
      <Card className="relative h-full border border-orange-500/20 bg-gradient-to-br from-card/50 via-orange-500/5 to-card/50 backdrop-blur-2xl hover:border-orange-500/40 transition-all duration-300 overflow-hidden group/card isolate" style={{ isolation: 'isolate' }}>
        <ClassicHoverEffect isHovered={isHovered} color="from-orange-500/30 via-red-500/30 to-orange-500/30" />
        {/* Code bracket accent */}
        <div className="absolute top-2 left-2 text-orange-500/20 group-hover/card:text-orange-500/30 text-2xl font-mono transition-colors duration-300">
          {'{'}
        </div>
        <div className="absolute bottom-2 right-2 text-orange-500/20 group-hover/card:text-orange-500/30 text-2xl font-mono transition-colors duration-300">
          {'}'}
        </div>

        <CardHeader className="relative z-10 p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-9 h-9 rounded border-2 border-orange-500/30 bg-orange-500/10 flex items-center justify-center"
              >
                <Code className="w-4 h-4 text-orange-400" />
              </motion.div>
              <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs px-2 py-0.5 font-mono">
                Article
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-yellow-500/80">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover/card:text-orange-400 transition-colors duration-300 mb-2 font-mono">
            {item.title}
          </h3>

          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-5 pt-3 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-orange-500/20 text-orange-400/70 bg-orange-500/5 font-mono">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 pt-2 border-t border-orange-500/10">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-500">
                <FileCode className="w-3 h-3" />
                <span className="font-semibold">Code</span>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              asChild
              className="w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border border-orange-500/30 hover:border-orange-500/50 text-orange-400 hover:text-orange-300 text-xs h-8 transition-all duration-300"
            >
              <Link href={item.viewUrl || '#'} className="flex items-center justify-center gap-2">
                <span>Read Article</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>

      </Card>
    </motion.div>
  );
});

// Book - Elegant Literary Design with Page Turn Effect
const AllBookCard = memo(function AllBookCard({ item, index }: AllSectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative isolate"
      style={{ isolation: 'isolate' }}
    >
      <Card className="relative h-full border-l-[6px] border-l-indigo-500/50 border-r border-t border-b border-indigo-500/10 bg-gradient-to-br from-card/50 via-indigo-500/5 to-card/50 backdrop-blur-2xl hover:border-l-indigo-500/70 transition-all duration-300 overflow-hidden group/card isolate" style={{ isolation: 'isolate' }}>
        <ClassicHoverEffect isHovered={isHovered} color="from-indigo-500/30 via-purple-500/30 to-indigo-500/30" />
        {/* Book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 via-purple-500 to-indigo-600 opacity-60" />

        {/* Page lines pattern */}
        <div className="absolute inset-0 opacity-[0.02] group-hover/card:opacity-[0.04] transition-opacity duration-300">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-current"
              style={{ top: `${(i + 1) * 12}%` }}
            />
          ))}
        </div>

        <CardHeader className="relative z-10 p-5 pb-3 pl-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center"
              >
                <BookCheck className="w-4 h-4 text-indigo-400" />
              </motion.div>
              <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/30 text-xs px-2 py-0.5">
                Book
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-yellow-500/80">
              <Star className="w-3.5 h-3.5 fill-yellow-500/50" />
              <span className="text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover/card:text-indigo-400 transition-colors duration-300 mb-2">
            {item.title}
          </h3>

          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-5 pt-3 space-y-4 pl-6">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-indigo-500/20 text-indigo-400/70 bg-indigo-500/5">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 pt-2 border-t border-indigo-500/10">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <BookMarked className="w-3 h-3" />
                <span className="font-semibold">Guide</span>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              asChild
              className="w-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-400 hover:text-indigo-300 text-xs h-8 transition-all duration-300"
            >
              <Link href={item.viewUrl || '#'} className="flex items-center justify-center gap-2">
                <span>Read Book</span>
                <BookOpen className="w-3 h-3" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>

      </Card>
    </motion.div>
  );
});

// Industry Solution - Enterprise Grid Design
const AllIndustrySolutionCard = memo(function AllIndustrySolutionCard({ item, index }: AllSectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative isolate"
      style={{ isolation: 'isolate' }}
    >
      <Card className="relative h-full border-2 border-teal-500/20 bg-gradient-to-br from-card/50 via-teal-500/5 to-card/50 backdrop-blur-2xl hover:border-teal-500/40 transition-all duration-300 overflow-hidden group/card isolate" style={{ isolation: 'isolate' }}>
        <ClassicHoverEffect isHovered={isHovered} color="from-teal-500/30 via-cyan-500/30 to-teal-500/30" />
        {/* Enterprise grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] group-hover/card:opacity-[0.04] transition-opacity duration-300">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(currentColor 1px, transparent 1px),
              linear-gradient(90deg, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }} />
        </div>

        {/* Top enterprise bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent opacity-50" />

        <CardHeader className="relative z-10 p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 45 }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded border-2 border-teal-500/30 bg-teal-500/10 flex items-center justify-center"
              >
                <Layers className="w-4 h-4 text-teal-400" />
              </motion.div>
              <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/30 text-xs px-2 py-0.5">
                Solution
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-yellow-500/80">
              <Rocket className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover/card:text-teal-400 transition-colors duration-300 mb-2">
            {item.title}
          </h3>

          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-5 pt-3 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-teal-500/20 text-teal-400/70 bg-teal-500/5">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 pt-2 border-t border-teal-500/10">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{item.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <Shield className="w-3 h-3" />
                <span className="font-semibold">Enterprise</span>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              asChild
              className="w-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 border border-teal-500/30 hover:border-teal-500/50 text-teal-400 hover:text-teal-300 text-xs h-8 transition-all duration-300"
            >
              <Link href={item.viewUrl || '#'} className="flex items-center justify-center gap-2">
                <span>View Solution</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>

      </Card>
    </motion.div>
  );
});

// Export the appropriate card based on type
export function AllSectionCard({ item, index }: AllSectionCardProps) {
  switch (item.type) {
    case 'research-paper':
      return <AllResearchPaperCard item={item} index={index} />;
    case 'case-study':
      return <AllCaseStudyCard item={item} index={index} />;
    case 'blog':
      return <AllBlogCard item={item} index={index} />;
    case 'article':
      return <AllArticleCard item={item} index={index} />;
    case 'book':
      return <AllBookCard item={item} index={index} />;
    case 'industry-solution':
      return <AllIndustrySolutionCard item={item} index={index} />;
    default:
      return null;
  }
}

