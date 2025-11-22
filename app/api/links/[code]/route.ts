import { NextResponse } from "next/server";
import { getLinkByCode, incrementClick } from "../../../action"; // adjust path

export async function GET(
  req: Request,
  context: { params: Promise<{ code: string }> } // params is a Promise
) {
  const { code } = await context.params; // await the Promise

  const link = await getLinkByCode(code);

  if (!link) {
    return new NextResponse("Short link not found", { status: 404 });
  }

  await incrementClick(code);

  return NextResponse.redirect(link.url);
}
