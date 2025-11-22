import { NextResponse } from "next/server";
import { getLinkByCode, incrementClick } from "../../action";

export async function GET(
  req: Request,
  context: { params: Promise<{ code: string }> } // Await is required
) {
  const { code } = await context.params;

  const link = await getLinkByCode(code);

  if (!link) {
    return new NextResponse("Short link not found", { status: 404 });
  }

  // Increment click count
  await incrementClick(code);

  // Redirect to original URL
  return NextResponse.redirect(link.url);
}
