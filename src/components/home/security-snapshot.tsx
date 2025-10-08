
import { ShieldAlert, ShieldCheck, Siren, Wrench } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const snapshotItems = [
    { icon: ShieldAlert, label: "Open Advisories", value: "0", tooltip: "No active security advisories." },
    { icon: Wrench, label: "Avg. MTTR", value: "4.2h", tooltip: "Average Mean Time to Resolution for critical issues." },
    { icon: ShieldCheck, label: "Pen Tests (YTD)", value: "5", tooltip: "Five independent penetration tests conducted this year." },
    { icon: Siren, label: "Last Incident", value: "320d ago", tooltip: "No critical incidents in the last 320 days." },
]

export function SecuritySnapshot() {
    return (
        <section className="py-12 sm:py-24 bg-surface-1">
            <div className="container">
                <div className="relative isolate overflow-hidden bg-surface-2 px-6 py-16 text-center shadow-soft sm:rounded-3xl sm:px-16">
                     <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,_hsl(var(--primary)/0.1)_0%,_transparent_100%)]"></div>
                    <h2 className="mx-auto max-w-2xl font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">
                        Security & Trust at a Glance
                    </h2>
                     <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">
                        We are committed to transparency and operational excellence.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <TooltipProvider>
                            {snapshotItems.map(item => (
                                <Tooltip key={item.label}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-3 rounded-full bg-glass-01 border border-white/10 px-4 py-2 text-sm text-high cursor-pointer hover:bg-white/5 transition-colors">
                                            <item.icon className="w-5 h-5 text-accent-warm" />
                                            <span>{item.label}:</span>
                                            <span className="font-bold">{item.value}</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </div>
                     <div className="mt-10">
                        <Button variant="outline">View Security Advisories</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
