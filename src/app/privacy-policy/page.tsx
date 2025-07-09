export const metadata = {
  title: "Privacy Policy | Voycia",
  description: "How Voycia collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-24 space-y-6">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground">
        Effective date: 1 July 2025
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p className="text-muted-foreground">
          Your privacy is important to us. This policy explains what data we collect when you use Voycia and why we collect it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Account information such as name and email address.</li>
          <li>Call metadata (time-stamp, duration, caller ID) handled by the AI agent.</li>
          <li>Usage data including pages visited and interactions.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. How We Use Information</h2>
        <p className="text-muted-foreground">
          We use collected data to operate, maintain and improve Voycia, to communicate with you, and to comply with legal obligations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Your Rights</h2>
        <p className="text-muted-foreground">
          Depending on your location, you may have rights to access, correct or delete your personal information.
        </p>
      </section>

      <p className="text-muted-foreground">
        If you have questions, contact us at privacy@voycia.ai.
      </p>
    </main>
  );
}
