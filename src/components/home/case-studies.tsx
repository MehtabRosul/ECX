
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { Button } from "../ui/button";

const caseStudies = [
  {
    logoId: "case-study-1",
    problem: "Needed to secure financial data against quantum threats.",
    approach: "Implemented post-quantum cryptographic APIs for all data-in-transit and at-rest.",
    outcome: "Achieved NIST Level IV compliance ahead of schedule.",
    href: "#"
  },
  {
    logoId: "case-study-2",
    problem: "Patient data privacy was at risk from sophisticated attacks.",
    approach: "Utilized Secure Enclaves to process sensitive medical records in a confidential environment.",
    outcome: "Reduced data breach risk by 98% while maintaining performance.",
    href: "#"
  },
  {
    logoId: "case-study-3",
    problem: "Required immutable and verifiable audit trails for supply chain management.",
    approach: "Integrated our distributed ledger technology for tamper-proof logging.",
    outcome: "Increased supply chain transparency and reduced fraud by 60%.",
    href: "#"
  },
]

function getLogo(id: string) {
    return PlaceHolderImages.find(p => p.id === id);
}

export function CaseStudies() {
  return (
    <section className="bg-surface-1 py-12 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Selected Case Studies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => {
              const logo = getLogo(study.logoId);
              return (
                <Card key={index} className="bg-surface-2 shadow-soft hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col">
                        {logo && (
                            <div className="h-10 w-32 relative mb-4">
                                <Image
                                    src={logo.imageUrl}
                                    alt="Client Logo"
                                    layout="fill"
                                    objectFit="contain"
                                    data-ai-hint={logo.imageHint}
                                />
                            </div>
                        )}
                        <div className="flex-grow">
                            <p className="text-muted mb-2"><span className="font-semibold text-high">Problem:</span> {study.problem}</p>
                            <p className="text-muted mb-2"><span className="font-semibold text-high">Approach:</span> {study.approach}</p>
                            <p className="text-muted"><span className="font-semibold text-high">Outcome:</span> <span className="text-primary">{study.outcome}</span></p>
                        </div>
                        <Button variant="link" className="p-0 h-auto mt-4 self-start">Read case study &rarr;</Button>
                    </CardContent>
                </Card>
              )
            })}
        </div>
      </div>
    </section>
  )
}
