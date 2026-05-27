import Link from "next/link";

export const metadata = {
  title: "About Us | Voycia",
  description: "Voycia is a service-based AI voice agent company. We design, deploy, and operate inbound voice agents for businesses across industries.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Voycia is a service-based AI voice agent company. We design, build, and operate AI voice agents that answer your incoming calls 24/7 — so that no caller goes to voicemail and no opportunity slips away. We work with businesses across industries: healthcare clinics, real estate firms, e-commerce brands, hospitality operators, law offices, auto dealerships, home-services companies, financial services, and customer support teams.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Story</h2>
      <p className="text-muted-foreground mb-4">
        Founded in 2025, Voycia emerged from a simple observation: across nearly every industry, a missed inbound call is a missed opportunity. A patient who couldn&apos;t book an appointment, a buyer who couldn&apos;t reach an agent, a customer left waiting on hold — these moments quietly compound into lost revenue and broken trust.
      </p>
      <p className="text-muted-foreground mb-6">
        Our founders, having scaled inbound operations at previous companies, set out to build a partner — not just a product — that businesses could hand their incoming call line to with confidence. Today, Voycia operates voice agents on behalf of customers in multiple industries, freeing their human teams to focus on the conversations that truly need a person.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
      <p className="text-muted-foreground mb-6">
        To make sure every inbound call gets answered — quickly, accurately, and in the caller&apos;s own language — for any business that depends on its phone line.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h2>
      <p className="text-muted-foreground mb-6">
        {`We envision a world where every business — regardless of size, industry, or timezone — can offer instant, intelligent phone support. Where booking an appointment, getting a quote, or resolving an issue over the phone is effortless, in any language, at any hour.`}
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">What We Do — As a Service</h2>
      <p className="text-muted-foreground mb-4">
        We don&apos;t hand you a product and walk away. We work as your AI voice team end-to-end:
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
        <li><strong className="text-foreground">Discovery:</strong> we map your most important inbound call flows and the systems behind them.</li>
        <li><strong className="text-foreground">Agent design:</strong> we craft the voice, tone, scripts, and edge-case handling for your industry.</li>
        <li><strong className="text-foreground">Integration:</strong> we connect the agent to your CRM, EHR, PMS, ticketing, or telephony stack.</li>
        <li><strong className="text-foreground">Deployment:</strong> we put the agent on your incoming line and validate it against real traffic.</li>
        <li><strong className="text-foreground">Operations &amp; tuning:</strong> we monitor performance, retrain on real conversations, and continuously improve.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Industries We Serve</h2>
      <p className="text-muted-foreground mb-4">
        If your business takes incoming calls, we can build an agent for it. Today we work with — among others:
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
        <li><strong className="text-foreground">Healthcare:</strong> appointment booking, intake, prescription refills, basic triage.</li>
        <li><strong className="text-foreground">Real estate:</strong> property inquiries, viewing schedules, lead qualification.</li>
        <li><strong className="text-foreground">E-commerce &amp; D2C:</strong> order tracking, returns, refunds, post-purchase support.</li>
        <li><strong className="text-foreground">Hospitality:</strong> reservations, bookings, takeout orders, guest requests.</li>
        <li><strong className="text-foreground">Legal:</strong> new-client intake and consultation scheduling.</li>
        <li><strong className="text-foreground">Automotive:</strong> service appointments, parts inquiries, dealership leads.</li>
        <li><strong className="text-foreground">Home services:</strong> service-call scheduling, dispatch, quotes.</li>
        <li><strong className="text-foreground">Financial services:</strong> account inquiries, eligibility checks, application support.</li>
        <li><strong className="text-foreground">Customer support:</strong> tier-1 triage, FAQs, and smart escalation to human agents.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Values</h2>
      <ul className="list-decimal list-inside space-y-3 text-muted-foreground mb-6 ">
        <li><strong className="text-foreground">Partnership:</strong> we work as an extension of your team, not a vendor on the other side of a wall.</li>
        <li><strong className="text-foreground">Innovation:</strong> we push the boundaries of voice AI so your callers get an experience that feels natural and helpful.</li>
        <li><strong className="text-foreground">Integrity:</strong> we are honest about what AI can and can&apos;t do, and we hand off to humans the moment it matters.</li>
        <li><strong className="text-foreground">Inclusion:</strong> we build for every caller — across languages, accents, and accessibility needs.</li>
        <li><strong className="text-foreground">Excellence:</strong> we measure ourselves on the same KPIs your phone line is measured on: containment, CSAT, resolution.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Team</h2>
      <p className="text-muted-foreground mb-4">
        {`Our team combines deep expertise in artificial intelligence, voice technology, customer experience, and business operations. We're engineers, designers, researchers, and customer-success professionals united by a shared passion for solving inbound-call problems for real businesses.`}
      </p>
      <p className="text-muted-foreground mb-6">
        With backgrounds spanning leading tech companies, customer-service organizations, and AI research institutions, our team brings both technical excellence and real-world operational experience to every agent we build and run.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Technology</h2>
      <p className="text-muted-foreground mb-4">
        {`Built on cutting-edge natural language processing and voice synthesis, the agents we deploy hold conversations that feel natural and helpful. They learn from every real call we run on your line, so their accuracy and tone improve over time — without you having to lift a finger.`}
      </p>
      <p className="text-muted-foreground mb-6">
        We prioritize privacy and security, ensuring that all caller data is protected with enterprise-grade encryption and handled in line with international privacy regulations including GDPR and HIPAA where applicable.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Looking Forward</h2>
      <p className="text-muted-foreground mb-6">
        {`As we grow, we remain committed to our founding principle: be the partner that businesses of any size, in any industry, can hand their incoming call line to with full confidence.`}
      </p>

      <div className="bg-muted/50 rounded-lg p-6 mt-12">
        <h3 className="text-xl font-semibold mb-3">Ready to hand off your inbound call line?</h3>
        <p className="text-muted-foreground mb-4">
          {`Tell us about your business and the calls you receive. We'll scope a voice agent we can build, deploy, and run for you.`}
        </p>
        <p className="text-sm text-muted-foreground">
          <Link href="/#contact" className="text-primary hover:underline">Contact us today</Link> to discuss your inbound call flows and book a discovery call.
        </p>
      </div>
    </main>
  );
}
