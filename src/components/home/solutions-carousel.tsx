
'use client';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const solutions = [
    {
        industry: "Finance",
        problem: "Protecting against fraudulent transactions and data breaches in real-time.",
        solution: "Utilized our real-time threat detection API, processing millions of transactions with sub-millisecond latency.",
        outcome: "99.8% reduction in fraudulent transactions.",
        imageId: "solution-finance",
        href: "#"
    },
    {
        industry: "Healthcare",
        problem: "Ensuring patient data confidentiality while enabling collaborative research.",
        solution: "Implemented Secure Enclaves for privacy-preserving machine learning on sensitive medical records.",
        outcome: "Accelerated research by 40% while maintaining HIPAA compliance.",
        imageId: "solution-healthcare",
        href: "#"
    },
    {
        industry: "E-commerce",
        problem: "Securing the entire supply chain from manufacturer to customer.",
        solution: "Deployed our immutable ledger technology for end-to-end supply chain visibility and verification.",
        outcome: "Eliminated counterfeit goods and reduced shrinkage by 25%.",
        imageId: "solution-ecommerce",
        href: "#"
    },
    {
        industry: "Logistics",
        problem: "Optimizing fleet management and preventing GPS spoofing attacks.",
        solution: "Integrated our geo-fencing and secure location services API.",
        outcome: "Improved fleet efficiency by 15% and prevented all location-based attacks.",
        imageId: "solution-logistics",
        href: "#"
    }
]

function getSolutionImage(id: string) {
    return PlaceHolderImages.find(p => p.id === id);
}

export function SolutionsCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Auto-advance to the previous slide every ~2.5s (visual left-to-right movement)
  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      carouselApi.scrollPrev();
    }, 2500);
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <section className="py-12 sm:py-24 bg-surface-2">
        <div className="container relative">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Industry Solutions</h2>
                <p className="text-muted text-sm sm:text-base mt-3">Real outcomes across finance, healthcare, commerce, and more.</p>
            </div>
            <Carousel
                opts={{
                    align: "start",
                    loop: true
                }}
                className="w-full"
                setApi={(api: CarouselApi) => setCarouselApi(api)}
            >
                <CarouselContent
                  onMouseEnter={() => {
                    if (!carouselApi) return;
                    // temporarily stop auto-advance when hovering
                    carouselApi.reInit({});
                    // we will clear our setInterval via effect cleanup by toggling api
                    setCarouselApi(null);
                  }}
                  onMouseLeave={() => {
                    // restore api to resume interval
                    // setApi callback below will re-provide api reference; as a fallback use existing one
                    // No-op here; interval restarts when setApi fires on next render
                  }}
                >
                {solutions.map((item, index) => {
                    const image = getSolutionImage(item.imageId);
                    return (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <div className="p-1 h-full">
                                <motion.div
                                  initial={{ opacity: 0, y: 24 }}
                                  whileInView={{ opacity: 1, y: 0, rotate: [0, 0] }}
                                  transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                                  viewport={{ once: true, margin: "-100px" }}
                                  className="h-full"
                                >
                                  <Card className="group h-full bg-surface-1 shadow-soft flex flex-col overflow-hidden relative border border-white/5"
                                    onMouseEnter={() => carouselApi?.plugins() /* noop ensures reference keep-alive */}
                                  >
                                      {/* Image with hover zoom and gradient scrim */}
                                      {image && (
                                        <div className="relative h-56 w-full overflow-hidden">
                                          <Image
                                            src={image.imageUrl}
                                            alt={item.industry}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                            data-ai-hint={image.imageHint}
                                          />
                                          {/* top subtle gradient */}
                                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/0 to-black/40" />
                                          {/* moving light sweep */}
                                          <motion.div
                                            className="pointer-events-none absolute inset-0"
                                            initial={{ x: "-120%" }}
                                            whileHover={{ x: "120%" }}
                                            transition={{ duration: 1.6, ease: "easeInOut" }}
                                            style={{ background: "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
                                          />
                                          {/* badge */}
                                          <div className="absolute top-3 left-3 z-10">
                                            <span className="px-2 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-black/40 text-primary backdrop-blur-sm border border-white/10">{item.industry}</span>
                                          </div>
                                      </div>
                                      )}
                                      {/* Content */}
                                      <CardContent className="p-6 flex flex-col flex-grow">
                                          <p className="font-semibold mb-2 text-high leading-snug">{item.problem}</p>
                                          <p className="text-muted text-sm mb-4 flex-grow">{item.solution}</p>
                                          <p className="text-sm font-bold text-accent-warm mb-5">{item.outcome}</p>

                                          <motion.div
                                            whileHover={{ x: 6 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                          >
                                            <Button variant="link" className="p-0 h-auto self-start text-primary group/cta inline-flex items-center hover:text-accent">
                                              See solution
                                              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                                            </Button>
                                          </motion.div>
                                      </CardContent>

                                      {/* hover border glow */}
                                      <motion.div
                                        className="pointer-events-none absolute inset-0 rounded-lg"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ boxShadow: "inset 0 0 0 1px rgba(43,141,190,0.35)" }}
                                      />
                                  </Card>
                                </motion.div>
                            </div>
                        </CarouselItem>
                    )}
                )}
                </CarouselContent>
                <CarouselPrevious className="ml-12 hover:scale-105 transition-transform" />
                <CarouselNext className="mr-12 hover:scale-105 transition-transform" />
            </Carousel>
        </div>
    </section>
  )
}
