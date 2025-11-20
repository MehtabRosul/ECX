
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hyperspeed from "@/components/ui/hyperspeed";

export function Cta() {
    return (
        <section className="py-12 sm:py-24">
            <div className="container">
                <div className="relative isolate overflow-hidden bg-surface-2 px-4 py-24 text-center shadow-soft sm:rounded-3xl sm:px-16">
                    {/* Hyperspeed Background Effect - Desktop Only (PC screens) */}
                    <div className="absolute inset-0 -z-20 hidden md:block overflow-hidden">
                        <Hyperspeed
                            effectOptions={{
                                distortion: 'turbulentDistortion',
                                length: 400,
                                roadWidth: 16,
                                islandWidth: 3,
                                lanesPerRoad: 4,
                                fov: 90,
                                fovSpeedUp: 120,
                                speedUp: 1.2,
                                carLightsFade: 0.3,
                                totalSideLightSticks: 30,
                                lightPairsPerRoadWay: 50,
                                colors: {
                                    roadColor: 0x0a0a0a,
                                    islandColor: 0x0c0c0c,
                                    background: 0x000000,
                                    shoulderLines: 0x1a1a1a,
                                    brokenLines: 0x2a2a2a,
                                    leftCars: [0x3b82f6, 0x1d4ed8, 0x1e40af],
                                    rightCars: [0x06b6d4, 0x0891b2, 0x0e7490],
                                    sticks: 0x3b82f6,
                                }
                            }}
                        />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900/80 via-black/60 to-slate-900/80"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="mx-auto max-w-2xl font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to harden your systems?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Book a free assessment with our security team.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-6 px-4 sm:px-0">
                            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-4 sm:px-6 text-sm sm:text-base">
                                <Link href="/contact">Request Assessment</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto px-4 sm:px-6 text-sm sm:text-base">
                                <Link href="/contact">Request Trial</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
