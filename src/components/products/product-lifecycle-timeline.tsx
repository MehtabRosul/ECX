'use client';

import { useState, useRef, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Rocket, 
  Wrench, 
  TestTube, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

const timelineEvents = [
  {
    id: "1",
    date: "2023-01-15",
    title: "Project Initiation",
    description: "Initial concept and requirements gathering for Quantum Encrypt",
    status: "completed",
    icon: Rocket,
    phase: "initiation"
  },
  {
    id: "2",
    date: "2023-03-22",
    title: "Design Phase",
    description: "Architecture design and technology stack selection",
    status: "completed",
    icon: Wrench,
    phase: "design"
  },
  {
    id: "3",
    date: "2023-06-10",
    title: "Development",
    description: "Core implementation and feature development",
    status: "completed",
    icon: TestTube,
    phase: "development"
  },
  {
    id: "4",
    date: "2023-09-05",
    title: "Testing & QA",
    description: "Comprehensive testing including security audits",
    status: "completed",
    icon: Shield,
    phase: "testing"
  },
  {
    id: "5",
    date: "2023-11-20",
    title: "Beta Release",
    description: "Limited release to select customers for feedback",
    status: "completed",
    icon: Zap,
    phase: "release"
  },
  {
    id: "6",
    date: "2024-02-15",
    title: "General Availability",
    description: "Public release with full feature set",
    status: "completed",
    icon: CheckCircle,
    phase: "release"
  },
  {
    id: "7",
    date: "2024-05-30",
    title: "Version 2.0",
    description: "Major update with performance improvements",
    status: "completed",
    icon: Rocket,
    phase: "development"
  },
  {
    id: "8",
    date: "2024-09-15",
    title: "NIST Compliance",
    description: "Certification for post-quantum cryptography standards",
    status: "completed",
    icon: Shield,
    phase: "compliance"
  },
  {
    id: "9",
    date: "2025-01-10",
    title: "Version 2.4",
    description: "Latest release with enhanced security features",
    status: "current",
    icon: Zap,
    phase: "development"
  },
  {
    id: "10",
    date: "2025-06-01",
    title: "Version 3.0",
    description: "Next major release with AI-powered features",
    status: "upcoming",
    icon: Rocket,
    phase: "planning"
  },
  {
    id: "11",
    date: "2025-12-01",
    title: "Quantum-Ready",
    description: "Full compatibility with quantum computing infrastructure",
    status: "upcoming",
    icon: Zap,
    phase: "future"
  }
];

export function ProductLifecycleTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  const prefersReducedMotion = useReducedMotion();
  
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "current": return "bg-blue-500";
      case "upcoming": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };
  
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "initiation": return "bg-purple-500";
      case "design": return "bg-indigo-500";
      case "development": return "bg-blue-500";
      case "testing": return "bg-yellow-500";
      case "release": return "bg-green-500";
      case "compliance": return "bg-red-500";
      case "planning": return "bg-gray-500";
      case "future": return "bg-pink-500";
      default: return "bg-gray-500";
    }
  };
  
  const getPhaseHoverClasses = (phase: string) => {
    switch (phase) {
      case "initiation": return "hover:border-purple-400/40 hover:bg-purple-500/5";
      case "design": return "hover:border-indigo-400/40 hover:bg-indigo-500/5";
      case "development": return "hover:border-blue-400/40 hover:bg-blue-500/5";
      case "testing": return "hover:border-yellow-400/40 hover:bg-yellow-500/5";
      case "release": return "hover:border-green-400/40 hover:bg-green-500/5";
      case "compliance": return "hover:border-red-400/40 hover:bg-red-500/5";
      case "planning": return "hover:border-gray-400/40 hover:bg-gray-500/5";
      case "future": return "hover:border-pink-400/40 hover:bg-pink-500/5";
      default: return "hover:border-white/20";
    }
  };
  
  const selectedEventDetails = timelineEvents.find(event => event.id === selectedEvent);

  // Child component so Hooks are not inside Array.map
  const handleToggle = useCallback((id: string, isSelected: boolean) => {
    setSelectedEvent(isSelected ? null : id);
  }, []);

  function TimelineItem({
    event,
    index,
    isSelected,
    onToggle,
  }: {
    event: (typeof timelineEvents)[number];
    index: number;
    isSelected: boolean;
    onToggle: () => void;
  }) {
    const Icon = event.icon;
    const ref = useRef<HTMLDivElement | null>(null);

    return (
      <motion.div
        ref={ref}
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.06 }}
        className={`
          relative md:flex md:items-center transform-gpu [backface-visibility:hidden]
          ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
        `}
        layout={false}
      >
        {/* Date and connector */}
        <div className="absolute -left-12 flex h-8 w-8 items-center justify-center md:relative md:left-0 md:top-0 md:ml-0 md:mr-0 md:h-12 md:w-12">
          <div className={`
            flex h-4 w-4 rounded-full
            ${getStatusColor(event.status)}
            ${event.status === "current" ? "animate-pulse" : ""}
          `}></div>
        </div>

        {/* Event card */}
        <motion.div 
          className={`
            group relative cursor-pointer rounded-2xl border p-6 transition-all duration-200
            ${isSelected 
              ? "border-primary bg-primary/10 shadow-lg" 
              : `border-white/10 bg-surface-2/30 ${getPhaseHoverClasses(event.phase)} hover:shadow-md`
            }
            md:w-5/12
          `}
          onClick={onToggle}
          whileHover={prefersReducedMotion ? undefined : { y: -1.5, scale: 1.005 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
                <Badge 
                  variant="secondary" 
                  className={getPhaseColor(event.phase)}
                >
                  {event.phase}
                </Badge>
              </div>
              <h4 className="mt-2 text-xl font-bold transition-colors duration-300 group-hover:text-foreground">{event.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{event.date}</span>
              <Badge 
                variant="outline" 
                className={`
                  mt-2 border
                  ${event.status === "completed" && "border-green-500/30 text-green-300"}
                  ${event.status === "current" && "border-blue-500/30 text-blue-300"}
                  ${event.status === "upcoming" && "border-gray-500/30 text-gray-300"}
                `}
              >
                {event.status}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Empty div for spacing on opposite side */}
        <div className="hidden md:block md:w-2/12"></div>
      </motion.div>
    );
  }
  
  const MemoTimelineItem = memo(TimelineItem);

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Product Lifecycle Timeline</h3>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary/30 to-accent/30 md:left-1/2 md:-translate-x-px"></div>
        
        {/* Timeline events */}
        <div className="space-y-12 pl-12 md:pl-0">
          {timelineEvents.map((event, index) => {
            const isSelected = selectedEvent === event.id;
            return (
              <MemoTimelineItem
                key={event.id}
                event={event}
                index={index}
                isSelected={isSelected}
                onToggle={() => handleToggle(event.id, isSelected)}
              />
            );
          })}
        </div>
      </div>
      
      {/* Event Details Panel */}
      {selectedEventDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border border-white/10 bg-background/80 p-6 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-bold">{selectedEventDetails.title}</h4>
              <p className="mt-2 text-muted-foreground">{selectedEventDetails.description}</p>
            </div>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h5 className="font-medium">Key Milestones</h5>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Requirements finalized</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Architecture approved</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  <span>Security audit pending</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium">Team</h5>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Dev Team", "Security Team", "QA Team", "Product Team"].map((team, index) => (
                  <Badge key={index} variant="secondary">
                    {team}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}