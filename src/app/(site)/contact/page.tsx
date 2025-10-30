import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact — EncryptArx",
	description: "Get in touch: forms hub, direct contacts, and office details.",
};

export default function ContactHubPage() {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Contact</h1>
				<p className="mt-3 text-muted-foreground">Choose a form or reach us directly.</p>
			</header>
			<section aria-labelledby="forms">
				<h2 id="forms" className="text-2xl font-semibold">Forms</h2>
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{["Contact Us","RFP","Partner","Contributor","Trial","Press","Event","Quote"].map((n) => (
						<a key={n} href={`/contact?form=${encodeURIComponent(n.toLowerCase())}`} className="rounded-lg border p-6 hover:shadow-md">
							<h3 className="font-medium">{n}</h3>
							<p className="mt-2 text-sm text-muted-foreground">Opens {n} form</p>
						</a>
					))}
				</div>
			</section>
			<section className="mt-10" aria-labelledby="direct">
				<h2 id="direct" className="text-2xl font-semibold">Direct Contacts</h2>
				<ul className="mt-3 space-y-2 text-sm text-muted-foreground">
					<li>Sales: sales@example.com</li>
					<li>Press: press@example.com</li>
					<li>Security: security@example.com</li>
				</ul>
			</section>
		</main>
	);
}


