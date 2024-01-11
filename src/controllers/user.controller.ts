import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, userSchemas } from "../schemas/user.schema";
import HttpStatus from "../utils/http-status";
import createUseCase  from "../useCases/user/create/user-create.usecase"
import findUseCase from "../useCases/user/find/user-find.usecase"
import findAllUseCase from "../useCases/user/findAll/user-find-all.usecase"


const createUser = async (
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  try {
    const { password, email, name } = req.body;
    const user = await createUseCase({ password, email, name });

    if (user?.error) {
      return reply.code(user.error.status).send(user.error.message);
    }
    
    return reply.code(HttpStatus.CREATED).send(user.data);
  } catch (e) {
    console.error(e);
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
};

const findUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { params } = req;
    const { id } = params;
  
    const user = await findUseCase(id);
    
    if (user?.error) {
      return reply.code(user.error.status).send(user.error.friendlyMessage);
    }
  
    return reply.code(HttpStatus.OK).send(user.data);
  } catch(e) { 
    console.error(e);
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
};

const findAllUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const users = await findAllUseCase();

    if (users?.error) {
      return reply.code(users.error.status).send(users.error.friendlyMessage);
    }

    return reply.code(HttpStatus.OK).send(users.data);
  } catch (e) {
    console.error(e);
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
} 

export { createUser, findUser, findAllUser };
