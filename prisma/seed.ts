import { prisma } from "@/app/(DB)/database";
import bcrypt from "bcrypt";

async function main() {
  await prisma.$executeRawUnsafe(`DELETE FROM "user"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "roles"`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "roles_id_seq" RESTART WITH 1`);

  await prisma.role.createMany({
    data: [
      {
        name: "admin",
      },
      {
        name: "pengurus",
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        name: "admin",
        username: "admin",
        password: bcrypt.hashSync("admin", 10),
        id_role: 1,
      },
      {
        name: "pengurus",
        username: "pengurus",
        password: bcrypt.hashSync("pengurus", 10),
        id_role: 2,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
