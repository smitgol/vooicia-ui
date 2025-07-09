import { Link } from "lucide-react";

export const metadata = {
  title: "About Us | Voycia",
  description: "Learn about Voycia, our mission, and the people behind the voice-AI platform.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Voycia empowers businesses to deliver exceptional phone support using AI voice agents that operate 24/7 in every major language. We are a team of engineers and customer-experience veterans who believe that technology should be helpful, human-centred and accessible to companies of all sizes.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Story</h2>
      <p className="text-muted-foreground mb-4">
        Founded in 2025, Voycia emerged from a simple observation: despite advances in AI technology, customer support remained frustratingly inefficient for both businesses and customers. Long hold times, repetitive questions, and language barriers created friction that hurt customer satisfaction and strained support teams.
      </p>
      <p className="text-muted-foreground mb-6">
        Our founders, having experienced these challenges firsthand while scaling customer support at previous companies, set out to create a solution that would bridge the gap between human empathy and AI efficiency. Today, Voycia serves businesses across industries, from startups to enterprise organizations, helping them transform their customer support experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
      <p className="text-muted-foreground mb-6">
        To eliminate wait times and repetitive tasks so human teams can focus on high-value conversations that drive meaningful customer relationships and business growth.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h2>
      <p className="text-muted-foreground mb-6">
        {`We envision a world where every customer interaction is instant, personalized, and valuable – where language is never a barrier, time zones don't matter, and every business can provide world-class support regardless of size or budget.`}
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">What We Do</h2>
      <p className="text-muted-foreground mb-4">
        {`Voycia's AI voice agents handle the full spectrum of customer support calls, from simple inquiries to complex problem-solving. Our platform integrates seamlessly with existing business systems, providing:`}
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
        <li>Natural, conversational AI that understands context and nuance</li>
        <li>Multi-language support covering 50+ languages and dialects</li>
        <li>24/7 availability with consistent service quality</li>
        <li>Smart escalation to human agents when needed</li>
        <li>Real-time analytics and insights to improve customer experience</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Values</h2>
      <ul className="list-decimal list-inside space-y-3 text-muted-foreground mb-6 ">
        <li><strong className="text-foreground">Innovation:</strong> We push the boundaries of voice AI, constantly improving our technology to deliver more natural, helpful, and intelligent interactions.</li>
        <li><strong className="text-foreground">Integrity:</strong> We act transparently and put customers first, building trust through honest communication and reliable service.</li>
        <li><strong className="text-foreground">Inclusion:</strong> We build products that work for everyone, everywhere, breaking down barriers of language, location, and accessibility.</li>
        <li><strong className="text-foreground">Excellence:</strong> We strive for the highest quality in everything we do, from our technology to our customer service.</li>
        <li><strong className="text-foreground">Collaboration:</strong> We believe the best solutions come from working together – with our customers, partners, and each other.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Team</h2>
      <p className="text-muted-foreground mb-4">
        {`Our diverse team combines deep expertise in artificial intelligence, voice technology, customer experience, and business operations. We're engineers, designers, researchers, and customer success professionals united by a shared passion for improving how businesses connect with their customers.`}
      </p>
      <p className="text-muted-foreground mb-6">
        With backgrounds spanning leading tech companies, customer service organizations, and AI research institutions, our team brings both technical excellence and real-world customer support experience to every product we build.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Technology</h2>
      <p className="text-muted-foreground mb-4">
        {`Built on cutting-edge natural language processing and voice synthesis technologies, Voycia's platform delivers human-like conversations that feel natural and helpful. Our AI agents learn from every interaction, continuously improving their ability to understand customer needs and provide accurate, contextual responses.`}
      </p>
      <p className="text-muted-foreground mb-6">
        We prioritize privacy and security, ensuring that all customer data is protected with enterprise-grade encryption and compliance with international privacy regulations including GDPR and CCPA.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Looking Forward</h2>
      <p className="text-muted-foreground mb-6">
        {`As we continue to grow, we remain committed to our founding principles: making advanced AI technology accessible to businesses of all sizes, improving customer experiences globally, and empowering human teams to focus on what they do best. We're excited about the future of customer support and our role in shaping it.`}
      </p>

      <div className="bg-muted/50 rounded-lg p-6 mt-12">
        <h3 className="text-xl font-semibold mb-3">Ready to Transform Your Customer Support?</h3>
        <p className="text-muted-foreground mb-4">
          {`Join thousands of businesses that trust Voycia to deliver exceptional customer experiences. Let's discuss how our AI voice agents can help your team focus on what matters most.`}
        </p>
        <p className="text-sm text-muted-foreground">
          <Link href="/#contact" className="text-primary hover:underline">Contact us today</Link> to learn more about our platform and schedule a personalized demo.
        </p>
      </div>
    </main>
  );
}