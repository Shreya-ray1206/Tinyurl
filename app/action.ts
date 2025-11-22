"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!); // database URL required

// Define Link type
export interface Link {
  code: string;
  url: string;
  clicks: number;
  created_at: string;
  last_clicked: string | null;
}

// Fetch all links
export async function getAllLinks(): Promise<Link[]> {
  const result = await sql`SELECT * FROM links ORDER BY created_at DESC;`;
  return result as Link[];  // <-- cast here
}

// Create a new link
export async function createLink(code: string, url: string): Promise<Link> {
  const result = await sql`
    INSERT INTO links (code, url, clicks, created_at)
    VALUES (${code}, ${url}, 0, NOW())
    RETURNING *;
  `;
  return (result as Link[])[0];
}

// Increment click count
export async function incrementClick(code: string): Promise<Link | null> {
  const result = await sql`
    UPDATE links
    SET clicks = clicks + 1,
        last_clicked = NOW()
    WHERE code = ${code}
    RETURNING *;
  `;
  return (result as Link[])[0] ?? null;
}

// Delete a link
export async function deleteLink(code: string): Promise<Link | null> {
  const result = await sql`
    DELETE FROM links
    WHERE code = ${code}
    RETURNING *;
  `;
  return (result as Link[])[0] ?? null;
}

// Get a single link by code
export async function getLinkByCode(code: string): Promise<Link | null> {
  const result = await sql`
    SELECT * FROM links
    WHERE code = ${code};
  `;
  return (result as Link[])[0] ?? null;
}
