// prisma-test.ts
import { prisma } from "./lib/prisma.js"; // use the client from libs/prisma.ts

async function main() {
  try {
    const links = await prisma.link.findMany();
    console.log("Links fetched:", links);
  } catch (err) {
    console.error("DB connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
