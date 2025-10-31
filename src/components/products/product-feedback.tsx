'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, Send, User, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for product feedback
const mockFeedback = [
  {
    id: "1",
    userId: "user1",
    userName: "Alex Johnson",
    rating: 5,
    comment: "This product exceeded my expectations! The performance is incredible and the security features are top-notch.",
    date: "2025-10-15",
    helpful: 24,
    notHelpful: 2,
    tags: ["Performance", "Security"]
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah Chen",
    rating: 4,
    comment: "Great product overall, but the documentation could be more comprehensive. The API is well-designed though.",
    date: "2025-10-10",
    helpful: 18,
    notHelpful: 3,
    tags: ["API", "Documentation"]
  },
  {
    id: "3",
    userId: "user3",
    userName: "Michael Torres",
    rating: 5,
    comment: "The best encryption solution I've used. The quantum-resistant algorithms give me confidence in long-term security.",
    date: "2025-10-05",
    helpful: 32,
    notHelpful: 1,
    tags: ["Encryption", "Security"]
  },
  {
    id: "4",
    userId: "user4",
    userName: "Emma Wilson",
    rating: 3,
    comment: "Good product but had some issues with the initial setup. Support team was helpful in resolving them.",
    date: "2025-09-28",
    helpful: 12,
    notHelpful: 5,
    tags: ["Setup", "Support"]
  }
];

// Mock rating distribution
const ratingDistribution = [
  { rating: 5, count: 42, percentage: 70 },
  { rating: 4, count: 12, percentage: 20 },
  { rating: 3, count: 4, percentage: 7 },
  { rating: 2, count: 1, percentage: 2 },
  { rating: 1, count: 1, percentage: 1 }
];

export function ProductFeedback() {
  const [feedback, setFeedback] = useState(mockFeedback);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("helpful");
  
  const overallRating = feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newComment.trim()) return;
    
    const newFeedback = {
      id: (feedback.length + 1).toString(),
      userId: "currentUser",
      userName: "You",
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      notHelpful: 0,
      tags: []
    };
    
    setFeedback([newFeedback, ...feedback]);
    setNewRating(0);
    setNewComment("");
  };
  
  const handleHelpful = (id: string, isHelpful: boolean) => {
    setFeedback(feedback.map(item => {
      if (item.id === id) {
        return {
          ...item,
          helpful: isHelpful ? item.helpful + 1 : item.helpful,
          notHelpful: !isHelpful ? item.notHelpful + 1 : item.notHelpful
        };
      }
      return item;
    }));
  };
  
  const sortedFeedback = [...feedback].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });
  
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Rating Summary */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 p-6 backdrop-blur-sm">
          <h3 className="text-2xl font-bold">Customer Ratings</h3>
          
          <div className="mt-6 flex items-end gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold">{overallRating.toFixed(1)}</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(overallRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Based on {feedback.length} reviews
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.rating} className="flex items-center gap-3">
                  <span className="w-8 text-sm">{dist.rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1">
                    <Progress value={dist.percentage} className="h-2" />
                  </div>
                  <span className="w-12 text-right text-sm">{dist.count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-green-400">+5% improvement</span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        </div>
        
        {/* Submit Feedback */}
        <div className="w-full md:w-96">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold">Rate This Product</h3>
            
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= newRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted hover:text-yellow-400"
                      }`}
                      onClick={() => setNewRating(star)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="comment" className="mb-2 block text-sm font-medium">
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button type="submit" className="w-full gap-2" disabled={newRating === 0 || !newComment.trim()}>
                <Send className="h-4 w-4" />
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Feedback Controls (filters removed) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">Sort by:</span>
          {["helpful", "recent", "rating"].map((option) => (
            <Button
              key={option}
              variant={sortBy === option ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy(option)}
              className="capitalize"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Feedback List */}
      <div className="space-y-6">
        <AnimatePresence>
          {sortedFeedback.map((item, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-100px" });
            const controls = useAnimation();
            
            useEffect(() => {
              if (isInView) {
                controls.start("visible");
              }
            }, [isInView, controls]);
            
            return (
              <motion.div
                ref={ref}
                key={item.id}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 p-6 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold">{item.userName}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {item.date}
                      </div>
                      <p className="mt-3">{item.comment}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-muted-foreground hover:text-green-400"
                      onClick={() => handleHelpful(item.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{item.helpful}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-muted-foreground hover:text-red-400"
                      onClick={() => handleHelpful(item.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>{item.notHelpful}</span>
                    </Button>
                  </div>
                  
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}