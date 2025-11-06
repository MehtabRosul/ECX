import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "EncryptArx Services — Cybersecurity, AI/ML & Cloud Engineering",
	description: "Research-driven security, AI, and cloud engineering — transforming threats into resilient advantage and prototypes into production-grade products.",
};

export default function ServicesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}

