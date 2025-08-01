import { Prisma, PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalPrisma.prisma ??
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

// @ts-expect-error Intelephense false positive
prisma.$on("query", async (event: Prisma.QueryEvent) => {
  console.log("=".repeat(50));
  console.log("Query:", event.query);
  console.log("Duration:", event.duration + "ms");
  console.log("Params:", event.params);
  console.log("=".repeat(50));
});

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;
