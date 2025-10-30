import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Events & Workshops — EncryptArx",
	description: "Upcoming events, workshops, and past recordings.",
};

export default function EventsIndexPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Events</h1>
				<p className="mt-3 text-muted-foreground">Join upcoming sessions or explore past events.</p>
			</header>
			<section aria-labelledby="upcoming" className="mb-10">
				<h2 id="upcoming" className="text-2xl font-semibold">Upcoming</h2>
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<article key={i} className="rounded-lg border p-6">
							<h3 className="font-medium">Event {i + 1}</h3>
							<p className="mt-2 text-sm text-muted-foreground">Date · Location</p>
							<a href="/events/example" className="mt-3 inline-block text-primary underline underline-offset-4">Register</a>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}


