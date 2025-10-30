import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	return {
		title: `Developer Docs · ${params.slug.replace(/-/g, " ")}`,
		description: "Docs portal: quickstart, API reference, SDKs, and examples.",
	};
}

export default function ProductDocsPage({ params }: Params) {
	if (!params?.slug) return notFound();
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Developer Portal</h1>
				<p className="mt-3 text-muted-foreground">Overview · Quickstart · API Reference · SDKs</p>
			</header>
			<section aria-labelledby="quickstart" className="mb-10">
				<h2 id="quickstart" className="text-2xl font-semibold">Quickstart</h2>
				<pre className="mt-4 overflow-auto rounded-md border bg-muted/30 p-4 text-sm"><code>curl https://api.example.com/v1 -H "Authorization: Bearer &lt;key&gt;"</code></pre>
			</section>
			<section aria-labelledby="api">
				<h2 id="api" className="text-2xl font-semibold">API Reference</h2>
				<p className="mt-2 text-sm text-muted-foreground">Interactive reference placeholder.</p>
			</section>
		</main>
	);
}


