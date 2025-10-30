"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText, FlaskConical, MessageSquare, Atom, Zap, Cpu, Dna } from "lucide-react"
import { useCallback, useState, useEffect } from "react"
import { useReducedMotion } from "framer-motion"
import type React from "react"
import FadeContent from "../ui/fade-content"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'


// --- Automation: Lottie Animation ---
function AutomationWorkflow() {
  return (
    <div className="flex items-center justify-center w-72 h-56 bg-black/10 rounded-lg overflow-hidden">
      <DotLottieReact
        src="/lottie/Business team tech.lottie"
        autoplay
        loop
        className="w-full h-full object-contain"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}

// --- Development: Lottie Animation ---
function ProgrammingCode() {
  return (
    <div className="bg-black/10 rounded-lg p-0 w-72 h-56 flex items-center justify-center overflow-hidden">
      <DotLottieReact
        src="/lottie/Coding.lottie"
        autoplay
        loop
        className="w-full h-full object-contain"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}

// --- DNA Analysis: Lottie Animation ---
function DNAHelixAdvanced() {
  return (
    <div className="relative w-60 h-56 flex items-center justify-center bg-black/10 rounded-lg overflow-hidden">
      <DotLottieReact
        src="/lottie/Dashboard Animation.lottie"
        autoplay
        loop
        className="w-full h-full object-contain"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}


// Interactive Mini Lab Console
function MiniLabConsole() {
    const [activeExperiment, setActiveExperiment] = useState<'automation' | 'development' | 'dna'>('automation')
    const prefersReduced = useReducedMotion()
    const experiments = [
        { id: 'automation' as const, name: 'Automation', icon: Zap, component: AutomationWorkflow },
        { id: 'development' as const, name: 'Development', icon: Cpu, component: ProgrammingCode },
        { id: 'dna' as const, name: 'Analysis', icon: Dna, component: DNAHelixAdvanced }
    ]
    const ActiveComponent = experiments.find(e => e.id === activeExperiment)?.component || AutomationWorkflow
    
    return (
        <div className="relative h-[490px] bg-gradient-to-br from-surface-2 via-surface-2 to-surface-1 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_1.2px)] bg-[length:24px_24px] opacity-40" />
            
            {/* Lab header */}
            <div className="relative z-10 p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FlaskConical className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-high">Our R&D Console</h3>
                </div>
                
                {/* Experiment tabs */}
                <div className="flex gap-2">
                    {experiments.map(exp => (
                        <button
                            key={exp.id}
                            onClick={() => setActiveExperiment(exp.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                activeExperiment === exp.id 
                                    ? 'bg-primary text-white' 
                                    : 'bg-white/5 text-muted hover:bg-white/10 hover:text-high'
                            }`}
                        >
                            <exp.icon className="w-3 h-3 inline mr-1" />
                            {exp.name}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Lab workspace */}
            <div className="relative z-10 p-6 h-[calc(100%-140px)]">
                <div className="h-full bg-black/20 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                    {/* Experiment display */}
                    <div
                        key={activeExperiment}
                        className="relative"
                    >
                        <ActiveComponent />
                    </div>
                    
                    {/* Lab equipment indicators */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <div
                            className="w-2 h-2 bg-green-400 rounded-full"
                        />
                        <div
                            className="w-2 h-2 bg-yellow-400 rounded-full"
                        />
                        <div
                            className="w-2 h-2 bg-red-400 rounded-full"
                        />
                    </div>
                    
                    {/* Data streams */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-1">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-1 bg-primary/30 rounded-full flex-1"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        </div>
    )
}

export function ResearchLab() {
    return (
        <section className="relative py-16 sm:py-24 bg-surface-1 overflow-hidden">
            <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Perfectly aligned header section */}
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
                    >
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-primary text-sm font-medium tracking-wide">R&D Lab</span>
                    </div>
                    
                    <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-high mb-6">
                        Where Ideas Become Products
                    </h2>
                    
                    <p className="text-lg sm:text-xl text-muted max-w-4xl mx-auto leading-relaxed">
                        EncryptArx's R&D (ECX Lab) pioneers novel defenses from cryptographic primitives and secure enclaves to ML-based threat detection and cutting‑edge Web3 frameworks.
                    </p>
                </div>

                {/* Main content grid with perfect alignment */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
                    {/* Left: Interactive Mini Lab */}
                    <FadeContent><div className="lg:order-1"><MiniLabConsole /></div></FadeContent>

                    {/* Right: Information cards */}
                    <FadeContent><div className="lg:order-2 space-y-6">
                        {/* About R&D card with unique blue/white light hover effect */}
                        <Card className="group bg-surface-2/80 backdrop-blur-sm border border-white/10 shadow-soft transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                            {/* Blue/white light hover effect */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300" style={{background: 'radial-gradient(circle at 60% 40%, rgba(59,130,246,0.25) 0%, rgba(255,255,255,0.10) 60%, transparent 100%)'}} />
                            <CardContent className="p-8 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-high mb-3">About R&D</h3>
                                        <p className="text-muted leading-relaxed mb-6">
                                            Learn what our research teams are building and exploring across cryptography, trusted computing, and machine‑learning security. 
                                        </p>
                                        <Button 
                                            variant="link" 
                                            className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform duration-200"
                                        >
                                            Explore our R&D 
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Collaboration card with unique blue/white light hover effect */}
                        <Card className="group bg-surface-2/80 backdrop-blur-sm border border-white/10 shadow-soft transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                            {/* Blue/white light hover effect (different position) */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{background: 'radial-gradient(circle at 30% 70%, rgba(59,130,246,0.18) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)'}} />
                            <CardContent className="p-8 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-high mb-3">Open ideas to collaborate or contribute</h3>
                                        <p className="text-muted leading-relaxed mb-6">
                                            We welcome proposals and community PRs on formal verification, zk‑proof gadgets, side‑channel mitigations, and privacy‑preserving analytics.
                                        </p>
                                        <Button 
                                            variant="link" 
                                            className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform duration-200"
                                        >
                                            Join the discussion 
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div></FadeContent>
                </div>

                {/* Stats and metrics section */}
                <div
                    className="bg-surface-2/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8 group relative overflow-hidden"
                >
                    {/* Blue/white light hover effect (bottom center) */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300" style={{background: 'radial-gradient(circle at 50% 100%, rgba(59,130,246,0.12) 0%, rgba(255,255,255,0.06) 60%, transparent 100%)'}} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">50+</div>
                            <div className="text-sm text-muted">Research Papers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">12+</div>
                            <div className="text-sm text-muted">Active Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">200+</div>
                            <div className="text-sm text-muted">Contributors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">15</div>
                            <div className="text-sm text-muted">Patents Filed</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
