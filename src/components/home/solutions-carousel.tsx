
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
  return (
    <section className="py-12 sm:py-24 bg-surface-2">
        <div className="container">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Industry Solutions</h2>
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                {solutions.map((item, index) => {
                    const image = getSolutionImage(item.imageId);
                    return (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <div className="p-1 h-full">
                                <Card className="h-full bg-surface-1 shadow-soft flex flex-col overflow-hidden">
                                    {image && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={image.imageUrl}
                                                alt={item.industry}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={image.imageHint}
                                            />
                                        </div>
                                    )}
                                    <CardContent className="p-6 flex flex-col flex-grow">
                                        <p className="text-sm font-semibold text-primary uppercase mb-2">{item.industry}</p>
                                        <p className="font-semibold mb-2 text-high">{item.problem}</p>
                                        <p className="text-muted text-sm mb-4 flex-grow">{item.solution}</p>
                                        <p className="text-sm font-bold text-accent-warm mb-4">{item.outcome}</p>
                                        <Button variant="link" className="p-0 h-auto self-start">See solution &rarr;</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    )}
                )}
                </CarouselContent>
                <CarouselPrevious className="ml-12" />
                <CarouselNext className="mr-12" />
            </Carousel>
        </div>
    </section>
  )
}
