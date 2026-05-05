import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configure Prisma client for optimal performance with Neon and serverless
const prismaClientOptions = {
  log: process.env.NODE_ENV === "development" 
    ? ["query" as const, "error" as const, "warn" as const] 
    : ["error" as const],
}

// Create Prisma client with optimized settings for serverless/Neon
export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
