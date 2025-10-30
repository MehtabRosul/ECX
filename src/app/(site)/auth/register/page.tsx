import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register — EncryptArx",
	description: "Create an account to access trials and resources.",
};

export default function RegisterPage() {
	return (
		<main className="container mx-auto max-w-md px-4 py-12">
			<h1 className="text-2xl font-bold tracking-tight">Create account</h1>
			<form className="mt-6 grid gap-4" action="/api/auth/register" method="post">
				<label className="grid gap-1">
					<span className="text-sm">Name</span>
					<input name="name" required className="rounded-md border bg-background px-3 py-2" />
				</label>
				<label className="grid gap-1">
					<span className="text-sm">Email</span>
					<input type="email" name="email" required className="rounded-md border bg-background px-3 py-2" />
				</label>
				<label className="grid gap-1">
					<span className="text-sm">Password</span>
					<input type="password" name="password" required className="rounded-md border bg-background px-3 py-2" />
				</label>
				<label className="flex items-center gap-2 text-sm">
					<input type="checkbox" required /> I agree to the Privacy Policy
				</label>
				<button className="rounded-md bg-primary px-4 py-2 text-white">Create account</button>
			</form>
		</main>
	);
}


