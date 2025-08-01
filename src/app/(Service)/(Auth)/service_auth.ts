import UserModel from "@/app/(Model)/UserModel";
import repositoryAuth from "@/app/(Repository)/(Auth)/repository_auth";
import AppError from "@/lib/helper/app_error";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const loginService = async (username: string, password: string) => {
  const user = await repositoryAuth.findUser(username);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const payload = {
    id: user.id,
    name: user.name,
    username: user.username,
  };

  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
    algorithm: "HS256",
  });

  return { token, payload };
};

const registerService = async (user: UserModel) => {
  const checkUser = await repositoryAuth.findUser(user.username);

  if (checkUser) {
    throw new AppError("User already exists", 400);
  }

  user.password = await bcrypt.hash(user.password, 10);

  return await repositoryAuth.registerUser(user);
};

const serviceAuth = { loginService, registerService };

export default serviceAuth;
