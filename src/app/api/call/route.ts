import { NextRequest, NextResponse } from "next/server";
import https from "https";
import fetch from "node-fetch";

const agent = new https.Agent({ rejectUnauthorized: false });

export async function POST(request: NextRequest) {
    try {
        const { prompt, language, to_number } = await request.json();
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/start_call`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                language,
                to_number,
            }),
            agent,
        })
        return NextResponse.json(
            { success: true, message: "Call started successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Call starting error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to start call" },
            { status: 500 }
        );
    }
}