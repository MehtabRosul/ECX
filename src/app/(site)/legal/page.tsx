import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Legal & Policies — EncryptArx",
	description: "Privacy, Terms, Cookies, Accessibility, and DPA.",
};

export default function LegalCenterPage() {
	return (
		<main className="container mx-auto max-w-3xl px-4 py-12">
			<h1 className="text-3xl font-bold tracking-tight">Legal & Policies</h1>
			<nav className="mt-4 flex flex-wrap gap-3 text-sm">
				<a href="#privacy" className="underline underline-offset-4">Privacy</a>
				<a href="#terms" className="underline underline-offset-4">Terms</a>
				<a href="#cookies" className="underline underline-offset-4">Cookies</a>
				<a href="#accessibility" className="underline underline-offset-4">Accessibility</a>
				<a href="#dpa" className="underline underline-offset-4">DPA</a>
			</nav>
			<section id="privacy" className="mt-10">
				<h2 className="text-2xl font-semibold">Privacy Policy</h2>
				<p className="mt-2 text-sm text-muted-foreground">Data collection, retention, and rights.</p>
			</section>
			<section id="terms" className="mt-10">
				<h2 className="text-2xl font-semibold">Terms of Service</h2>
				<p className="mt-2 text-sm text-muted-foreground">User obligations and licensing.</p>
			</section>
			<section id="cookies" className="mt-10">
				<h2 className="text-2xl font-semibold">Cookie Policy</h2>
				<p className="mt-2 text-sm text-muted-foreground">Categories and preferences.</p>
			</section>
			<section id="accessibility" className="mt-10">
				<h2 className="text-2xl font-semibold">Accessibility Statement</h2>
				<p className="mt-2 text-sm text-muted-foreground">Commitment and contact.</p>
			</section>
			<section id="dpa" className="mt-10">
				<h2 className="text-2xl font-semibold">Data Processing Addendum</h2>
				<p className="mt-2 text-sm text-muted-foreground">Request DPA via contact.</p>
			</section>
		</main>
	);
}


