import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login — EncryptArx",
	description: "Sign in with email/password or OAuth.",
};

export default function LoginPage() {
	return (
		<main className="container mx-auto max-w-md px-4 py-12">
			<h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
			<form className="mt-6 grid gap-4" action="/api/auth/login" method="post">
				<label className="grid gap-1">
					<span className="text-sm">Email</span>
					<input type="email" name="email" required className="rounded-md border bg-background px-3 py-2" />
				</label>
				<label className="grid gap-1">
					<span className="text-sm">Password</span>
					<input type="password" name="password" required className="rounded-md border bg-background px-3 py-2" />
				</label>
				<button className="rounded-md bg-primary px-4 py-2 text-white">Sign in</button>
			</form>
			<div className="mt-4">
				<a href="/auth/register" className="text-sm text-primary underline underline-offset-4">Create account</a>
			</div>
		</main>
	);
}


