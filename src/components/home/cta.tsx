
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cta() {
    return (
        <section className="py-12 sm:py-24">
            <div className="container">
                <div className="relative isolate overflow-hidden bg-surface-2 px-6 py-24 text-center shadow-soft sm:rounded-3xl sm:px-16">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,_hsl(var(--primary)/0.1)_0%,_transparent_100%)]"></div>
                    <h2 className="mx-auto max-w-2xl font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">
                        Ready to harden your systems?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">
                        Book a free assessment with our security team.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild size="lg">
                            <Link href="/contact">Request Assessment</Link>
                        </Button>
                         <Button asChild size="lg" variant="outline">
                            <Link href="/contact">Request Trial</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
