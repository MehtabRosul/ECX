
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How do I request a product demo?",
        answer: "You can request a personalized demo by visiting our Contact page and filling out the 'Request a Demo' form. Our team will get in touch with you shortly to schedule a session."
    },
    {
        question: "How do I submit a vulnerability?",
        answer: "We take security very seriously. Please visit our Vulnerability Disclosure page for our PGP key and instructions on how to securely submit your findings. We offer bounties for qualifying reports."
    },
    {
        question: "Can I get a trial of your products?",
        answer: "Yes, we offer free trials for our core products. You can sign up for a trial on our 'Request Trial' page, and you'll get instant access to our sandbox environment."
    },
    {
        question: "What industries do you serve?",
        answer: "EncryptArx serves a wide range of industries, including Finance, Healthcare, E-commerce, and Logistics. Our solutions are designed to be flexible and can be adapted to meet the unique security needs of any sector."
    }
]

export function Faq() {
    return (
        <section className="py-12 sm:py-24 bg-surface-2">
            <div className="container max-w-3xl">
                 <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
