import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Chat — EncryptArx",
	description: "Full-screen RAG chat interface with persona modes and transcript export.",
};

export default function ChatPage() {
	return (
		<main className="container mx-auto max-w-6xl px-0 py-6">
			<div className="grid gap-4 md:grid-cols-[1fr_320px]">
				<section aria-label="Conversation" className="rounded-lg border p-4">
					<ul className="space-y-3">
						<li className="text-sm text-muted-foreground">Welcome to EncryptArx chat. Ask anything.</li>
					</ul>
					<form className="mt-4 flex gap-2" action="/api/chat" method="post">
						<input name="message" className="flex-1 rounded-md border bg-background px-3 py-2" placeholder="Type a message..." />
						<button className="rounded-md bg-primary px-4 py-2 text-white">Send</button>
					</form>
				</section>
				<aside className="rounded-lg border p-4" aria-label="Session settings and sources">
					<label className="block text-sm font-medium">Persona</label>
					<select className="mt-2 w-full rounded-md border bg-background px-3 py-2">
						<option>Researcher</option>
						<option>Incident Responder</option>
						<option>Sales</option>
					</select>
					<div className="mt-6">
						<h2 className="text-sm font-medium">Sources</h2>
						<ul className="mt-2 space-y-1 text-sm text-muted-foreground">
							<li>Library item A</li>
							<li>Library item B</li>
						</ul>
					</div>
				</aside>
			</div>
		</main>
	);
}


