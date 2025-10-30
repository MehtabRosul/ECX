import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Security Program — EncryptArx",
	description:
		"Our security program overview: frameworks, testing, disclosure policy, and contacts.",
};

export default function SecurityProgramPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Security Program</h1>
				<p className="mt-3 text-muted-foreground">
					High-level overview of frameworks, testing cadence, and contacts.
				</p>
				<div className="mt-6 flex gap-3">
					<a href="/security/vulnerability-disclosure" className="rounded-md bg-primary px-4 py-2 text-white">Report a security issue</a>
					<a href="/security/advisories" className="rounded-md border px-4 py-2 hover:bg-accent/10">Security advisories</a>
				</div>
			</header>

			<section aria-labelledby="frameworks" className="mb-10">
				<h2 id="frameworks" className="text-2xl font-semibold">Frameworks</h2>
				<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
					<li>NIST CSF mapping</li>
					<li>OWASP SAMM for SDLC</li>
					<li>MITRE ATT&CK-informed detections</li>
				</ul>
			</section>

			<section aria-labelledby="testing" className="mb-10">
				<h2 id="testing" className="text-2xl font-semibold">Testing & Audits</h2>
				<p className="mt-2 text-sm text-muted-foreground">Pentest summary and last audit date.</p>
			</section>

			<section aria-labelledby="pgp" className="mb-10">
				<h2 id="pgp" className="text-2xl font-semibold">PGP & Contacts</h2>
				<p className="mt-2 text-sm text-muted-foreground">security@encryptarx.example · PGP public key</p>
			</section>
		</main>
	);
}


