export const metadata = {
  title: "Research & Development",
  description: "Deep-tech research, prototypes, and lab initiatives.",
};

export default function RndPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Research & Development</h1>
        <p className="mt-3 text-muted-foreground">
          Exploring new capabilities through experiments, prototypes, and publications.
        </p>
      </header>

      <section aria-labelledby="tracks" className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Security Research", desc: "Threat models, detections, and exploit analysis." },
          { title: "AI/ML Systems", desc: "Inference security, robustness, and safety tooling." },
          { title: "Developer Tooling", desc: "Static analysis, SCA, and secure-by-default SDKs." },
        ].map((item) => (
          <article key={item.title} className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            <div className="mt-4 flex gap-3">
              <a href="/library" className="text-primary underline underline-offset-4">Read more</a>
              <a href="/contact" className="text-primary underline underline-offset-4">Collaborate</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}


