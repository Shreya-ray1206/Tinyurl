import { getAllLinks, createLink } from "../../action";


export async function GET() {
  try {
    const links = await getAllLinks();
    return new Response(JSON.stringify(links), { status: 200 });
  } catch (err) {
    console.error("GET /api/links error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch links" }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { code, url } = await req.json();
    const newLink = await createLink(code, url);
    return new Response(JSON.stringify(newLink), { status: 201 });
  } catch (err) {
    console.error("POST /api/links error:", err);
    return new Response(JSON.stringify({ error: "Failed to create link" }), { status: 500 });
  }
}
