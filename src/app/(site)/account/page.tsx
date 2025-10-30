import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Account — EncryptArx",
	description: "Manage profile, security, and API keys.",
};

export default function AccountPage() {
	return (
		<main className="container mx-auto max-w-3xl px-4 py-12">
			<h1 className="text-2xl font-bold tracking-tight">Account</h1>
			<section className="mt-6 grid gap-6">
				<div className="rounded-lg border p-6">
					<h2 className="text-xl font-semibold">Profile</h2>
					<p className="mt-2 text-sm text-muted-foreground">Name, email, providers.</p>
				</div>
				<div className="rounded-lg border p-6">
					<h2 className="text-xl font-semibold">Security</h2>
					<p className="mt-2 text-sm text-muted-foreground">Password, 2FA (TOTP).</p>
				</div>
				<div className="rounded-lg border p-6">
					<h2 className="text-xl font-semibold">API Keys</h2>
					<p className="mt-2 text-sm text-muted-foreground">Manage tokens.</p>
				</div>
			</section>
		</main>
	);
}


