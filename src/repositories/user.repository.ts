import { User } from "../interfaces/user.interface";
import prisma from "../utils/prisma";

const model = prisma.user;

export const create = async (userObject: {
  email: string;
  name: string;
  password: string;
}) => {
  const user = await model.create({
    data: userObject,
  });

  return user;
};

export const update = () => {};

export const find = async (
  query: { email: string } | { id: string },
  includePassword: boolean = false
): Promise<User | null> => {
  const user = await model.findUnique({
    where: query,
  });

  if (user && !includePassword) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return user;
};

export const get = async () => {
  const users = await model.findMany({
    select: {
      name: true,
      id: true,
      email: true,
    },
  });

  return users;
};
