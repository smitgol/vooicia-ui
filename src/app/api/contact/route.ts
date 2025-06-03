import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL, // Your Gmail address
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD, // Your Gmail app password (not your regular password)
      },
    });

    // Email content
    const mailOptions = {
      from: `${process.env.NEXT_PUBLIC_EMAIL}`, // sender address
      to: process.env.NEXT_PUBLIC_EMAIL, // recipient's email
      subject: subject ? `${subject} - from ${name}` : `Contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">New Contact Form Submission</h2>
          <p style="color: #718096;">You received a new message from your website contact form.</p>
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <h4 style="margin-bottom: 5px;">Message:</h4>
            <p style="white-space: pre-line;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
