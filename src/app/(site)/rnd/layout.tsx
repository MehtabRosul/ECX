import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Development",
  description: "Deep-tech research, prototypes, and lab initiatives.",
};

export default function RndLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


