import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Careers — EncryptArx",
	description: "Open roles, culture, benefits, and hiring process.",
};

export default function CareersPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Join EncryptArx</h1>
				<p className="mt-3 text-muted-foreground">Explore roles and our hiring process.</p>
			</header>
			<section aria-labelledby="benefits" className="mb-10">
				<h2 id="benefits" className="text-2xl font-semibold">Benefits</h2>
				<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
					<li>Flexible remote work</li>
					<li>Learning stipend</li>
					<li>Health & wellness</li>
				</ul>
			</section>
			<section aria-labelledby="roles">
				<h2 id="roles" className="text-2xl font-semibold">Open Roles</h2>
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<article key={i} className="rounded-lg border p-6">
							<h3 className="font-medium">Role {i + 1}</h3>
							<p className="mt-2 text-sm text-muted-foreground">Team · Location</p>
							<a href="/careers/example-role" className="mt-3 inline-block text-primary underline underline-offset-4">View</a>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}


