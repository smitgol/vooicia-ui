import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  phone?: string;
  industry?: string;
  callVolume?: string;
  currentSetup?: string;
  timeline?: string;
  useCase?: string;
  // legacy fields kept for backwards compatibility
  subject?: string;
  message?: string;
}

const INDUSTRY_LABELS: Record<string, string> = {
  healthcare: "Healthcare",
  "real-estate": "Real Estate",
  ecommerce: "E-commerce & D2C",
  hospitality: "Hospitality",
  legal: "Legal",
  automotive: "Automotive",
  "home-services": "Home Services",
  financial: "Financial Services",
  "customer-support": "Customer Support / SaaS",
  other: "Other",
};

const CALL_VOLUME_LABELS: Record<string, string> = {
  "<500": "Under 500 / month",
  "500-2000": "500 – 2,000 / month",
  "2000-10000": "2,000 – 10,000 / month",
  "10000-50000": "10,000 – 50,000 / month",
  "50000+": "50,000+ / month",
  unsure: "Not sure yet",
};

const SETUP_LABELS: Record<string, string> = {
  "human-agents": "In-house human agents",
  "ivr-humans": "IVR / phone tree + humans",
  outsourced: "Outsourced call center / BPO",
  "other-ai": "Another AI voice tool",
  voicemail: "Voicemail / nothing yet",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP",
  "1-3-months": "1 – 3 months",
  "3-6-months": "3 – 6 months",
  exploring: "Just exploring",
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const decode = (
  dict: Record<string, string>,
  key: string | undefined,
): string => (key ? dict[key] || key : "—");

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const {
      name,
      email,
      company,
      role,
      phone,
      industry,
      callVolume,
      currentSetup,
      timeline,
      useCase,
      // legacy
      message,
    } = payload;

    // Required fields — accept both the new qualifying form and legacy callers.
    const useCaseOrMessage = useCase || message;
    if (
      !name ||
      !email ||
      !useCaseOrMessage ||
      // Treat the new form as new only when it sends a company name.
      (company !== undefined && (!company || !industry || !callVolume || !currentSetup))
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    const industryLabel = decode(INDUSTRY_LABELS, industry);
    const volumeLabel = decode(CALL_VOLUME_LABELS, callVolume);
    const setupLabel = decode(SETUP_LABELS, currentSetup);
    const timelineLabel = decode(TIMELINE_LABELS, timeline);

    // Helpful subject line for triage.
    const subjectParts = [
      `New lead: ${name}`,
      company ? `(${company})` : null,
      industry ? `· ${industryLabel}` : null,
      callVolume ? `· ${volumeLabel}` : null,
    ].filter(Boolean);
    const computedSubject = subjectParts.join(" ");

    const plainText = `
New discovery call request
==========================

Name:        ${name}
Email:       ${email}
Company:     ${company || "—"}
Role:        ${role || "—"}
Phone:       ${phone || "—"}

Industry:           ${industryLabel}
Monthly volume:     ${volumeLabel}
Current setup:      ${setupLabel}
Timeline:           ${timelineLabel}

Use case:
${useCaseOrMessage}
    `.trim();

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;width:35%;vertical-align:top;">${label}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;">${value}</td>
      </tr>
    `;

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#f59e0b 0%,#ea580c 100%);padding:24px;border-radius:12px 12px 0 0;color:#fff;">
          <p style="margin:0;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.85;">Voycia · new lead</p>
          <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;">${escapeHtml(name)} — ${escapeHtml(company || "")}</h1>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:0;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#ea580c;text-decoration:none;">${escapeHtml(email)}</a>`)}
            ${row("Phone", phone ? escapeHtml(phone) : "—")}
            ${row("Role", role ? escapeHtml(role) : "—")}
            ${row("Industry", escapeHtml(industryLabel))}
            ${row("Monthly call volume", escapeHtml(volumeLabel))}
            ${row("Current setup", escapeHtml(setupLabel))}
            ${row("Timeline", escapeHtml(timelineLabel))}
          </table>
          <div style="padding:16px 20px;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6b7280;letter-spacing:0.05em;text-transform:uppercase;">Use case</p>
            <p style="margin:0;font-size:14px;color:#111827;white-space:pre-line;line-height:1.55;">${escapeHtml(useCaseOrMessage).replace(/\n/g, "<br>")}</p>
          </div>
        </div>
        <p style="margin:16px 0 0;text-align:center;font-size:11px;color:#9ca3af;">Sent from voycia.ai · ${new Date().toUTCString()}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `${process.env.NEXT_PUBLIC_EMAIL}`,
      to: process.env.NEXT_PUBLIC_EMAIL,
      replyTo: email,
      subject: computedSubject,
      text: plainText,
      html,
    });

    return NextResponse.json(
      { success: true, message: "Lead received" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send. Please try again." },
      { status: 500 },
    );
  }
}
