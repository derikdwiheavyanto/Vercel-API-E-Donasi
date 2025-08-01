import { prisma } from "@/app/(DB)/database";
import { UserRequest } from "@/app/(Model)/(Request)/UserRequest";

const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

const registerUser = async (user: UserRequest) => {
  const result = await prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      password: user.password,
    },
  });

  if (!result) {
    return null;
  }

  return result;
};

const repositoryAuth = { findUser, registerUser };

export default repositoryAuth;
