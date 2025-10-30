import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	return {
		title: `Event · ${params.slug.replace(/-/g, " ")}`,
		description: "Event registration, agenda, and speakers.",
	};
}

export default function EventDetailPage({ params }: Params) {
	if (!params?.slug) return notFound();
	return (
		<main className="container mx-auto max-w-4xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">{params.slug.replace(/-/g, " ")}</h1>
				<p className="mt-3 text-muted-foreground">Date · Time · Location</p>
				<a href="#register" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-white">Register</a>
			</header>
			<section className="grid gap-8 lg:grid-cols-2">
				<div>
					<h2 className="text-2xl font-semibold">Agenda</h2>
					<ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
						<li>Session 1</li>
						<li>Session 2</li>
					</ul>
				</div>
				<div>
					<h2 className="text-2xl font-semibold">Speakers</h2>
					<ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
						<li>Speaker A — Title</li>
						<li>Speaker B — Title</li>
					</ul>
				</div>
			</section>
			<section id="register" className="mt-10">
				<h2 className="text-2xl font-semibold">Register</h2>
				<form className="mt-4 grid gap-4" action="/api/forms/event" method="post">
					<input type="hidden" name="event_slug" value={params.slug} />
					<label className="grid gap-1">
						<span className="text-sm">Name</span>
						<input name="name" required className="rounded-md border bg-background px-3 py-2" />
					</label>
					<label className="grid gap-1">
						<span className="text-sm">Email</span>
						<input type="email" name="email" required className="rounded-md border bg-background px-3 py-2" />
					</label>
					<button className="mt-2 rounded-md bg-primary px-4 py-2 text-white">Register</button>
				</form>
			</section>
		</main>
	);
}


