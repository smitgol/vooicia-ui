export const metadata = {
  title: "Terms of Service | Voycia",
  description: "The rules and regulations for using Voycia's services.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-24 space-y-6">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground">
          By accessing or using Voycia, you agree to be bound by these Terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Use of the Service</h2>
        <p className="text-muted-foreground">
          You may use Voycia only in compliance with these Terms and all applicable laws.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Accounts</h2>
        <p className="text-muted-foreground">
          You are responsible for safeguarding the password that you use to access the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Termination</h2>
        <p className="text-muted-foreground">
          We may terminate or suspend your access immediately, without prior notice, for any reason.
        </p>
      </section>

      <p className="text-muted-foreground">
        For full details please contact legal@voycia.ai.
      </p>
    </main>
  );
}
