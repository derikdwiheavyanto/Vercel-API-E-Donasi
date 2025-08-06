import { prisma } from "@/app/(DB)/database";
import { UserRequest } from "@/app/(Model)/(Request)/UserRequest";

const createAdmin = async (user: UserRequest) => {
  return await prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      password: user.password,
      id_role: 1,
      active: true,
    },
  });
};

const findUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
      deleted_at: null,
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

const getAllUserPengurus = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      id_role: true,
      created_at: true,
      updated_at: true,
      active: true,
    },
    where: { AND: [{ role: { name: "pengurus" } }, { deleted_at: null }] },
  });
};

const changeActiveUserPengurus = async (id: string, active: boolean) => {
  return await prisma.user.update({
    where: { id },
    data: { active },
    select: {
      id: true,
      name: true,
      username: true,
      active: true,
      created_at: true,
      updated_at: true,
    },
  });
};

const createUserPengurus = async (user: UserRequest) => {
  return await prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      password: user.password,
      id_role: 2,
      active: true,
    },
  });
};

const deleteUser = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};

const repositoryAdmin = {
  createAdmin,
  findUser,
  getAllUserPengurus,
  changeActiveUserPengurus,
  createUserPengurus,
  deleteUser,
};

export default repositoryAdmin;
