
'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FormEvent } from "react";


export function NewsletterCta() {
    const { toast } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        toast({
            title: "Thanks for subscribing!",
            description: `Please confirm your subscription via the email we sent to ${email}.`,
        });
        (e.target as HTMLFormElement).reset();
    };

    return (
        <section className="py-12 sm:py-24 bg-surface-1">
            <div className="container">
                <div className="bg-surface-2 rounded-lg p-8 md:p-12 shadow-soft grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="font-headline text-2xl font-bold tracking-tight text-high sm:text-3xl">Get research & product updates</h2>
                        <p className="mt-4 text-muted">Subscribe for monthly research highlights, security advisories, and product news.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <Input name="email" type="email" placeholder="you@example.com" required className="flex-grow" />
                            <Button type="submit">Subscribe</Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="consent" required />
                            <label htmlFor="consent" className="text-xs text-muted leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I agree to receive marketing communications and understand I can unsubscribe at any time. <a href="#" className="underline hover:text-high">Privacy Policy</a>.
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
