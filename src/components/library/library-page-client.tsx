'use client';



import { useState, useEffect, useMemo, useCallback, memo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { LibraryParticlesBackground } from './library-particles-background';

import { useIsMobile } from '@/hooks/use-mobile';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { 

  Search, 

  Filter, 

  Download, 

  FileText, 

  BookOpen, 

  FileCode, 

  Newspaper,

  BookMarked,

  Briefcase,

  Sparkles,

  ArrowRight,

  X,

  Calendar,

  User,

  Tag,

  ExternalLink,

  ChevronDown,

  ChevronUp,

  Send,

  Star,

  Eye,

  TrendingUp,

  Layers,

  Zap

} from 'lucide-react';

import { AdvancedSearchBar } from './advanced-search-bar';

import { SectionSpecificCard } from './section-specific-cards';

import { AllSectionCard } from './all-section-cards';

import { ContributionCard } from './contribution-card';

import { LibraryPromotionalBanner } from './library-promotional-banner';



// Library item types

export type LibraryItemType = 'research-paper' | 'case-study' | 'blog' | 'article' | 'book' | 'industry-solution';



export interface LibraryItem {

  id: string;

  title: string;

  description: string;

  type: LibraryItemType;

  category: string;

  tags: string[];

  author: string;

  date: string;

  downloadUrl: string;

  viewUrl?: string;

  thumbnail?: string;

  views: number;

  downloads: number;

  rating: number;

  featured?: boolean;

}



// Sample data - in production, this would come from an API

const libraryItems: LibraryItem[] = [

  {

    id: '1',

    title: 'Advanced Machine Learning in Cybersecurity: A Comprehensive Analysis',

    description: 'An in-depth research paper exploring the intersection of ML and cybersecurity, covering threat detection, anomaly detection, and predictive security models.',

    type: 'research-paper',

    category: 'AI/ML',

    tags: ['Machine Learning', 'Cybersecurity', 'Threat Detection', 'AI'],

    author: 'Dr. Sarah Chen',

    date: '2024-01-15',

    downloadUrl: '/downloads/research-paper-1.pdf',

    viewUrl: '/library/research-paper-1',

    views: 1240,

    downloads: 856,

    rating: 4.8,

    featured: true

  },

  {

    id: '2',

    title: 'Enterprise Cloud Migration: A Case Study of Digital Transformation',

    description: 'A detailed case study documenting the successful cloud migration journey of a Fortune 500 company, including challenges, solutions, and outcomes.',

    type: 'case-study',

    category: 'Cloud Infrastructure',

    tags: ['Cloud Migration', 'Digital Transformation', 'Enterprise'],

    author: 'Michael Rodriguez',

    date: '2024-02-20',

    downloadUrl: '/downloads/case-study-1.pdf',

    viewUrl: '/library/case-study-1',

    views: 980,

    downloads: 642,

    rating: 4.7,

    featured: true

  },

  {

    id: '3',

    title: 'The Future of Quantum Computing in Business Applications',

    description: 'Exploring how quantum computing will revolutionize business processes, from optimization problems to cryptography and beyond.',

    type: 'blog',

    category: 'Technology',

    tags: ['Quantum Computing', 'Future Tech', 'Innovation'],

    author: 'Dr. James Wilson',

    date: '2024-03-10',

    downloadUrl: '/downloads/blog-1.pdf',

    viewUrl: '/library/blog-1',

    views: 2150,

    downloads: 1200,

    rating: 4.9,

    featured: true

  },

  {

    id: '4',

    title: 'Building Scalable Microservices Architecture',

    description: 'A comprehensive guide to designing and implementing microservices that scale, with real-world examples and best practices.',

    type: 'article',

    category: 'Software Architecture',

    tags: ['Microservices', 'Scalability', 'Architecture'],

    author: 'Emily Thompson',

    date: '2024-03-25',

    downloadUrl: '/downloads/article-1.pdf',

    viewUrl: '/library/article-1',

    views: 1890,

    downloads: 1100,

    rating: 4.6,

    featured: false

  },

  {

    id: '5',

    title: 'The Complete Guide to Modern Web Development',

    description: 'A comprehensive book covering everything from HTML5 and CSS3 to modern JavaScript frameworks and deployment strategies.',

    type: 'book',

    category: 'Web Development',

    tags: ['Web Development', 'JavaScript', 'Full Stack'],

    author: 'Alex Kumar',

    date: '2024-01-05',

    downloadUrl: '/downloads/book-1.pdf',

    viewUrl: '/library/book-1',

    views: 3200,

    downloads: 2100,

    rating: 4.8,

    featured: true

  },

  {

    id: '6',

    title: 'AI-Powered Customer Service Solution',

    description: 'An industry solution showcasing how AI can transform customer service operations, reducing response times and improving satisfaction.',

    type: 'industry-solution',

    category: 'AI Solutions',

    tags: ['AI', 'Customer Service', 'Automation'],

    author: 'Tech Solutions Team',

    date: '2024-02-28',

    downloadUrl: '/downloads/solution-1.pdf',

    viewUrl: '/library/solution-1',

    views: 1450,

    downloads: 890,

    rating: 4.7,

    featured: false

  },

  // Add more items for each category

  ...Array.from({ length: 12 }, (_, i) => ({

    id: `${i + 7}`,

    title: `Research Paper ${i + 7}: Advanced Topics in ${['Neural Networks', 'Blockchain', 'IoT Security', 'Data Analytics'][i % 4]}`,

    description: `A detailed research paper exploring advanced concepts and applications in modern technology.`,

    type: ['research-paper', 'case-study', 'blog', 'article'][i % 4] as LibraryItemType,

    category: ['AI/ML', 'Blockchain', 'Security', 'Data Science'][i % 4],

    tags: ['Research', 'Technology', 'Innovation'],

    author: `Author ${i + 7}`,

    date: `2024-${String(Math.floor(i / 4) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,

    downloadUrl: `/downloads/item-${i + 7}.pdf`,

    viewUrl: `/library/item-${i + 7}`,

    views: Math.floor(Math.random() * 2000) + 500,

    downloads: Math.floor(Math.random() * 1500) + 300,

    rating: Math.random() * 1 + 4,

    featured: i % 3 === 0

  }))

];



export const typeConfig = {

  'research-paper': {

    label: 'Research Papers',

    icon: FileText,

    color: 'from-blue-500 to-cyan-500',

    bgColor: 'from-blue-500/10 to-cyan-500/10',

    borderColor: 'border-blue-500/30'

  },

  'case-study': {

    label: 'Case Studies',

    icon: Briefcase,

    color: 'from-purple-500 to-pink-500',

    bgColor: 'from-purple-500/10 to-pink-500/10',

    borderColor: 'border-purple-500/30'

  },

  'blog': {

    label: 'Blogs',

    icon: Newspaper,

    color: 'from-green-500 to-emerald-500',

    bgColor: 'from-green-500/10 to-emerald-500/10',

    borderColor: 'border-green-500/30'

  },

  'article': {

    label: 'Articles',

    icon: FileCode,

    color: 'from-orange-500 to-red-500',

    bgColor: 'from-orange-500/10 to-red-500/10',

    borderColor: 'border-orange-500/30'

  },

  'book': {

    label: 'Books',

    icon: BookOpen,

    color: 'from-indigo-500 to-purple-500',

    bgColor: 'from-indigo-500/10 to-purple-500/10',

    borderColor: 'border-indigo-500/30'

  },

  'industry-solution': {

    label: 'Industry Solutions',

    icon: Layers,

    color: 'from-teal-500 to-cyan-500',

    bgColor: 'from-teal-500/10 to-cyan-500/10',

    borderColor: 'border-teal-500/30'

  }

};



export function LibraryPageClient() {

  const [mounted, setMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedTypes, setSelectedTypes] = useState<LibraryItemType[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [showFilters, setShowFilters] = useState(false);

  const [activeSection, setActiveSection] = useState<LibraryItemType | 'all'>('all');

  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating' | 'downloads'>('recent');

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isMobile = useIsMobile();



  useEffect(() => {

    setMounted(true);

  }, []);



  // Get all unique categories and tags

  const allCategories = useMemo(() => {

    const categories = new Set<string>();

    libraryItems.forEach(item => categories.add(item.category));

    return Array.from(categories).sort();

  }, []);



  const allTags = useMemo(() => {

    const tags = new Set<string>();

    libraryItems.forEach(item => item.tags.forEach(tag => tags.add(tag)));

    return Array.from(tags).sort();

  }, []);



  // Filter and sort items

  const filteredItems = useMemo(() => {

    let filtered = libraryItems;



    // Filter by active section

    if (activeSection !== 'all') {

      filtered = filtered.filter(item => item.type === activeSection);

    }



    // Filter by search query

    if (searchQuery) {

      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(item =>

        item.title.toLowerCase().includes(query) ||

        item.description.toLowerCase().includes(query) ||

        item.author.toLowerCase().includes(query) ||

        item.tags.some(tag => tag.toLowerCase().includes(query))

      );

    }



    // Filter by types

    if (selectedTypes.length > 0) {

      filtered = filtered.filter(item => selectedTypes.includes(item.type));

    }



    // Filter by categories

    if (selectedCategories.length > 0) {

      filtered = filtered.filter(item => selectedCategories.includes(item.category));

    }



    // Filter by tags

    if (selectedTags.length > 0) {

      filtered = filtered.filter(item =>

        selectedTags.some(tag => item.tags.includes(tag))

      );

    }



    // Sort

    filtered = [...filtered].sort((a, b) => {

      switch (sortBy) {

        case 'popular':

          return b.views - a.views;

        case 'rating':

          return b.rating - a.rating;

        case 'downloads':

          return b.downloads - a.downloads;

        case 'recent':

        default:

          return new Date(b.date).getTime() - new Date(a.date).getTime();

      }

    });



    return filtered;

  }, [searchQuery, selectedTypes, selectedCategories, selectedTags, activeSection, sortBy]);



  // Group items by type for section display

  const itemsByType = useMemo(() => {

    const grouped: Record<LibraryItemType, LibraryItem[]> = {

      'research-paper': [],

      'case-study': [],

      'blog': [],

      'article': [],

      'book': [],

      'industry-solution': []

    };



    filteredItems.forEach(item => {

      grouped[item.type].push(item);

    });



    return grouped;

  }, [filteredItems]);



  const toggleType = useCallback((type: LibraryItemType) => {

    setSelectedTypes(prev =>

      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]

    );

  }, []);



  const toggleCategory = useCallback((category: string) => {

    setSelectedCategories(prev =>

      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]

    );

  }, []);



  const toggleTag = useCallback((tag: string) => {

    setSelectedTags(prev =>

      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]

    );

  }, []);



  const clearFilters = useCallback(() => {

    setSelectedTypes([]);

    setSelectedCategories([]);

    setSelectedTags([]);

    setSearchQuery('');

  }, []);



  if (!mounted) return null;



  return (

    <div className="min-h-screen bg-background relative overflow-hidden">

      <LibraryParticlesBackground />



      {/* Hero Section */}

      <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20 z-10">

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

                Knowledge Hub

              </Badge>

            </motion.div>



            <motion.h1

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.8, delay: 0.3 }}

              className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"

            >

              Explore Our

              <br />

              <span className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-ecx-gradient">

                Digital Library

              </span>

            </motion.h1>



            <motion.p

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.8, delay: 0.4 }}

              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"

            >

              Discover research papers, case studies, articles, books, and industry solutions.

              <br />

              Download, learn, and contribute to our growing knowledge base.

            </motion.p>



            {/* Advanced Search Bar */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.8, delay: 0.5 }}

              className="max-w-4xl mx-auto mt-12"

            >

              <AdvancedSearchBar

                value={searchQuery}

                onChange={setSearchQuery}

                onFilterToggle={() => setShowFilters(!showFilters)}

                showFilters={showFilters}

                libraryItems={libraryItems}

                onFocusChange={setIsSearchFocused}

                onKeywordClick={(keyword) => {

                  // Smooth scroll to results after filtering

                  setTimeout(() => {

                    // Find the first matching result or the content sections area

                    const firstResult = document.querySelector('[data-library-item]');

                    const contentSection = document.querySelector('[data-content-sections]');

                    

                    const targetElement = firstResult || contentSection;

                    if (targetElement) {

                      const elementPosition = targetElement.getBoundingClientRect().top;

                      const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset from top

                      

                      window.scrollTo({

                        top: offsetPosition,

                        behavior: 'smooth'

                      });

                    }

                  }, 150);

                }}

              />

            </motion.div>

          </motion.div>

        </div>

      </section>



      {/* Filters Section */}

      <AnimatePresence>

        {showFilters && (

          <motion.section

            initial={{ opacity: 0, height: 0 }}

            animate={{ opacity: 1, height: 'auto' }}

            exit={{ opacity: 0, height: 0 }}

            transition={{ duration: 0.3 }}

            className="relative z-10 px-4 pb-8"

          >

            <div className="container mx-auto max-w-7xl">

              <Card className="border-2 border-primary/20 bg-card/80 backdrop-blur-xl">

                <CardHeader>

                  <div className="flex items-center justify-between">

                    <CardTitle className="flex items-center gap-2">

                      <Filter className="w-5 h-5" />

                      Filters

                    </CardTitle>

                    <div className="flex items-center gap-2">

                      {(selectedTypes.length > 0 || selectedCategories.length > 0 || selectedTags.length > 0) && (

                        <Button

                          variant="ghost"

                          size="sm"

                          onClick={clearFilters}

                          className="text-xs"

                        >

                          <X className="w-4 h-4 mr-1" />

                          Clear All

                        </Button>

                      )}

                      <Button

                        variant="ghost"

                        size="sm"

                        onClick={() => setShowFilters(false)}

                      >

                        <ChevronUp className="w-4 h-4" />

                      </Button>

                    </div>

                  </div>

                </CardHeader>

                <CardContent className="space-y-6">

                  {/* Type Filters */}

                  <div>

                    <h3 className="text-sm font-semibold mb-3">Content Type</h3>

                    <div className="flex flex-wrap gap-2">

                      {(Object.keys(typeConfig) as LibraryItemType[]).map(type => {

                        const config = typeConfig[type];

                        const Icon = config.icon;

                        const isSelected = selectedTypes.includes(type);

                        return (

                          <motion.button

                            key={type}

                            whileHover={{ scale: 1.05 }}

                            whileTap={{ scale: 0.95 }}

                            onClick={() => toggleType(type)}

                            className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 flex items-center gap-2 ${

                              isSelected

                                ? `${config.borderColor} bg-gradient-to-br ${config.bgColor} text-foreground`

                                : 'border-primary/10 hover:border-primary/30 bg-card/50'

                            }`}

                          >

                            <Icon className="w-4 h-4" />

                            <span className="text-sm">{config.label}</span>

                          </motion.button>

                        );

                      })}

                    </div>

                  </div>



                  {/* Category Filters */}

                  <div>

                    <h3 className="text-sm font-semibold mb-3">Categories</h3>

                    <div className="flex flex-wrap gap-2">

                      {allCategories.map(category => {

                        const isSelected = selectedCategories.includes(category);

                        return (

                          <motion.button

                            key={category}

                            whileHover={{ scale: 1.05 }}

                            whileTap={{ scale: 0.95 }}

                            onClick={() => toggleCategory(category)}

                            className={`px-3 py-1.5 rounded-lg border transition-all duration-300 text-sm ${

                              isSelected

                                ? 'border-primary bg-primary/10 text-primary'

                                : 'border-primary/20 hover:border-primary/40 bg-card/50'

                            }`}

                          >

                            {category}

                          </motion.button>

                        );

                      })}

                    </div>

                  </div>



                  {/* Tag Filters */}

                  <div>

                    <h3 className="text-sm font-semibold mb-3">Tags</h3>

                    <div className="flex flex-wrap gap-2">

                      {allTags.map(tag => {

                        const isSelected = selectedTags.includes(tag);

                        return (

                          <motion.button

                            key={tag}

                            whileHover={{ scale: 1.05 }}

                            whileTap={{ scale: 0.95 }}

                            onClick={() => toggleTag(tag)}

                            className={`px-3 py-1 rounded-full border transition-all duration-300 text-xs flex items-center gap-1 ${

                              isSelected

                                ? 'border-primary bg-primary/10 text-primary'

                                : 'border-primary/20 hover:border-primary/40 bg-card/50'

                            }`}

                          >

                            <Tag className="w-3 h-3" />

                            {tag}

                          </motion.button>

                        );

                      })}

                    </div>

                  </div>



                  {/* Sort Options */}

                  <div>

                    <h3 className="text-sm font-semibold mb-3">Sort By</h3>

                    <div className="flex flex-wrap gap-2">

                      {(['recent', 'popular', 'rating', 'downloads'] as const).map(option => (

                        <motion.button

                          key={option}

                          whileHover={{ scale: 1.05 }}

                          whileTap={{ scale: 0.95 }}

                          onClick={() => setSortBy(option)}

                          className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 text-sm capitalize ${

                            sortBy === option

                              ? 'border-primary bg-primary/10 text-primary'

                              : 'border-primary/10 hover:border-primary/30 bg-card/50'

                          }`}

                        >

                          {option}

                        </motion.button>

                      ))}

                    </div>

                  </div>

                </CardContent>

              </Card>

            </div>

          </motion.section>

        )}

      </AnimatePresence>



      {/* Section Navigation */}

      <section className={`relative z-10 px-4 py-8 transition-all duration-300 ${
        isMobile && isSearchFocused && !searchQuery ? 'mt-44 md:mt-8' : ''
      }`}>

        <div className="container mx-auto max-w-7xl">

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">

            <motion.button

              whileHover={{ scale: 1.05, y: -2 }}

              whileTap={{ scale: 0.95 }}

              onClick={() => setActiveSection('all')}

              className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 ${

                activeSection === 'all'

                  ? 'border-primary bg-gradient-to-r from-primary/20 to-cyan-500/20 text-primary shadow-lg shadow-primary/20'

                  : 'border-primary/20 hover:border-primary/40 bg-card/50'

              }`}

            >

              All Content

            </motion.button>

            {(Object.keys(typeConfig) as LibraryItemType[]).map(type => {

              const config = typeConfig[type];

              const Icon = config.icon;

              const isActive = activeSection === type;

              return (

                <motion.button

                  key={type}

                  whileHover={{ scale: 1.05, y: -2 }}

                  whileTap={{ scale: 0.95 }}

                  onClick={() => setActiveSection(type)}

                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center gap-2 ${

                    isActive

                      ? `${config.borderColor} bg-gradient-to-br ${config.bgColor} text-foreground shadow-lg`

                      : 'border-primary/20 hover:border-primary/40 bg-card/50'

                  }`}

                >

                  <Icon className="w-5 h-5" />

                  <span>{config.label}</span>

                </motion.button>

              );

            })}

          </div>

        </div>

      </section>



      {/* Content Sections */}

      <div className="relative z-10 px-4 pb-20" data-content-sections>

        <div className="container mx-auto max-w-7xl space-y-24">

          {(activeSection === 'all'

            ? (Object.keys(typeConfig) as LibraryItemType[])

            : [activeSection]

          ).map(type => {

            const config = typeConfig[type];

            const Icon = config.icon;

            const items = itemsByType[type];

            const featuredItems = items.filter(item => item.featured);

            const regularItems = items.filter(item => !item.featured);



            if (items.length === 0) return null;



            return (

              <motion.section

                key={type}

                id={type}

                initial={{ opacity: 0, y: 50 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, margin: '-100px' }}

                transition={{ duration: 0.8 }}

                className="space-y-8"

              >

                {/* Premium Section Header */}

                <motion.div

                  initial={{ opacity: 0, x: -30 }}

                  whileInView={{ opacity: 1, x: 0 }}

                  viewport={{ once: true }}

                  transition={{ duration: 0.8 }}

                  className="relative mb-12"

                >

                  {/* Background glow effect */}

                  <div className={`absolute -inset-8 bg-gradient-to-r ${config.color} rounded-3xl opacity-10 blur-3xl`} />

                  <div className={`absolute -inset-4 bg-gradient-to-r ${config.color} rounded-2xl opacity-5 blur-xl`} />

                  

                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl">

                    <div className="flex items-center gap-6">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-2xl group/icon flex-shrink-0`}
                      >

                        {/* Pulsing glow */}

                        <motion.div

                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}

                          transition={{ duration: 2, repeat: Infinity }}

                          className={`absolute inset-0 bg-gradient-to-br ${config.color} rounded-2xl blur-xl`}

                        />

                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" />
                      </motion.div>

                      <div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">

                          {config.label}

                        </h2>

                        <div className="flex items-center gap-4 flex-wrap">

                          <p className="text-muted-foreground text-lg">

                            {items.length} {items.length === 1 ? 'item' : 'items'} available

                          </p>

                          <div className="h-4 w-px bg-primary/30" />

                          <div className="flex items-center gap-2 text-primary">

                            <TrendingUp className="w-4 h-4" />

                            <span className="text-sm font-semibold">

                              {items.reduce((sum, item) => sum + item.views, 0).toLocaleString()} total views

                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                    

                    {/* Section stats */}

                    <div className="flex items-center gap-4">

                      <div className="text-center px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">

                        <div className="text-2xl font-bold text-primary">

                          {items.filter(i => i.featured).length}

                        </div>

                        <div className="text-xs text-muted-foreground">Featured</div>

                      </div>

                      <div className="text-center px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">

                        <div className="text-2xl font-bold text-primary">

                          {items.reduce((sum, item) => sum + item.downloads, 0).toLocaleString()}

                        </div>

                        <div className="text-xs text-muted-foreground">Downloads</div>

                      </div>

                    </div>

                  </div>

                </motion.div>



                {/* Featured Items */}

                {featuredItems.length > 0 && (

                  <motion.div

                    initial={{ opacity: 0, y: 30 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{ duration: 0.6 }}

                  >

                    <div className="relative mb-6">

                      <div className={`absolute -inset-4 bg-gradient-to-r ${config.color} rounded-2xl opacity-10 blur-xl`} />

                      <h3 className="relative text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">

                        <motion.div

                          animate={{ rotate: [0, 10, -10, 0] }}

                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}

                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}

                        >

                          <Star className="w-5 h-5 text-white fill-white" />

                        </motion.div>

                        <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">

                          Featured {config.label}

                        </span>

                      </h3>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

                      {featuredItems.map((item, index) => (

                        <div key={item.id} data-library-item>

                          <SectionSpecificCard

                            item={item}

                            index={index}

                            featured

                          />

                        </div>

                      ))}

                    </div>

                  </motion.div>

                )}



                {/* Regular Items */}

                {regularItems.length > 0 && (

                  <motion.div

                    initial={{ opacity: 0, y: 30 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{ duration: 0.6, delay: 0.2 }}

                  >

                    {featuredItems.length > 0 && (

                      <div className="relative mb-6 mt-12">

                        <div className={`absolute -inset-2 bg-gradient-to-r ${config.color} rounded-xl opacity-5 blur-lg`} />

                        <h3 className="relative text-xl md:text-2xl font-semibold mb-6">

                          All {config.label}

                        </h3>

                      </div>

                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

                      {regularItems.map((item, index) => (

                        <div key={item.id} data-library-item>

                          <AllSectionCard

                            item={item}

                            index={index + featuredItems.length}

                          />

                        </div>

                      ))}

                    </div>

                  </motion.div>

                )}



                {/* Contribution Card */}

                <ContributionCard type={type} />

              </motion.section>

            );

          })}

        </div>

      </div>



      {/* Results Count */}

      {filteredItems.length === 0 && (

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          className="relative z-10 px-4 py-20"

        >

          <div className="container mx-auto max-w-4xl text-center">

            <Card className="border-2 border-primary/20 bg-card/80 backdrop-blur-xl p-12">

              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />

              <h3 className="text-2xl font-bold mb-2">No Results Found</h3>

              <p className="text-muted-foreground mb-6">

                Try adjusting your search or filters to find what you're looking for.

              </p>

              <Button onClick={clearFilters} variant="outline">

                Clear All Filters

              </Button>

            </Card>

          </div>

        </motion.div>

      )}



      {/* Promotional Banner - Before Footer */}

      <LibraryPromotionalBanner libraryItems={libraryItems} />

    </div>

  );

}



