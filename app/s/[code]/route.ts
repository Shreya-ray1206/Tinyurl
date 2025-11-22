import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const code = params.code;

  // Look up the short link
  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return new NextResponse("Short link not found", { status: 404 });
  }

  // Update clicks + last clicked
  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  // Redirect to the long URL
  return NextResponse.redirect(link.url);
}
