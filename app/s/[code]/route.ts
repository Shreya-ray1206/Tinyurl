import { NextResponse } from "next/server";
import { getLinkByCode, incrementClick } from "../../action"; // correct relative path

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const code = params.code;

  const link = await getLinkByCode(code);

  if (!link) {
    return new NextResponse("Short link not found", { status: 404 });
  }

  // Increment click count
  await incrementClick(code);

  // Redirect to original URL
  return NextResponse.redirect(link.url);
}
