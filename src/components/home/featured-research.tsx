
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText } from "lucide-react"

const researchItems = [
    {
        title: "Deepfake Detection 2025: A Multi-modal Approach",
        authors: "Dr. Evelyn Reed, Dr. Kenji Tanaka",
        excerpt: "Our latest paper introduces a novel framework for detecting deepfakes by analyzing inconsistencies across video, audio, and network data streams.",
        href: "#"
    },
    {
        title: "Lattice-Based Cryptography in Secure Enclaves",
        authors: "Dr. Alistair Finch",
        excerpt: "We demonstrate a practical implementation of CRYSTALS-Kyber within hardware-isolated environments, achieving a 30% performance gain.",
        href: "#"
    },
    {
        title: "Adversarial Attacks on Federated Learning Systems",
        authors: "Dr. Sofia Rostova, Dr. Ben Carter",
        excerpt: "This research explores new attack vectors against federated learning models and proposes a differential privacy-based defense mechanism.",
        href: "#"
    }
]

export function FeaturedResearch() {
    return (
        <section className="py-12 sm:py-24 bg-surface-1">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Featured Research</h2>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {researchItems.map((item, index) => (
                         <Card key={index} className="bg-surface-2 shadow-soft hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                            <CardContent className="p-6 flex-grow flex flex-col">
                                <p className="text-xs font-semibold text-primary uppercase mb-2">Paper</p>
                                <h3 className="font-bold text-high mb-2 flex-grow">{item.title}</h3>
                                <p className="text-sm text-muted mb-4">{item.authors}</p>
                                <Button variant="link" className="p-0 h-auto self-start">Read Paper &rarr;</Button>
                            </CardContent>
                         </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
