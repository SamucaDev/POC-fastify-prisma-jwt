import FunctionResponse from "../interfaces/function-response.interface";
import { PrivateUser, User } from "../interfaces/user.interface";
import HttpStatus from "../utils/http-status";
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
  query: { email: string } | { id: string }
): Promise<FunctionResponse<User>> => {
  const user = await model.findUnique({
    where: query,
  });
  
  if(!user){
    return {
      error: {
        status: HttpStatus.NOT_FOUND,
        friendlyMessage: 'User not found'
      }
    }
  }

  const { password, ...userWithoutPassword } = user;
  
  return { data: userWithoutPassword };
};
  
export const findPrivateInformation = async (
  query: { email: string } | { id: string }
): Promise<FunctionResponse<PrivateUser>> => {
  const user = await model.findUnique({
    where: query,
  });
  
  if(!user){
    return {
      error: {
        status: HttpStatus.NOT_FOUND,
        friendlyMessage: 'User not found'
      }
    }
  }

  return {
    data: user
  };
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
