import { NextResponse } from "next/server";
import { createLink } from "../../action"; // adjust path to your action.ts

export async function POST(req: Request) {
  try {
    const { url, code: customCode } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // If no custom code, generate a random 8-character code
    const code = customCode || Math.random().toString(36).substring(2, 10);

    // Save in Neon DB using your serverless action
    const link = await createLink(code, url);

    return NextResponse.json(link, { status: 201 });
  } catch (err: any) {
    console.error(err);
    // Handle duplicate codes (Neon / SQL error)
    if (err.message.includes("duplicate") || err.message.includes("already exists")) {
      return NextResponse.json({ error: "Code already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
