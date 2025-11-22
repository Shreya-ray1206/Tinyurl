// app/api/links/[code]/route.ts
import { prisma } from "../../libs/prisma";
import { redirect } from "next/navigation";

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  try {
    // Update clicks and lastClicked
    const link = await prisma.link.update({
      where: { code },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date(),
      },
    });

    // Redirect to the original URL
    redirect(link.url);
  } catch (err) {
    console.error("Redirect error:", err);

    // If link not found, return 404
    return new Response("Not Found", { status: 404 });
  }
}
