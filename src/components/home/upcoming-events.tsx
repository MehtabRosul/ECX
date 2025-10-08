
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

const events = [
    {
        date: "Oct 29, 2024",
        title: "Workshop: Implementing Post-Quantum Cryptography",
        location: "Virtual",
        description: "A hands-on workshop for developers on integrating PQC algorithms into existing systems."
    },
    {
        date: "Nov 15, 2024",
        title: "CypherCon 2024",
        location: "New York, NY",
        description: "Join our CEO's keynote on the future of AI-driven security at the industry's premier event."
    },
    {
        date: "Dec 05, 2024",
        title: "Webinar: Securing Web3 Applications",
        location: "Virtual",
        description: "A deep dive into the unique security challenges and solutions for decentralized applications."
    }
]

export function UpcomingEvents() {
    return (
        <section className="py-12 sm:py-24 bg-surface-2">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-high sm:text-4xl">Upcoming Events & Workshops</h2>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <Card key={index} className="bg-surface-1 shadow-soft hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-sm text-muted mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4"/>
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4"/>
                                        {event.location}
                                    </div>
                                </div>
                                <h3 className="font-bold text-high mb-2 flex-grow">{event.title}</h3>
                                <p className="text-sm text-muted mb-6">{event.description}</p>
                                <Button>Register Now</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
