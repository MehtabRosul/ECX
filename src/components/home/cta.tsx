import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cta() {
    return (
        <section className="py-12 sm:py-24">
            <div className="container">
                <div className="relative isolate overflow-hidden bg-primary/10 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,_hsl(var(--primary)/0.2)_0%,_transparent_100%)]"></div>
                    <h2 className="mx-auto max-w-2xl font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Ready to Secure Your Future?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                        Discover how EncryptArx can help you build a more secure, resilient, and trustworthy digital presence.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild size="lg">
                            <Link href="/contact">Get in Touch</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/resources">View Documentation</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
