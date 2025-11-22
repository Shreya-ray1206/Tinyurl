import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // generate 8-character random code
    const code = Math.random().toString(36).substring(2, 10);

    // save in DB
    const link = await prisma.link.create({
      data: {
        code,
        url,
      },
    });

    return NextResponse.json(link);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
