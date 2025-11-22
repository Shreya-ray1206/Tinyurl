import { PrismaClient } from "@prisma/client/edge"; // Prisma 7+

// Singleton to prevent multiple instances in dev
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL, // your DB URL from .env
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
