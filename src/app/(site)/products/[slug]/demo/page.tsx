import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	return {
		title: `Sandbox · ${params.slug.replace(/-/g, " ")}`,
		description: "Interactive demo environment with guided tasks.",
	};
}

export default function ProductDemoPage({ params }: Params) {
	if (!params?.slug) return notFound();
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Sandbox</h1>
				<p className="mt-3 text-muted-foreground">Public demo or gated access.</p>
				<a href="/contact" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-white">Request Trial</a>
			</header>
			<section aria-labelledby="tasks">
				<h2 id="tasks" className="text-2xl font-semibold">Guided Tasks</h2>
				<ol className="mt-3 list-decimal space-y-2 pl-6 text-sm text-muted-foreground">
					<li>Authenticate and fetch data</li>
					<li>Configure a connector</li>
					<li>Review logs</li>
				</ol>
			</section>
		</main>
	);
}


