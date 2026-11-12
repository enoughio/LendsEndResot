import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is not set");
}

// pg currently treats sslmode=require as verify-full and warns about it.
// Set the explicit mode so production keeps the same checks without the warning.
const adapter = new PrismaPg({
	connectionString: connectionString.replace(
		/([?&])sslmode=(?:prefer|require|verify-ca)(?=&|$)/i,
		"$1sslmode=verify-full",
	),
});

// Reuse PrismaClient across hot reloads in development.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export default prisma;
