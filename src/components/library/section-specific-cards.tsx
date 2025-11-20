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
  Database,
  Globe,
  Shield,
  Rocket
} from 'lucide-react';
import Link from 'next/link';
import type { LibraryItem, LibraryItemType } from './library-page-client';

interface SectionSpecificCardProps {
  item: LibraryItem;
  index: number;
  featured?: boolean;
}

// Research Paper Card - Academic & Premium Design
const ResearchPaperCard = memo(function ResearchPaperCard({ item, index, featured }: SectionSpecificCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Academic glow with multiple layers */}
      <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 -z-10" />
      <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />

      <Card className="relative h-full min-h-[400px] sm:min-h-[400px] sm:min-h-[480px] border-2 border-blue-500/30 bg-gradient-to-br from-card/95 via-blue-500/5 to-card/95 backdrop-blur-xl hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-700 overflow-hidden group/card flex flex-col">
        {/* Academic pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] group-hover/card:opacity-[0.06] transition-opacity duration-500">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)`,
          }} />
        </div>

        {/* Research paper header with academic styling */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-60" />
        
        {/* Decorative corner elements - academic style */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-[4px] border-l-[4px] border-blue-500/40 rounded-tl-3xl group-hover/card:border-blue-500/80 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[4px] border-r-[4px] border-blue-500/40 rounded-br-3xl group-hover/card:border-blue-500/80 transition-colors duration-500" />

        {/* Shimmer effect */}
        <motion.div
          animate={isHovered ? { x: ['-200%', '200%'] } : { x: '-200%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"
        />

        <CardHeader className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0">
          {/* Academic badge with graduation cap */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold">
                Research Paper
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs sm:text-sm font-bold text-foreground">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title with academic styling */}
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-foreground leading-tight line-clamp-2 group-hover/card:text-blue-600 transition-colors duration-300">
            {item.title}
          </h3>

          {/* Abstract/Description */}
          <div className="relative">
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3 group-hover/card:text-foreground/80 transition-colors duration-300">
              {item.description}
            </p>
            {/* Academic quote marks effect */}
            <div className="absolute -top-2 -left-2 text-blue-500/20 text-2xl sm:text-4xl font-serif hidden sm:block">"</div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 p-4 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
          {/* Research tags with academic styling */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300">
                  <Brain className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Academic metadata */}
          <div className="space-y-2.5 mb-6 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{item.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-blue-500/10">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-cyan-500" />
                <span className="font-semibold">{item.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-500">
                <Award className="w-4 h-4" />
                <span className="font-semibold">Peer Reviewed</span>
              </div>
            </div>
          </div>

          {/* Action buttons with academic styling */}
          <div className="flex gap-2 mt-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-500"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </motion.div>
            {item.viewUrl && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="border-2 border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/5">
                  <Link href={item.viewUrl}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Bottom accent with academic ribbon effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
});

// Case Study Card - Professional Business Design
const CaseStudyCard = memo(function CaseStudyCard({ item, index, featured }: SectionSpecificCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Professional business glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 -z-10" />

      <Card className="relative h-full min-h-[400px] sm:min-h-[480px] border-2 border-purple-500/30 bg-gradient-to-br from-card/95 via-purple-500/5 to-card/95 backdrop-blur-xl hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 overflow-hidden group/card flex flex-col">
        {/* Business chart pattern */}
        <div className="absolute inset-0 opacity-[0.02] group-hover/card:opacity-[0.05] transition-opacity duration-500">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 L20,60 L40,70 L60,40 L80,50 L100,30" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M0,70 L20,50 L40,60 L60,30 L80,40 L100,20" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        {/* Professional header bar */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />
        
        {/* Corner accents - business style */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-[3px] border-l-[3px] border-purple-500/40 rounded-tl-3xl group-hover/card:border-purple-500/80 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[3px] border-r-[3px] border-purple-500/40 rounded-br-3xl group-hover/card:border-purple-500/80 transition-colors duration-500" />

        {/* Business card shimmer */}
        <motion.div
          animate={isHovered ? { x: ['-200%', '200%'] } : { x: '-200%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"
        />

        <CardHeader className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0">
          {/* Business badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 px-3 py-1 text-xs font-semibold">
                Case Study
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold text-foreground">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight line-clamp-2 group-hover/card:text-purple-600 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover/card:text-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-4 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
          {/* Business tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10 transition-all duration-300">
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Business metrics */}
          <div className="space-y-2.5 mb-6 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-purple-500" />
              <span className="font-medium">{item.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-purple-500/10">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-500" />
                <span className="font-semibold">{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-pink-500" />
                <span className="font-semibold">{item.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-green-500">
                <Zap className="w-4 h-4" />
                <span className="font-semibold">Success Story</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-500">
                <Download className="w-4 h-4 mr-2" />
                Download Case Study
              </Button>
            </motion.div>
            {item.viewUrl && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="border-2 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5">
                  <Link href={item.viewUrl}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
});

// Blog Card - Modern & Engaging Design
const BlogCard = memo(function BlogCard({ item, index, featured }: SectionSpecificCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Vibrant blog glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 -z-10" />

      <Card className="relative h-full min-h-[400px] sm:min-h-[480px] border-2 border-green-500/30 bg-gradient-to-br from-card/95 via-green-500/5 to-card/95 backdrop-blur-xl hover:border-green-500/60 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-700 overflow-hidden group/card flex flex-col">
        {/* Blog pattern - modern dots */}
        <div className="absolute inset-0 opacity-[0.03] group-hover/card:opacity-[0.06] transition-opacity duration-500">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />
        </div>

        {/* Blog header with vibrant accent */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500" />
        
        {/* Rounded corners - modern style */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-green-500/40 rounded-tl-3xl group-hover/card:border-green-500/80 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-green-500/40 rounded-br-3xl group-hover/card:border-green-500/80 transition-colors duration-500" />

        {/* Blog shimmer */}
        <motion.div
          animate={isHovered ? { x: ['-200%', '200%'] } : { x: '-200%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"
        />

        <CardHeader className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0">
          {/* Blog badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1 text-xs font-semibold">
                Blog Post
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-foreground">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight line-clamp-2 group-hover/card:text-green-600 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover/card:text-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-4 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
          {/* Blog tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1, rotate: -2 }}
              >
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-green-500/30 hover:border-green-500/60 hover:bg-green-500/10 transition-all duration-300 rounded-full">
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Blog metadata */}
          <div className="space-y-2.5 mb-6 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-green-500" />
              <span className="font-medium">{item.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-green-500" />
              <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-green-500/10">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-green-500" />
                <span className="font-semibold">{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold">{item.downloads.toLocaleString()}</span>
              </div>
              {item.views > 1000 && (
                <div className="flex items-center gap-1.5 text-orange-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">Trending</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 hover:from-green-600 hover:via-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-500">
                <Download className="w-4 h-4 mr-2" />
                Download Article
              </Button>
            </motion.div>
            {item.viewUrl && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="border-2 border-green-500/30 hover:border-green-500/50 hover:bg-green-500/5">
                  <Link href={item.viewUrl}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
});

// Article Card - Technical & Code-Focused Design
const ArticleCard = memo(function ArticleCard({ item, index, featured }: SectionSpecificCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Technical glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 -z-10" />

      <Card className="relative h-full min-h-[400px] sm:min-h-[480px] border-2 border-orange-500/30 bg-gradient-to-br from-card/95 via-orange-500/5 to-card/95 backdrop-blur-xl hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-700 overflow-hidden group/card flex flex-col">
        {/* Code pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] group-hover/card:opacity-[0.05] transition-opacity duration-500 font-mono text-xs">
          <div className="absolute top-4 left-4">const</div>
          <div className="absolute top-8 left-4">function</div>
          <div className="absolute top-12 left-4">{'{'}</div>
          <div className="absolute top-16 left-8">return</div>
          <div className="absolute top-20 left-4">{'}'}</div>
        </div>

        {/* Technical header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600" />
        
        {/* Sharp corners - technical style */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-[3px] border-l-[3px] border-orange-500/40 rounded-tl-3xl group-hover/card:border-orange-500/80 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[3px] border-r-[3px] border-orange-500/40 rounded-br-3xl group-hover/card:border-orange-500/80 transition-colors duration-500" />

        {/* Code shimmer */}
        <motion.div
          animate={isHovered ? { x: ['-200%', '200%'] } : { x: '-200%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"
        />

        <CardHeader className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0">
          {/* Technical badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-red-500 flex items-center justify-center shadow-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-orange-600 to-red-500 text-white border-0 px-3 py-1 text-xs font-semibold">
                Technical Article
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-foreground">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight line-clamp-2 group-hover/card:text-orange-600 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover/card:text-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-4 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
          {/* Technical tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/10 transition-all duration-300 font-mono">
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Technical metadata */}
          <div className="space-y-2.5 mb-6 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{item.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-orange-500/10">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-orange-500" />
                <span className="font-semibold">{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-red-500" />
                <span className="font-semibold">{item.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-500">
                <FileCode className="w-4 h-4" />
                <span className="font-semibold">Code Included</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 hover:from-orange-700 hover:via-red-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-500">
                <Download className="w-4 h-4 mr-2" />
                Download Article
              </Button>
            </motion.div>
            {item.viewUrl && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="border-2 border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/5">
                  <Link href={item.viewUrl}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
});

// Book Card - Elegant & Literary Design
const BookCard = memo(function BookCard({ item, index, featured }: SectionSpecificCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Elegant book glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-indigo-600 via-purple-500 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 -z-10" />

      <Card className="relative h-full min-h-[400px] sm:min-h-[480px] border-2 border-indigo-500/30 bg-gradient-to-br from-card/95 via-indigo-500/5 to-card/95 backdrop-blur-xl hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-700 overflow-hidden group/card flex flex-col">
        {/* Book pages pattern */}
        <div className="absolute inset-0 opacity-[0.02] group-hover/card:opacity-[0.05] transition-opacity duration-500">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
          }} />
        </div>

        {/* Elegant book spine effect */}
        <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-indigo-600 via-purple-500 to-indigo-600 opacity-60" />
        <div className="absolute top-0 right-0 h-2 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />
        
        {/* Rounded elegant corners */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-[3px] border-l-[3px] border-indigo-500/40 rounded-tl-3xl group-hover/card:border-indigo-500/80 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[3px] border-r-[3px] border-indigo-500/40 rounded-br-3xl group-hover/card:border-indigo-500/80 transition-colors duration-500" />

        {/* Book shimmer */}
        <motion.div
          animate={isHovered ? { x: ['-200%', '200%'] } : { x: '-200%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"
        />

        <CardHeader className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0 pl-6 sm:pl-10">
          {/* Book badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white border-0 px-3 py-1 text-xs font-semibold">
                Book
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold text-foreground">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight line-clamp-2 group-hover/card:text-indigo-600 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover/card:text-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-4 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
          {/* Book tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/10 transition-all duration-300">
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Book metadata */}
          <div className="space-y-2.5 mb-6 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-indigo-500" />
              <span className="font-medium">{item.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-indigo-500/10">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold">{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-purple-500" />
                <span className="font-semibold">{item.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-500">
                <BookMarked className="w-4 h-4" />
                <span className="font-semibold">Full Guide</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 hover:from-indigo-700 hover:via-purple-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-500">
                <Download className="w-4 h-4 mr-2" />
                Download Book
              </Button>
            </motion.div>
            {item.viewUrl && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="border-2 border-indigo-500/30 hover:border-indigo-500/50 hover:bg-indigo-500/5">
                  <Link href={item.viewUrl}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
});

// Industry Solution Card - Enterprise & Professional Design
const IndustrySolutionCard = memo(function IndustrySolutionCard({ item, index, featured }: SectionSpecificCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Enterprise glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 -z-10" />

      <Card className="relative h-full min-h-[400px] sm:min-h-[480px] border-2 border-teal-500/30 bg-gradient-to-br from-card/95 via-teal-500/5 to-card/95 backdrop-blur-xl hover:border-teal-500/60 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-700 overflow-hidden group/card flex flex-col">
        {/* Enterprise grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] group-hover/card:opacity-[0.05] transition-opacity duration-500">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(currentColor 1px, transparent 1px),
              linear-gradient(90deg, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }} />
        </div>

        {/* Enterprise header */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600" />
        
        {/* Professional corners */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-[3px] border-l-[3px] border-teal-500/40 rounded-tl-3xl group-hover/card:border-teal-500/80 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[3px] border-r-[3px] border-teal-500/40 rounded-br-3xl group-hover/card:border-teal-500/80 transition-colors duration-500" />

        {/* Enterprise shimmer */}
        <motion.div
          animate={isHovered ? { x: ['-200%', '200%'] } : { x: '-200%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"
        />

        <CardHeader className="relative z-10 p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0">
          {/* Enterprise badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center shadow-lg">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white border-0 px-3 py-1 text-xs font-semibold">
                Industry Solution
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Rocket className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-foreground">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight line-clamp-2 group-hover/card:text-teal-600 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover/card:text-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-4 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
          {/* Solution tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-teal-500/30 hover:border-teal-500/60 hover:bg-teal-500/10 transition-all duration-300">
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Enterprise metadata */}
          <div className="space-y-2.5 mb-6 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-teal-500" />
              <span className="font-medium">{item.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-teal-500" />
              <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-teal-500/10">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-teal-500" />
                <span className="font-semibold">{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-cyan-500" />
                <span className="font-semibold">{item.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-green-500">
                <Shield className="w-4 h-4" />
                <span className="font-semibold">Enterprise Ready</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600 hover:from-teal-700 hover:via-cyan-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-500">
                <Download className="w-4 h-4 mr-2" />
                Download Solution
              </Button>
            </motion.div>
            {item.viewUrl && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" className="border-2 border-teal-500/30 hover:border-teal-500/50 hover:bg-teal-500/5">
                  <Link href={item.viewUrl}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
});

// Export the appropriate card based on type
export function SectionSpecificCard({ item, index, featured }: SectionSpecificCardProps) {
  switch (item.type) {
    case 'research-paper':
      return <ResearchPaperCard item={item} index={index} featured={featured} />;
    case 'case-study':
      return <CaseStudyCard item={item} index={index} featured={featured} />;
    case 'blog':
      return <BlogCard item={item} index={index} featured={featured} />;
    case 'article':
      return <ArticleCard item={item} index={index} featured={featured} />;
    case 'book':
      return <BookCard item={item} index={index} featured={featured} />;
    case 'industry-solution':
      return <IndustrySolutionCard item={item} index={index} featured={featured} />;
    default:
      return null;
  }
}

