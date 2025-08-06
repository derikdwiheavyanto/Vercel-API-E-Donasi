import { prisma } from "@/app/(DB)/database";
import { UserRequest } from "@/app/(Model)/(Request)/UserRequest";
import { UserRole } from "@prisma/client";

const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

const registerUser = async (user: UserRequest) => {
  const checkRole = await findRole(UserRole.pengurus);

  console.info(checkRole);

  const data = {
    name: user.name,
    username: user.username,
    password: user.password,
    ...(checkRole && { id_role: checkRole.id }),
  };

  const result = await prisma.user.create({ data, include: { role: true } });

  if (!result) {
    return null;
  }

  return result;
};

const findRole = async (role: UserRole | number) => {
  if (typeof role === "string") {
    return await prisma.role.findFirst({
      where: {
        name: role,
      },
    });
  } else {
    return await prisma.role.findUnique({
      where: {
        id: role,
      },
    });
  }
};

const repositoryAuth = { findUser, registerUser, findRole };

export default repositoryAuth;
