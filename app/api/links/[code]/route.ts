import { NextResponse } from "next/server";
import { getLinkByCode, incrementClick } from "../../../action"; // adjust path if needed

export async function GET(
  req: Request,
  context: { params: Promise<{ code: string }> } // Next.js expects params as Promise
) {
  const { code } = await context.params; // await the params

  const link = await getLinkByCode(code);

  if (!link) {
    return new NextResponse("Short link not found", { status: 404 });
  }

  // Increment click count
  await incrementClick(code);

  // Redirect to original URL
  return NextResponse.redirect(link.url);
}
