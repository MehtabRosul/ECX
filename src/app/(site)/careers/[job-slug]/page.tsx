import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { params: { "job-slug": string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	return {
		title: `Careers · ${params["job-slug"].replace(/-/g, " ")}`,
		description: "Role description and application form.",
	};
}

export default function JobDetailPage({ params }: Params) {
	if (!params?.["job-slug"]) return notFound();
	const title = params["job-slug"].replace(/-/g, " ");
	return (
		<main className="container mx-auto max-w-3xl px-4 py-12">
			<header className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">{title}</h1>
				<p className="mt-3 text-muted-foreground">Team · Location · Remote</p>
			</header>
			<section aria-labelledby="apply">
				<h2 id="apply" className="text-2xl font-semibold">Apply</h2>
				<form className="mt-4 grid gap-4" action="/api/forms/careers-apply" method="post">
					<input type="hidden" name="job_slug" value={params["job-slug"]} />
					<label className="grid gap-1">
						<span className="text-sm">Full Name</span>
						<input name="full_name" required className="rounded-md border bg-background px-3 py-2" />
					</label>
					<label className="grid gap-1">
						<span className="text-sm">Email</span>
						<input type="email" name="email" required className="rounded-md border bg-background px-3 py-2" />
					</label>
					<label className="grid gap-1">
						<span className="text-sm">Resume URL</span>
						<input name="resume_url" placeholder="Link to resume" className="rounded-md border bg-background px-3 py-2" />
					</label>
					<button className="mt-2 rounded-md bg-primary px-4 py-2 text-white">Submit</button>
				</form>
			</section>
		</main>
	);
}


