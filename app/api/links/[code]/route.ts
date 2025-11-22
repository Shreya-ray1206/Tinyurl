import { getLinkByCode, incrementClick } from "../../../action";

export async function GET(req: Request, { params }: { params: { code: string } }) {
  try {
    const { code } = params;
    const link = await getLinkByCode(code);

    if (!link) {
      return new Response("Not Found", { status: 404 });
    }

    await incrementClick(code);
    return Response.redirect(link.url, 302);
  } catch (err) {
    console.error("Redirect error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
