import { UserRequest } from "@/app/(Model)/(Request)/UserRequest";
import repositoryAdmin from "@/app/(Repository)/(Admin)/admin_repository";
import AppError from "@/lib/helper/app_error";
import bcrypt from "bcrypt";

const getAllUserPengurusService = async () => {
  return await repositoryAdmin.getAllUserPengurus();
};

const changeActiveUserPengurusService = async (id: string) => {
  const user = await repositoryAdmin.findUser(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const active = !user.active;

  return await repositoryAdmin.changeActiveUserPengurus(id, active);
};

const deleteUserPengurusService = async (id: string) => {
  return await repositoryAdmin.deleteUser(id);
};

const createUserPengurusService = async (user: UserRequest) => {
  user.password = await bcrypt.hash(user.password, 10);

  return await repositoryAdmin.createUserPengurus(user);
};

const serviceAdmin = {
  getAllUserPengurusService,
  changeActiveUserPengurusService,
  deleteUserPengurusService,
  createUserPengurusService,
};

export default serviceAdmin;
