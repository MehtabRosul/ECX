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
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import type { LibraryItem } from './library-page-client';
import { typeConfig } from './library-page-client';

interface LibraryItemCardProps {
  item: LibraryItem;
  index: number;
  featured?: boolean;
}

export const LibraryItemCard = memo(function LibraryItemCard({
  item,
  index,
  featured = false
}: LibraryItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const config = typeConfig[item.type];

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      // In production, this would trigger an actual download
      window.open(item.downloadUrl, '_blank');
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative h-full"
      style={{ willChange: 'transform' }}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-1 bg-gradient-to-br ${config.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10`}
        style={{ willChange: 'opacity' }}
      />

      {/* Main Card */}
      <Card
        className={`relative h-full min-h-[420px] border-2 ${featured ? config.borderColor : 'border-primary/10'} bg-gradient-to-br from-card/90 via-card/70 to-card/90 backdrop-blur-xl hover:border-primary/40 hover:shadow-2xl transition-all duration-500 overflow-hidden group/card flex flex-col ${
          featured ? 'ring-2 ring-primary/20' : ''
        }`}
      >
        {/* Animated gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover/card:opacity-5 transition-opacity duration-500`}
        />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-20">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold shadow-lg flex items-center gap-1"
            >
              <Star className="w-3 h-3 fill-white" />
              Featured
            </motion.div>
          </div>
        )}

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/10 rounded-tl-3xl group-hover/card:border-primary/30 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/10 rounded-br-3xl group-hover/card:border-primary/30 transition-colors duration-500" />

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"
          style={{ willChange: 'transform' }}
        />

        <CardHeader className="relative z-10 p-6 pb-4 flex-shrink-0">
          {/* Type Badge */}
          <div className="flex items-center justify-between mb-4">
            <Badge
              className={`bg-gradient-to-r ${config.color} text-white border-0 px-3 py-1 text-xs font-semibold`}
            >
              {config.label}
            </Badge>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-3.5 h-3.5 fill-yellow-500" />
              <span className="text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight line-clamp-2 group-hover/card:text-primary transition-colors duration-300">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover/card:text-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 p-6 pt-4 flex-1 flex flex-col justify-between">
          {/* Tags */}
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
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 border-primary/20">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-2 mb-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>{item.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>{item.downloads.toLocaleString()}</span>
              </div>
              {item.views > 1000 && (
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Trending</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1"
              style={{ willChange: 'transform' }}
            >
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500`}
              >
                {isDownloading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </motion.div>
            {item.viewUrl && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ willChange: 'transform' }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                >
                  <Link href={item.viewUrl}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}
        />
      </Card>
    </motion.div>
  );
});

