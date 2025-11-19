'use client';

import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Send,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Mail,
  User,
  FileText,
  MessageSquare
} from 'lucide-react';
import type { LibraryItemType } from './library-page-client';
import { typeConfig } from './library-page-client';

interface ContributionCardProps {
  type: LibraryItemType;
}

export const ContributionCard = memo(function ContributionCard({ type }: ContributionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const config = typeConfig[type];
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setIsExpanded(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isExpanded ? [0.2, 0.4, 0.2] : 0.15,
          scale: isExpanded ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 3,
          repeat: isExpanded ? Infinity : 0,
          ease: 'easeInOut',
        }}
        className={`absolute -inset-2 bg-gradient-to-br ${config.color} rounded-3xl blur-2xl -z-10`}
        style={{ willChange: 'opacity, transform' }}
      />

      <Card
        className={`relative border-2 ${config.borderColor} bg-gradient-to-br ${config.bgColor} backdrop-blur-xl overflow-hidden group`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${config.color} bg-[length:50px_50px]`}
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            }}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full" />

        {!isExpanded ? (
          <CardContent className="relative z-10 p-8">
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-4 flex-1 min-w-[250px]">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Want to Contribute?</h3>
                  <p className="text-muted-foreground">
                    Share your {config.label.toLowerCase()} with our community
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsExpanded(true)}
                  className={`bg-gradient-to-r ${config.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        ) : (
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  We've received your contribution request. Our team will get back to you soon.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsExpanded(false);
                  }}
                  variant="outline"
                >
                  Close
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Contribute {config.label}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Share your work with our community
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsExpanded(false)}
                      className="rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="border-primary/20 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                        className="border-primary/20 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Tell Us About Your Contribution
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={`Describe your ${config.label.toLowerCase()} and why it would be valuable to our community...`}
                        required
                        rows={5}
                        className="border-primary/20 focus:border-primary/50 resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex-1 bg-gradient-to-r ${config.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Request
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsExpanded(false)}
                        className="border-primary/20"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Card>
    </motion.div>
  );
});

