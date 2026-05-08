import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configure Prisma client for optimal performance with Neon and serverless
const prismaClientOptions = {
  log: process.env.NODE_ENV === "development" 
    ? ["query" as const, "error" as const, "warn" as const] 
    : ["error" as const],
  // Use connection pooling via DATABASE_URL parameters for Neon
  // See: https://www.prisma.io/docs/orm/connection-pooling
}

// Create Prisma client with optimized settings for serverless/Neon
const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

// Handle connection errors and auto-reconnect
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
  
  // Listen for connection errors and log them
  prisma.$on("error", (e) => {
    console.error("Prisma client error:", e)
  })
  
  // Listen for disconnect events
  prisma.$on("disconnect", () => {
    console.log("Prisma client disconnected")
  })
}

export { prisma }
