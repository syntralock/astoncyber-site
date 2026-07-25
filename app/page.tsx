import { Brand } from "@/components/brand";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 sm:px-10 sm:py-12">
      <header className="border-b border-border pb-6">
        <Brand />
      </header>
      <section
        className="flex flex-1 items-center py-16"
        aria-labelledby="foundation-title"
      >
        <div className="max-w-2xl rounded-lg border border-border bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs tracking-widest text-foreground-muted uppercase">
            Non-production placeholder
          </p>
          <h1
            id="foundation-title"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Phase 1 engineering foundation
          </h1>
          <p className="mt-4 leading-relaxed text-foreground-secondary">
            The application is running.
          </p>
        </div>
      </section>
    </main>
  );
}
